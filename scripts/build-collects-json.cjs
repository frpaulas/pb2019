#!/usr/bin/env node
/**
 * Build collects.json from DPB files in src/lib/data/collects/dpb/
 * Usage: node scripts/build-collects-json.cjs
 */

const fs = require('fs');
const path = require('path');

const collectDpbDir = path.join(__dirname, '..', 'src', 'lib', 'data', 'collects', 'dpb');
const outputJsonPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'collects', 'collects.json');

// Simple DPB parser for collects (subset of full parser)
function parseCollectDpb(content) {
	const blocks = [];
	const lines = content.split('\n');
	let i = 0;

	while (i < lines.length) {
		let line = lines[i];

		// Skip empty lines
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

		// Parse directive - split on all colons
		const firstColonIndex = trimmedLine.indexOf(':');
		if (firstColonIndex === -1) {
			i++;
			continue;
		}

		// Get all parts split by colon
		const allParts = trimmedLine.split(':');
		const baseDirective = allParts[0];

		// Handle different directives
		if (baseDirective === 'st') {
			const block = { type: 'section_title' };

			// Check for modifiers like st:fancy: or st:latin_size:
			if (allParts.length >= 3 && (allParts[1] === 'fancy' || allParts[1] === 'latin_size')) {
				if (allParts[1] === 'fancy') block.fancy = true;
				if (allParts[1] === 'latin_size') block.latin_size = true;
				block.text = allParts.slice(2).join(':').trim();
			} else {
				block.text = allParts.slice(1).join(':').trim();
			}

			if (block.text) {
				blocks.push(block);
			}
		} else if (baseDirective === 'r') {
			blocks.push({
				type: 'rubric',
				text: allParts.slice(1).join(':').trim()
			});
		} else if (baseDirective === 'tb') {
			const block = { type: 'text_block' };

			// Check for amen modifier: tb:amen: text
			if (allParts.length >= 3 && allParts[1] === 'amen') {
				block.amen = true;
				block.text = allParts.slice(2).join(':').trim();
			} else {
				block.text = allParts.slice(1).join(':').trim();
			}

			blocks.push(block);
		} else if (baseDirective === 'l') {
			const block = { type: 'line' };

			// Parse modifiers (b = bold, i = indent)
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
console.log('📿 Building collects.json from DPB files...\n');

const dpbFiles = fs
	.readdirSync(collectDpbDir)
	.filter((f) => f.endsWith('.dpb'))
	.sort();

const collectsJson = {};
let converted = 0;
let errors = 0;

for (const file of dpbFiles) {
	const name = path.basename(file, '.dpb');
	const inputPath = path.join(collectDpbDir, file);

	try {
		const content = fs.readFileSync(inputPath, 'utf-8');
		const blocks = parseCollectDpb(content);

		collectsJson[name] = blocks;
		converted++;
		process.stdout.write(`  ✓ ${name}\n`);
	} catch (err) {
		console.error(`  ✗ ${name}: ${err.message}`);
		errors++;
	}
}

// Write collects.json
fs.writeFileSync(outputJsonPath, JSON.stringify(collectsJson, null, '\t'));

console.log(`\n✅ Built collects.json with ${converted} collects`);
if (errors > 0) {
	console.log(`❌ ${errors} errors`);
}
console.log(`📄 Output: ${outputJsonPath}`);
