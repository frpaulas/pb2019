#!/usr/bin/env node
/**
 * Convert Svelte collect components to DPB format and generate collects.json
 * Usage: node scripts/convert-collects-to-dpb.cjs
 */

const fs = require('fs');
const path = require('path');

const collectDir = path.join(__dirname, '..', 'src', 'lib', 'collect');
const outputDpbDir = path.join(__dirname, '..', 'src', 'lib', 'data', 'collects', 'dpb');
const outputJsonPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'collects', 'collects.json');

// Ensure output directories exist
if (!fs.existsSync(outputDpbDir)) {
	fs.mkdirSync(outputDpbDir, { recursive: true });
}

// Parse a Svelte collect file and extract content
function parseSvelteCollect(content) {
	const lines = [];

	// Match SectionTitle components
	// Pattern 1: <SectionTitle>text</SectionTitle>
	// Pattern 2: <SectionTitle size="xl" text="text" />
	// Pattern 3: <SectionTitle>_text_</SectionTitle> (italic/day marker)
	const sectionTitleRegex1 = /<SectionTitle[^>]*>([^<]+)<\/SectionTitle>/g;
	const sectionTitleRegex2 = /<SectionTitle[^>]*text="([^"]+)"[^>]*\/>/g;

	// Match TextBlock components
	// Pattern 1: <TextBlock>text</TextBlock>
	// Pattern 2: <TextBlock text="text" />
	// Pattern 3: <TextBlock>text</TextBlock with newlines
	const textBlockRegex1 = /<TextBlock[^>]*>([\s\S]*?)<\/TextBlock\s*>/g;
	const textBlockRegex2 = /<TextBlock[^>]*text="([^"]+)"[^>]*\/>/g;

	let match;

	// Process content in order by finding all matches and sorting by position
	const matches = [];

	// Find all SectionTitle matches (pattern 1)
	const stRegex1 = /<SectionTitle[^>]*>([^<]+)<\/SectionTitle>/g;
	while ((match = stRegex1.exec(content)) !== null) {
		matches.push({ index: match.index, type: 'st', text: match[1].trim() });
	}

	// Find all SectionTitle matches (pattern 2 - self-closing with text attr)
	const stRegex2 = /<SectionTitle[^>]*text="([^"]+)"[^>]*\/>/g;
	while ((match = stRegex2.exec(content)) !== null) {
		matches.push({ index: match.index, type: 'st', text: match[1].trim() });
	}

	// Find all TextBlock matches (pattern 1 - with content)
	const tbRegex1 = /<TextBlock[^>]*>([\s\S]*?)<\/TextBlock\s*>/g;
	while ((match = tbRegex1.exec(content)) !== null) {
		// Clean up the text - remove extra whitespace, normalize newlines
		let text = match[1]
			.replace(/\s+/g, ' ')
			.trim();
		matches.push({ index: match.index, type: 'tb', text });
	}

	// Find all TextBlock matches (pattern 2 - self-closing with text attr)
	const tbRegex2 = /<TextBlock[^>]*text="([^"]+)"[^>]*\/>/g;
	while ((match = tbRegex2.exec(content)) !== null) {
		matches.push({ index: match.index, type: 'tb', text: match[1].trim() });
	}

	// Sort by position in file
	matches.sort((a, b) => a.index - b.index);

	// Generate DPB lines
	for (const m of matches) {
		if (m.type === 'st') {
			lines.push(`st: ${m.text}`);
		} else if (m.type === 'tb') {
			// Handle long text blocks - wrap at ~80 chars with continuation
			const words = m.text.split(' ');
			let currentLine = 'tb: ';
			const outputLines = [];

			for (const word of words) {
				if (currentLine.length + word.length + 1 > 100) {
					outputLines.push(currentLine.trimEnd());
					currentLine = '    ' + word + ' ';
				} else {
					currentLine += word + ' ';
				}
			}
			if (currentLine.trim()) {
				outputLines.push(currentLine.trimEnd());
			}

			lines.push(outputLines.join('\n'));
		}
	}

	return lines.join('\n');
}

// Convert DPB content to JSON blocks (simplified version for collects.json)
function dpbToJsonBlocks(dpbContent) {
	const blocks = [];
	const lines = dpbContent.split('\n');
	let i = 0;

	while (i < lines.length) {
		const line = lines[i].trim();

		if (line.startsWith('st:')) {
			blocks.push({
				type: 'section_title',
				text: line.substring(3).trim()
			});
			i++;
		} else if (line.startsWith('tb:')) {
			// Collect continuation lines
			let text = line.substring(3).trim();
			i++;
			while (i < lines.length && lines[i].startsWith('    ')) {
				text += ' ' + lines[i].trim();
				i++;
			}
			blocks.push({
				type: 'text_block',
				text: text
			});
		} else {
			i++;
		}
	}

	return blocks;
}

// Main conversion
console.log('📿 Converting collects from Svelte to DPB...\n');

const collectFiles = fs.readdirSync(collectDir)
	.filter(f => f.endsWith('.svelte'))
	.sort();

const collectsJson = {};
let converted = 0;
let errors = 0;

for (const file of collectFiles) {
	const name = path.basename(file, '.svelte');
	const inputPath = path.join(collectDir, file);
	const outputPath = path.join(outputDpbDir, `${name}.dpb`);

	try {
		const content = fs.readFileSync(inputPath, 'utf-8');
		const dpbContent = parseSvelteCollect(content);

		// Write DPB file
		fs.writeFileSync(outputPath, dpbContent + '\n');

		// Add to JSON lookup
		collectsJson[name] = dpbToJsonBlocks(dpbContent);

		converted++;
		process.stdout.write(`  ✓ ${name}\n`);
	} catch (err) {
		console.error(`  ✗ ${name}: ${err.message}`);
		errors++;
	}
}

// Write collects.json
fs.writeFileSync(outputJsonPath, JSON.stringify(collectsJson, null, '\t'));

console.log(`\n✅ Converted ${converted} collects`);
if (errors > 0) {
	console.log(`❌ ${errors} errors`);
}
console.log(`📄 DPB files: ${outputDpbDir}`);
console.log(`📄 JSON lookup: ${outputJsonPath}`);
