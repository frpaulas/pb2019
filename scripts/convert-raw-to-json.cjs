#!/usr/bin/env node
/**
 * Converter for DPB source format service files to JSON
 * Usage: node scripts/convert-raw-to-json.cjs <input-file> [output-file]
 */

const fs = require('fs');
const path = require('path');

class RawToJsonConverter {
	constructor() {
		this.reset();
	}

	reset() {
		this.metadata = {
			title: '',
			slug: '',
			pb_pages: []
		};
		this.sections = [];
		this.currentSection = null;
		this.pageBreaks = [];
	}

	/**
	 * Process escape sequences in text
	 * Converts \n to newline, \t to tab, etc.
	 */
	processEscapeSequences(text) {
		if (!text || typeof text !== 'string') return text;

		return text
			.replace(/\\n/g, '\n')
			.replace(/\\t/g, '\t')
			.replace(/\\r/g, '\r')
			.replace(/\\\\/g, '\\'); // Allow literal backslash with \\
	}

	/**
	 * Parse text with wrapper syntax like {{u}}text{{/u}} into structured format
	 * Returns either a string (if no wrappers) or an array of text segments with formatting
	 */
	parseTextWithWrappers(text) {
		if (!text || typeof text !== 'string') return text;

		// Process escape sequences first
		text = this.processEscapeSequences(text);

		// Check if there are any wrappers or blank patterns
		if (!text.includes('{{') && !text.includes('___')) return text;

		const segments = [];
		let lastIndex = 0;

		// Combined regex to match both wrappers and blank fill-ins
		// Matches: {{wrapper}}content{{/wrapper}} OR ___content___
		const combinedRegex = /(\{\{([a-z]+)\}\}(.*?)\{\{\/\2\}\})|(___([^_]+)___)/g;
		let match;

		while ((match = combinedRegex.exec(text)) !== null) {
			// Add text before this match
			if (match.index > lastIndex) {
				const beforeText = text.substring(lastIndex, match.index);
				if (beforeText) {
					segments.push({ type: 'text', value: beforeText });
				}
			}

			if (match[1]) {
				// This is a wrapper match: {{wrapper}}content{{/wrapper}}
				const wrapperType = match[2];
				const content = match[3];
				segments.push({ type: wrapperType, value: content });
			} else if (match[4]) {
				// This is a blank fill-in match: ___content___
				const blankContent = match[5];
				segments.push({ type: 'blank', value: blankContent });
			}

			lastIndex = match.index + match[0].length;
		}

		// Add remaining text after last match
		if (lastIndex < text.length) {
			const remainingText = text.substring(lastIndex);
			if (remainingText) {
				segments.push({ type: 'text', value: remainingText });
			}
		}

		// If we found any patterns, return the segments array; otherwise return original text
		return segments.length > 0 ? segments : text;
	}

	parseModifiers(parts) {
		const modifiers = {
			bold: false,
			optional: false,
			indent: false,
			lowercase: false
		};

		for (let i = 1; i < parts.length; i++) {
			const mod = parts[i];
			if (mod === 'b') modifiers.bold = true;
			if (mod === 'o') modifiers.optional = true;
			if (mod === 'i') modifiers.indent = true;
			if (mod === 'lc') modifiers.lowercase = true;
		}

		return modifiers;
	}

	parsePageLinks(text) {
		// Pattern: "on page n" or "on pages n-m"
		const pagePattern = /\bon pages? (\d+)(?:-(\d+))?/g;
		const result = [];
		let lastIndex = 0;

		let match;
		while ((match = pagePattern.exec(text)) !== null) {
			// Add text before the match
			if (match.index > lastIndex) {
				const textBefore = text.substring(lastIndex, match.index);
				// Parse wrappers in the text segment
				const wrappedText = this.parseTextWithWrappers(textBefore);
				if (Array.isArray(wrappedText)) {
					result.push(...wrappedText);
				} else {
					result.push({
						type: 'text',
						value: textBefore
					});
				}
			}

			// Extract page numbers
			const firstPage = parseInt(match[1]);
			const secondPage = match[2] ? parseInt(match[2]) : null;

			// Create page link
			const pageLink = {
				type: 'page_link',
				page: firstPage,
				text: secondPage ? `${firstPage}-${secondPage}` : `${firstPage}`
			};

			result.push(pageLink);

			lastIndex = match.index + match[0].length;
		}

		// Add remaining text after last match
		if (lastIndex < text.length) {
			const remainingText = text.substring(lastIndex);
			const wrappedText = this.parseTextWithWrappers(remainingText);
			if (Array.isArray(wrappedText)) {
				result.push(...wrappedText);
			} else {
				result.push({
					type: 'text',
					value: remainingText
				});
			}
		}

		// If no matches found, return text as single element
		if (result.length === 0) {
			const wrappedText = this.parseTextWithWrappers(text);
			if (Array.isArray(wrappedText)) {
				return wrappedText;
			}
			result.push({
				type: 'text',
				value: text
			});
		}

		return result;
	}

	// Tokenize the input into lines with their types
	tokenize(content) {
		const lines = content.split('\n');
		const tokens = [];
		let i = 0;

		while (i < lines.length) {
			let line = lines[i].trim();
			const lineNum = i + 1;

			// Skip empty lines and comments (# or // or \\)
			if (!line || line.startsWith('#') || line.startsWith('//') || line.startsWith('\\\\')) {
				i++;
				continue;
			}

			// Strip inline comments (everything after //)
			const commentIndex = line.indexOf('//');
			if (commentIndex > -1) {
				line = line.substring(0, commentIndex).trim();
				// If nothing left after removing comment, skip the line
				if (!line) {
					i++;
					continue;
				}
			}

			// Find where the content starts (after type and modifiers/parameters)
			// For types like st:3xl: or v:officiant: we need to find the right colon
			const allParts = line.split(':');
			const type = allParts[0];

			// For most types, content starts after second colon
			// Special handling for types with parameters
			let parts, afterFirstColon;
			const colonIndex = line.indexOf(':');

			if (colonIndex === -1) {
				console.warn(`Warning line ${lineNum}: Missing colon, skipping`);
				i++;
				continue;
			}

			afterFirstColon = line.substring(colonIndex + 1);
			parts = allParts;

			// For multi-line types (tb, r, bt, v, ol, ul), collect all following lines until next type
			const multiLineTypes = ['tb', 'r', 'bt', 'v', 'ol', 'ul'];
			if (multiLineTypes.includes(type)) {
				const textLines = [afterFirstColon];
				let j = i + 1;

				// Collect continuation lines
				while (j < lines.length) {
					let nextLine = lines[j].trim();

					// Skip comment lines
					if (
						nextLine.startsWith('//') ||
						nextLine.startsWith('#') ||
						nextLine.startsWith('\\\\')
					) {
						j++;
						continue;
					}

					// Strip inline comments
					const commentIdx = nextLine.indexOf('//');
					if (commentIdx > -1) {
						nextLine = nextLine.substring(0, commentIdx).trim();
					}

					// Stop if we hit an empty line or a new type marker
					if (!nextLine) {
						j++;
						break;
					}

					// Check if this is a new type marker
					const nextColonIndex = nextLine.indexOf(':');
					if (nextColonIndex > 0) {
						const nextType = nextLine.substring(0, nextColonIndex).split(':')[0];
						// If it's a valid type, stop collecting
						const validTypes = [
							'pg',
							'tp',
							'st',
							'tb',
							'r',
							'ref',
							'ref+',
							'v',
							'pb',
							'blank',
							'l',
							'button',
							'bt',
							'br',
							'use',
							'hd',
							'lords_prayer',
							'scripture',
							'ol',
							'ul'
						];
						if (validTypes.includes(nextType)) {
							break;
						}
					}

					textLines.push(nextLine);
					j++;
				}

				tokens.push({
					type,
					parts,
					content: textLines.join(' ').trim(),
					lineNum
				});

				i = j;
			} else {
				// Single line types
				tokens.push({
					type,
					parts,
					content: afterFirstColon,
					lineNum
				});
				i++;
			}
		}

		return tokens;
	}

	parseToken(token) {
		const { type, parts, content, lineNum } = token;

		switch (type) {
			case 'pg':
				return this.handlePageRange(content);

			case 'tp':
				return this.handleTitlePage(content);

			case 'st':
				return this.handleSectionTitle(parts, content);

			case 'tb':
			case 'bt':
				return this.handleTextBlock(parts, content);

			case 'r':
				return this.handleRubric(parts, content);

			case 'ref':
				return this.handleRef(parts, content);

			case 'ref+':
				return this.handleRefPlus(parts, content);

			case 'v':
				return this.handleVersical(parts, content);

			case 'ol':
				return this.handleOrderedList(parts, content);

			case 'ul':
				return this.handleUnorderedList(parts, content);

			case 'pb':
				return this.handlePageBreak(content);

			case 'blank':
				return this.handleBlankPage(content);

			case 'vm':
				return this.handleVerticalMargin(parts, content);

			case 'br':
				return this.handleLineBreak();

			case 'l':
				return this.handleLine(parts, content);

			case 'button':
				return this.handleButton(parts, content);

			case 'use':
				return this.handleUse(parts, content);

			case 'hd':
				return this.handleHolyDay(parts, content);

			case 'lords_prayer':
				return this.handleLordsPrayer(parts, content);

			case 'scripture':
				return this.handleScripture(parts, content);

			default:
				console.warn(`Warning line ${lineNum}: Unknown type "${type}"`);
				return null;
		}
	}

	handlePageRange(content) {
		// Parse page range like "161-170" or single page "160"
		// Support negative numbers for roman numerals: "-10--8" or "-5"
		const trimmed = content.trim();

		// Handle negative number ranges (e.g., "-10--8" for roman numeral pages)
		if (trimmed.startsWith('-') && trimmed.includes('--')) {
			// Format: -10--8
			const parts = trimmed.split('--');
			const start = parseInt(parts[0]); // Already includes the negative sign
			const end = -parseInt(parts[1]); // Add negative sign
			this.metadata.pb_pages = [start, end];
		} else if (trimmed.includes('-') && !trimmed.startsWith('-')) {
			// Regular positive range: 161-170
			const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()));
			this.metadata.pb_pages = [start, end];
		} else {
			// Single page (positive or negative)
			const page = parseInt(trimmed);
			this.metadata.pb_pages = [page];
		}
		return null;
	}

	handleTitlePage(content) {
		this.metadata.title = content.trim();
		// Generate slug from title
		this.metadata.slug = content
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '_');
		return null;
	}

	handleSectionTitle(parts, content) {
		const modifiers = this.parseModifiers(parts);
		// Size can be a number (1, 2, 3, 4) or Tailwind size (xl, 2xl, 3xl, 4xl, etc.)
		// Check if parts[1] is a valid size (not a modifier and matches size pattern)
		const sizePattern = /^[1-9]$|^\d*xl$/;
		const potentialSize = parts[1] ? parts[1].trim() : '';
		const isValidSize =
			potentialSize &&
			!['b', 'o', 'i', 'lc'].includes(potentialSize) &&
			sizePattern.test(potentialSize);
		const size = isValidSize ? potentialSize : null;

		// Get the actual content (after size and/or modifiers)
		let text = content;

		// Count how many modifiers we need to skip
		let skipCount = 0;
		for (let i = 1; i < parts.length; i++) {
			if (['b', 'o', 'i', 'lc'].includes(parts[i]) || (size && i === 1)) {
				skipCount++;
			} else {
				break;
			}
		}

		// Skip past modifiers/size by finding the nth colon
		for (let i = 0; i < skipCount; i++) {
			const colonIndex = text.indexOf(':');
			if (colonIndex > -1) {
				text = text.substring(colonIndex + 1);
			}
		}

		text = text.trim();

		const item = {
			type: 'section_title',
			text: this.parseTextWithWrappers(text)
		};

		// Convert numeric sizes (1, 2, 3, 4) to Tailwind format (xl, 2xl, 3xl, 4xl)
		if (size) {
			const numSize = parseInt(size);
			if (!isNaN(numSize)) {
				item.size = numSize === 1 ? 'xl' : `${numSize}xl`;
			} else {
				item.size = size;
			}
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;
		if (modifiers.lowercase) item.lowercase = true;

		return item;
	}

	handleTextBlock(parts, afterFirstColon) {
		const modifiers = this.parseModifiers(parts);

		// Strip modifiers from content
		let text = afterFirstColon;

		// Count how many modifiers we have
		let modCount = 0;
		for (let i = 1; i < parts.length; i++) {
			if (['b', 'o', 'i', 'lc'].includes(parts[i])) {
				modCount++;
			} else {
				break;
			}
		}

		// Skip past the modifiers by finding the nth colon
		for (let i = 0; i < modCount; i++) {
			const colonIndex = text.indexOf(':');
			if (colonIndex > -1) {
				text = text.substring(colonIndex + 1);
			}
		}

		text = text.trim();

		// Parse for page links
		const contentArray = this.parsePageLinks(text);

		const item = {
			type: 'text_block'
		};

		// If we have page links, use content array; otherwise use plain text
		if (contentArray.length > 1 || (contentArray.length === 1 && contentArray[0].type !== 'text')) {
			item.content = contentArray;
		} else {
			// Process escape sequences for plain text
			item.text = this.processEscapeSequences(text);
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleRubric(parts, content) {
		const modifiers = this.parseModifiers(parts);
		const text = content.trim();

		// Parse for page links
		const contentArray = this.parsePageLinks(text);

		const item = {
			type: 'rubric'
		};

		// If we have page links, use content array; otherwise use plain text
		if (contentArray.length > 1 || (contentArray.length === 1 && contentArray[0].type !== 'text')) {
			item.content = contentArray;
		} else {
			// Process escape sequences for plain text
			item.text = this.processEscapeSequences(text);
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleRef(parts, content) {
		const modifiers = this.parseModifiers(parts);
		const item = {
			type: 'ref',
			text: this.parseTextWithWrappers(content.trim())
		};

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleRefPlus(parts, afterFirstColon) {
		// ref+:reference:additional_text
		const modifiers = this.parseModifiers(parts);
		const secondColon = afterFirstColon.indexOf(':');

		let reference = '';
		let additionalText = '';

		if (secondColon > -1) {
			reference = afterFirstColon.substring(0, secondColon).trim();
			additionalText = afterFirstColon.substring(secondColon + 1).trim();
		} else {
			reference = afterFirstColon.trim();
		}

		const item = {
			type: 'ref',
			text: reference
		};

		if (additionalText) {
			item.add_on = additionalText;
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleLordsPrayer(parts, content) {
		const modifiers = this.parseModifiers(parts);
		const item = {
			type: 'lords_prayer'
		};

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleScripture(parts, afterFirstColon) {
		// scripture:reference:: text
		// Example: scripture:john 12:31-32:: Jesus said...
		// Note: Using :: as delimiter to allow : in scripture references
		const modifiers = this.parseModifiers(parts);
		const doubleColonIndex = afterFirstColon.indexOf('::');

		let reference = '';
		let text = '';

		if (doubleColonIndex > -1) {
			reference = afterFirstColon.substring(0, doubleColonIndex).trim();
			text = afterFirstColon.substring(doubleColonIndex + 2).trim();
		} else {
			reference = afterFirstColon.trim();
		}

		const item = {
			type: 'scripture',
			ref: reference
		};

		if (text) {
			item.text = this.parseTextWithWrappers(text);
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleUse(parts, afterFirstColon) {
		// use:component_name: or use:component_name:param:
		// Special handling for use:psalm:number:start:end:, use:canticle:name:, use:prayer:name:
		let componentName = parts[1] || afterFirstColon.trim();

		// Strip trailing colon if present
		if (componentName && componentName.endsWith(':')) {
			componentName = componentName.slice(0, -1);
		}

		if (!componentName) {
			console.warn('Warning: use: requires component name');
			return null;
		}

		// Handle psalm with parameters: use:psalm:119:105:112:b:title
		// Format: use:psalm:number:start:end:b:title
		// b = optional bold modifier, title = optional show title
		// Extended format: use:psalm:116:3b:5:: (3b means start at verse 3, line 2)
		if (componentName === 'psalm') {
			const psalmNumber = parseInt(parts[2]);

			// Parse start verse - may have 'b' suffix for line 2
			let startVerse = 1;
			let startLine = 1; // 1 for ln1, 2 for ln2
			if (parts[3]) {
				const startStr = parts[3];
				if (startStr.endsWith('b')) {
					startVerse = parseInt(startStr.slice(0, -1));
					startLine = 2;
				} else {
					startVerse = parseInt(startStr);
				}
			}

			// Parse end verse - may also have 'b' suffix
			let endVerse = undefined;
			let endLine = 2; // Default to end of verse (ln2)
			if (parts[4]) {
				const endStr = parts[4];
				if (endStr.endsWith('b')) {
					endVerse = parseInt(endStr.slice(0, -1));
					endLine = 2;
				} else if (endStr.endsWith('a')) {
					endVerse = parseInt(endStr.slice(0, -1));
					endLine = 1;
				} else {
					endVerse = parseInt(endStr);
				}
			}

			const bold = parts[5] === 'b';
			const showTitle = parts[6] === 'title' || parts[5] === 'title';

			const item = {
				type: 'show_psalm',
				ps: psalmNumber
			};

			// Add from/to if not default
			if (startVerse !== 1) {
				item.from = startVerse;
			}
			if (startLine !== 1) {
				item.fromLine = startLine;
			}
			if (endVerse !== undefined) {
				item.to = endVerse;
			}
			if (endLine !== 2) {
				item.toLine = endLine;
			}
			if (bold) {
				item.bold = true;
			}
			if (showTitle) {
				item.showTitle = true;
			}

			return item;
		}

		// Handle canticle: use:canticle:phos_hilaron
		// Format: use:canticle:name
		if (componentName === 'canticle') {
			const canticleName = parts[2];

			if (!canticleName) {
				console.warn('Warning: use:canticle: requires canticle name');
				return null;
			}

			return {
				type: 'canticle',
				name: canticleName
			};
		}

		// Handle prayer: use:prayer:lords_prayer
		// Format: use:prayer:name
		if (componentName === 'prayer') {
			const prayerName = parts[2];

			if (!prayerName) {
				console.warn('Warning: use:prayer: requires prayer name');
				return null;
			}

			return {
				type: prayerName
			};
		}

		// Handle collect: use:collect:advent1
		// Format: use:collect:name
		if (componentName === 'collect' || componentName === 'collects') {
			const collectName = parts[2];

			if (!collectName) {
				console.warn('Warning: use:collect: requires collect name');
				return null;
			}

			return {
				type: 'collect',
				name: collectName
			};
		}

		// Handle occasional_prayer: use:occasional_prayer:1
		// Format: use:occasional_prayer:number
		if (componentName === 'occasional_prayer') {
			const prayerNumber = parts[2];

			if (!prayerNumber) {
				console.warn('Warning: use:occasional_prayer: requires prayer number');
				return null;
			}

			return {
				type: 'occasional_prayer',
				name: prayerNumber
			};
		}

		// Handle calendar: use:calendar
		// Format: use:calendar - shows current or next month dynamically
		if (componentName === 'calendar') {
			return {
				type: 'calendar'
			};
		}

		// Handle lectionary: use:lectionary
		// Format: use:lectionary - interactive Sunday lectionary with year selector
		if (componentName === 'lectionary') {
			return {
				type: 'lectionary'
			};
		}

		// Handle find_easter: use:find_easter
		// Format: use:find_easter - interactive Easter date calculator
		if (componentName === 'find_easter') {
			return {
				type: 'find_easter'
			};
		}

		// Handle page with roman numeral: use:page:iii
		// Format: use:page:roman_numeral - for front matter pages
		if (componentName === 'page') {
			const romanNumeral = parts[2];

			if (romanNumeral) {
				return {
					type: 'page',
					pageNumber: romanNumeral
				};
			}

			return {
				type: 'page'
			};
		}

		// Default: return component type
		const item = {
			type: componentName
		};

		return item;
	}

	handleHolyDay(parts, afterFirstColon) {
		// hd:1-1 or hd:ember-days1
		// Format: hd:name where name is a key in rld_eucharist.json
		const name = parts[1] || afterFirstColon.trim();

		if (!name) {
			console.warn('Warning: hd: requires a holy day name/date');
			return null;
		}

		return {
			type: 'holy_day',
			name: name
		};
	}

	handleVersical(parts, afterFirstColon) {
		// v: text (no speaker)
		// v:b: text (bold, no speaker)
		// v:officiant: text
		// v:people: text
		const modifiers = this.parseModifiers(parts);
		const validSpeakers = ['officiant', 'people', 'b', 'o', 'i'];

		// Check if parts[1] is a valid speaker/modifier or just text
		const potentialSpeaker = parts[1] || '';
		const isSpeaker = validSpeakers.includes(potentialSpeaker);

		let speaker = '';
		let text = '';

		if (isSpeaker) {
			// We have a speaker or modifier
			speaker = potentialSpeaker;
			// Text comes after the second colon
			const secondColon = afterFirstColon.indexOf(':');
			text = secondColon > -1 ? afterFirstColon.substring(secondColon + 1).trim() : '';
		} else {
			// No speaker, everything after first colon is text
			text = afterFirstColon.trim();
		}

		const item = {
			type: 'versical'
		};

		// Add speaker as boolean property (matches actual JSON format)
		// e.g., v:officiant:text becomes {"officiant": true}
		if (speaker && speaker !== 'b' && !['o', 'i'].includes(speaker)) {
			item[speaker] = true;
		}

		// Add text if present
		if (text) {
			item.text = this.parseTextWithWrappers(text);
		}

		// Check if speaker is 'b' or if bold modifier
		if (speaker === 'b' || modifiers.bold) {
			item.bold = true;
		}

		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleOrderedList(parts, content) {
		// ol:1:First item text
		// ol:2:Second item text
		// ol:b:1:Bold item
		// ol:i:1:Indented item
		const modifiers = this.parseModifiers(parts);

		// Find the number - it's the first part that's a digit
		let itemNumber = null;
		let textStartIndex = 1; // Relative to parts array

		for (let i = 1; i < parts.length; i++) {
			if (/^\d+$/.test(parts[i])) {
				itemNumber = parseInt(parts[i]);
				textStartIndex = i + 1;
				break;
			}
		}

		if (itemNumber === null) {
			console.warn('Warning: ol: requires a number (e.g., ol:1:text)');
			return null;
		}

		// content is everything after first colon (e.g., "1:First item" or "b:1:First item")
		// We need to find text after the number
		// Count colons needed to skip in content: textStartIndex - 1 (since parts[0] is 'ol' which we already skipped)
		const colonsToSkip = textStartIndex - 1;
		let colonCount = 0;
		let textStart = 0;

		for (let i = 0; i < content.length; i++) {
			if (content[i] === ':') {
				colonCount++;
				if (colonCount === colonsToSkip) {
					textStart = i + 1;
					break;
				}
			}
		}

		const text = content.substring(textStart).trim();

		const item = {
			type: 'ordered_list_item',
			number: itemNumber
		};

		if (text) {
			item.text = this.parseTextWithWrappers(text);
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleUnorderedList(parts, content) {
		// ul:First item text
		// ul:b:Bold item
		// ul:i:Indented item
		const modifiers = this.parseModifiers(parts);

		// Text comes after all modifiers
		let textStartIndex = 1; // Relative to parts array

		// Skip over modifiers to find where text starts
		const modifiersList = ['b', 'o', 'i', 'lc'];
		for (let i = 1; i < parts.length; i++) {
			if (modifiersList.includes(parts[i])) {
				textStartIndex = i + 1;
			} else {
				break;
			}
		}

		// content is everything after first colon
		// Count colons needed to skip: textStartIndex - 1
		const colonsToSkip = textStartIndex - 1;
		let colonCount = 0;
		let textStart = 0;

		if (colonsToSkip > 0) {
			for (let i = 0; i < content.length; i++) {
				if (content[i] === ':') {
					colonCount++;
					if (colonCount === colonsToSkip) {
						textStart = i + 1;
						break;
					}
				}
			}
		}

		const text = content.substring(textStart).trim();

		const item = {
			type: 'unordered_list_item'
		};

		if (text) {
			item.text = this.parseTextWithWrappers(text);
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handlePageBreak(content) {
		const page = parseInt(content.trim());
		this.pageBreaks.push(page);
		return {
			type: 'page_break',
			page: page
		};
	}

	handleBlankPage(content) {
		const page = parseInt(content.trim());
		this.pageBreaks.push(page);
		return {
			type: 'blank_page',
			page: page
		};
	}

	handleLineBreak() {
		return {
			type: 'line_break'
		};
	}

	handleVerticalMargin(parts, content) {
		// Format: vm:2: or vm:4: etc.
		// parts[1] contains the spacing value
		const spacing = parseInt(parts[1]) || 1;

		return {
			type: 'vertical_margin',
			spacing: spacing
		};
	}

	handleLine(parts, afterFirstColon) {
		const modifiers = this.parseModifiers(parts);

		// Find the text after modifiers
		// For l:b:i:text, parts = ['l', 'b', 'i', 'text', ...]
		// We need to skip type (parts[0]) and all modifiers
		let text = afterFirstColon;

		// Count how many modifiers we have
		let modCount = 0;
		for (let i = 1; i < parts.length; i++) {
			if (['b', 'o', 'i'].includes(parts[i])) {
				modCount++;
			} else {
				break;
			}
		}

		// Skip past the modifiers by finding the nth colon
		for (let i = 0; i < modCount; i++) {
			const colonIndex = text.indexOf(':');
			if (colonIndex > -1) {
				text = text.substring(colonIndex + 1);
			}
		}

		const item = {
			type: 'line',
			text: this.parseTextWithWrappers(text.trim())
		};

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleButton(parts, afterFirstColon) {
		// button:link:text or button::text
		const link = parts[1] || '';
		const secondColon = afterFirstColon.indexOf(':');
		const text =
			secondColon > -1 ? afterFirstColon.substring(secondColon + 1).trim() : afterFirstColon.trim();

		const item = {
			type: 'button',
			text: this.parseTextWithWrappers(text)
		};

		if (link) {
			item.link = link;
		}

		return item;
	}

	convert(inputPath) {
		this.reset();

		const content = fs.readFileSync(inputPath, 'utf-8');

		// Tokenize first to handle multi-line content
		const tokens = this.tokenize(content);

		// Create a single section with all content
		this.currentSection = {
			id: this.metadata.slug || 'content',
			title: this.metadata.title || 'Content',
			content: []
		};

		tokens.forEach((token) => {
			const item = this.parseToken(token);
			if (item) {
				this.currentSection.content.push(item);
			}
		});

		// Auto-generate missing page breaks based on pg: range
		if (this.metadata.pb_pages.length > 0) {
			const startPage = this.metadata.pb_pages[0];
			const endPage = this.metadata.pb_pages[1] || startPage;

			// Get all existing page breaks
			const existingPages = new Set(this.pageBreaks);

			// Generate missing page breaks
			const missingPageBreaks = [];
			for (let page = startPage; page <= endPage; page++) {
				if (!existingPages.has(page)) {
					missingPageBreaks.push({
						page: page,
						type: 'page_break'
					});
				}
			}

			// Insert missing page breaks into content
			// We'll insert them in order, distributing them evenly through the content
			if (missingPageBreaks.length > 0 && this.currentSection.content.length > 0) {
				const contentLength = this.currentSection.content.length;
				const interval = Math.floor(contentLength / (missingPageBreaks.length + 1));

				// Insert from end to beginning to maintain indices
				for (let i = missingPageBreaks.length - 1; i >= 0; i--) {
					const insertIndex = Math.min((i + 1) * interval, this.currentSection.content.length);
					this.currentSection.content.splice(insertIndex, 0, missingPageBreaks[i]);
					this.pageBreaks.push(missingPageBreaks[i].page);
				}
			}
		}

		// Add section if it has content
		if (this.currentSection.content.length > 0) {
			// Determine page range from page breaks or metadata
			if (this.pageBreaks.length > 0) {
				this.currentSection.pb_page_start = Math.min(...this.pageBreaks);
				this.currentSection.pb_page_end = Math.max(...this.pageBreaks);
			} else if (this.metadata.pb_pages.length > 0) {
				this.currentSection.pb_page_start = this.metadata.pb_pages[0];
				this.currentSection.pb_page_end = this.metadata.pb_pages[1] || this.metadata.pb_pages[0];
			}

			this.sections.push(this.currentSection);
		}

		// Build final JSON structure
		const rootKey = this.metadata.slug || 'service';
		const result = {
			[rootKey]: {
				title: this.metadata.title || 'Untitled Service',
				slug: this.metadata.slug || 'untitled',
				pb_pages: this.metadata.pb_pages,
				sections: this.sections
			}
		};

		return result;
	}
}

function convertFile(inputPath, outputPath) {
	console.log(`\n📄 Converting: ${inputPath}`);

	if (!fs.existsSync(inputPath)) {
		console.error(`❌ File not found: ${inputPath}`);
		process.exit(1);
	}

	const converter = new RawToJsonConverter();
	const result = converter.convert(inputPath);

	// Determine output path
	let output = outputPath;
	if (!output) {
		const inputDir = path.dirname(inputPath);
		const inputName = path.basename(inputPath, '.dpb');
		output = path.join(inputDir, '..', `${inputName}.json`);
	}

	// Write JSON file
	fs.writeFileSync(output, JSON.stringify(result, null, '\t'));
	console.log(`✅ Converted to: ${output}`);

	return output;
}

// Main execution
if (require.main === module) {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log('Usage: node convert-raw-to-json.cjs <input-file> [output-file]');
		console.log('   or: node convert-raw-to-json.cjs <input-directory>');
		console.log('\nExamples:');
		console.log('  node convert-raw-to-json.cjs source/baptism.dpb');
		console.log('  node convert-raw-to-json.cjs source/baptism.dpb output/baptism.json');
		console.log('  node convert-raw-to-json.cjs source/');
		process.exit(1);
	}

	const target = args[0];
	const stats = fs.statSync(target);

	if (stats.isDirectory()) {
		// Convert all .dpb files in directory
		const files = fs.readdirSync(target).filter((f) => f.endsWith('.dpb') && f !== 'key.dpb');
		console.log(`\n🔄 Converting ${files.length} files in ${target}...\n`);

		for (const file of files) {
			const inputPath = path.join(target, file);
			const outputName = path.basename(file, '.dpb') + '.json';
			const outputPath = path.join(target, '..', outputName);
			convertFile(inputPath, outputPath);
		}

		console.log('\n✅ All files converted successfully!');
	} else {
		// Convert single file
		const outputPath = args[1];
		convertFile(target, outputPath);
	}
}

module.exports = { RawToJsonConverter, convertFile };
