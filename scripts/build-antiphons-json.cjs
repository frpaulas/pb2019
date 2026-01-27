#!/usr/bin/env node
/**
 * Build antiphons.json from DPB files in src/lib/data/antiphon/dpb/
 * Usage: node scripts/build-antiphons-json.cjs
 */

const fs = require('fs');
const path = require('path');

const dpbDir = path.join(__dirname, '..', 'src', 'lib', 'data', 'antiphon', 'dpb');
const outputJsonPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'antiphon', 'antiphons.json');

/**
 * Process escape sequences in text
 */
function processEscapeSequences(text) {
	if (!text || typeof text !== 'string') return text;
	return text
		.replace(/\\n/g, '\n')
		.replace(/\\t/g, '\t')
		.replace(/\\r/g, '\r')
		.replace(/\\\\/g, '\\');
}

/**
 * Parse text with wrapper syntax like {{u}}text{{/u}}
 */
function parseTextWithWrappers(text) {
	if (!text || typeof text !== 'string') return text;
	text = processEscapeSequences(text);
	if (!text.includes('{{') && !text.includes('___')) return text;

	const segments = [];
	let lastIndex = 0;
	const combinedRegex = /(\{\{([a-z]+)\}\}(.*?)\{\{\/\2\}\})|(___([^_]+)___)/g;
	let match;

	while ((match = combinedRegex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			const beforeText = text.substring(lastIndex, match.index);
			if (beforeText) segments.push({ type: 'text', value: beforeText });
		}
		if (match[1]) {
			segments.push({ type: match[2], value: match[3] });
		} else if (match[4]) {
			segments.push({ type: 'blank', value: match[5] });
		}
		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < text.length) {
		const remainingText = text.substring(lastIndex);
		if (remainingText) segments.push({ type: 'text', value: remainingText });
	}

	return segments.length > 0 ? segments : text;
}

/**
 * Parse a single antiphon DPB file
 */
function parseAntiphonDpb(content) {
	const blocks = [];
	const lines = content.split('\n');
	let i = 0;

	while (i < lines.length) {
		let line = lines[i];

		if (!line.trim()) {
			i++;
			continue;
		}

		// Handle continuation lines
		let fullLine = line;
		while (
			i + 1 < lines.length &&
			(lines[i + 1].startsWith('  ') || lines[i + 1].startsWith('\t'))
		) {
			i++;
			fullLine += ' ' + lines[i].trim();
		}

		const trimmedLine = fullLine.trim();

		const firstColonIndex = trimmedLine.indexOf(':');
		if (firstColonIndex === -1) {
			i++;
			continue;
		}

		const allParts = trimmedLine.split(':');
		const baseDirective = allParts[0];

		if (baseDirective === 'st') {
			const block = { type: 'section_title' };

			if (allParts.length >= 3 && (allParts[1] === 'fancy' || allParts[1] === 'latin_size')) {
				if (allParts[1] === 'fancy') block.fancy = true;
				if (allParts[1] === 'latin_size') block.latin_size = true;
				block.text = allParts.slice(2).join(':').trim();
			} else {
				block.text = allParts.slice(1).join(':').trim();
			}

			if (block.text) blocks.push(block);
		} else if (baseDirective === 'r') {
			blocks.push({
				type: 'rubric',
				text: allParts.slice(1).join(':').trim()
			});
		} else if (baseDirective === 'l') {
			const block = { type: 'line' };

			let textStartIndex = 1;
			for (let j = 1; j < allParts.length; j++) {
				const part = allParts[j].trim();
				if (part === 'b') {
					block.bold = true;
					textStartIndex = j + 1;
				} else if (part === 'i') {
					block.indent = true;
					textStartIndex = j + 1;
				} else {
					break;
				}
			}

			block.text = allParts.slice(textStartIndex).join(':').trim();
			blocks.push(block);
		} else if (baseDirective === 'ref') {
			blocks.push({
				type: 'ref',
				text: allParts.slice(1).join(':').trim()
			});
		} else if (baseDirective === 'vm') {
			blocks.push({
				type: 'vertical_margin',
				spacing: parseInt(allParts[1]) || 1
			});
		}

		i++;
	}

	return blocks;
}

// Main build
console.log('🎵 Building antiphons.json from DPB files...\n');

const dpbFiles = fs
	.readdirSync(dpbDir)
	.filter((f) => f.endsWith('.dpb'))
	.sort();

const antiphonsJson = {};
let converted = 0;
let errors = 0;

for (const file of dpbFiles) {
	const name = path.basename(file, '.dpb');
	const inputPath = path.join(dpbDir, file);

	try {
		const content = fs.readFileSync(inputPath, 'utf-8');
		const blocks = parseAntiphonDpb(content);

		antiphonsJson[name] = blocks;
		converted++;
		process.stdout.write(`  \u2713 ${name}\n`);
	} catch (err) {
		console.error(`  \u2717 ${name}: ${err.message}`);
		errors++;
	}
}

// Write antiphons.json
fs.writeFileSync(outputJsonPath, JSON.stringify(antiphonsJson, null, '\t'));

console.log(`\n\u2705 Built antiphons.json with ${converted} entries`);
if (errors > 0) {
	console.log(`\u274c ${errors} errors`);
}
console.log(`\uD83D\uDCC4 Output: ${outputJsonPath}`);
