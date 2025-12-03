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
				result.push({
					type: 'text',
					value: textBefore
				});
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
			result.push({
				type: 'text',
				value: text.substring(lastIndex)
			});
		}

		// If no matches found, return text as single element
		if (result.length === 0) {
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

			// Skip empty lines and comments (# or //)
			if (!line || line.startsWith('#') || line.startsWith('//')) {
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

			// For multi-line types (tb, r, bt), collect all following lines until next type
			const multiLineTypes = ['tb', 'r', 'bt'];
			if (multiLineTypes.includes(type)) {
				const textLines = [afterFirstColon];
				let j = i + 1;

				// Collect continuation lines
				while (j < lines.length) {
					let nextLine = lines[j].trim();

					// Skip comment lines
					if (nextLine.startsWith('//') || nextLine.startsWith('#')) {
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
							'l',
							'button',
							'bt',
							'use',
							'lords_prayer',
							'scripture'
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

			case 'pb':
				return this.handlePageBreak(content);

			case 'l':
				return this.handleLine(parts, content);

			case 'button':
				return this.handleButton(parts, content);

			case 'use':
				return this.handleUse(parts, content);

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
		const trimmed = content.trim();
		if (trimmed.includes('-')) {
			const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()));
			this.metadata.pb_pages = [start, end];
		} else {
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
			text: text
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
			item.text = text;
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
			item.text = text;
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
			text: content.trim()
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
			item.text = text;
		}

		if (modifiers.bold) item.bold = true;
		if (modifiers.optional) item.optional = true;
		if (modifiers.indent) item.indent = true;

		return item;
	}

	handleUse(parts, afterFirstColon) {
		// use:component_name: or use:component_name:param:
		// Special handling for use:psalm:number:start:end:
		let componentName = parts[1] || afterFirstColon.trim();

		// Strip trailing colon if present
		if (componentName && componentName.endsWith(':')) {
			componentName = componentName.slice(0, -1);
		}

		if (!componentName) {
			console.warn('Warning: use: requires component name');
			return null;
		}

		// Handle psalm with parameters: use:psalm:119:105:112:b
		// Format: use:psalm:number:start:end:b (b is optional bold modifier)
		if (componentName === 'psalm') {
			const psalmNumber = parseInt(parts[2]);
			const startVerse = parts[3] ? parseInt(parts[3]) : 1;
			const endVerse = parts[4] ? parseInt(parts[4]) : undefined;
			const bold = parts[5] === 'b';

			const item = {
				type: 'show_psalm',
				ps: psalmNumber
			};

			// Add from/to if not default
			if (startVerse !== 1) {
				item.from = startVerse;
			}
			if (endVerse !== undefined) {
				item.to = endVerse;
			}
			if (bold) {
				item.bold = true;
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

		// Default: return component type
		const item = {
			type: componentName
		};

		return item;
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
			item.text = text;
		}

		// Check if speaker is 'b' or if bold modifier
		if (speaker === 'b' || modifiers.bold) {
			item.bold = true;
		}

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
			text: text.trim()
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
			text: text
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
