#!/usr/bin/env node
/**
 * Find missing pages in DPB files
 *
 * This script analyzes all service JSON files to identify which page numbers
 * don't appear in any DPB file. This helps ensure infinite scrolling has
 * complete page coverage.
 */

const fs = require('fs');
const path = require('path');

const SERVICES_DIR = path.join(__dirname, '../src/lib/data/services');

console.log('🔍 Analyzing page coverage in service files...\n');

// Read all service JSON files
const serviceFiles = fs.readdirSync(SERVICES_DIR).filter(file => file.endsWith('.json'));

console.log(`Found ${serviceFiles.length} service files\n`);

// Collect all page numbers mentioned in services
const pagesFound = new Set();
const pageRanges = [];

for (const filename of serviceFiles) {
	const filepath = path.join(SERVICES_DIR, filename);
	const serviceData = JSON.parse(fs.readFileSync(filepath, 'utf8'));

	if (!serviceData.service) continue;

	const service = serviceData.service;

	// Track page ranges from metadata
	if (service.pb_pages && service.pb_pages.length > 0) {
		const start = service.pb_pages[0];
		const end = service.pb_pages[1] || start;
		pageRanges.push({ file: filename, start, end });
	}

	// Collect all page breaks
	for (const section of service.sections || []) {
		for (const block of section.content || []) {
			if (block.type === 'page_break' || block.type === 'blank_page') {
				pagesFound.add(block.page);
			}
		}
	}
}

// Sort pages
const sortedPages = Array.from(pagesFound).sort((a, b) => a - b);

console.log('📊 Page Coverage Summary:');
console.log('─'.repeat(50));
console.log(`Total pages found: ${sortedPages.length}`);
console.log(`Range: ${sortedPages[0]} to ${sortedPages[sortedPages.length - 1]}`);
console.log();

// Find gaps in page sequences
const gaps = [];
for (let i = 0; i < sortedPages.length - 1; i++) {
	const current = sortedPages[i];
	const next = sortedPages[i + 1];

	// Check for gap (accounting for negative numbers)
	if (next - current > 1) {
		const missing = [];
		for (let p = current + 1; p < next; p++) {
			missing.push(p);
		}
		gaps.push({ after: current, before: next, missing });
	}
}

if (gaps.length > 0) {
	console.log('❌ Missing Pages (gaps in sequence):');
	console.log('─'.repeat(50));

	for (const gap of gaps) {
		console.log(`Gap between page ${gap.after} and ${gap.before}:`);
		console.log(`  Missing: ${gap.missing.join(', ')}`);
		console.log();
	}
} else {
	console.log('✅ No gaps found in page sequence!');
}

console.log('\n📄 Service File Ranges:');
console.log('─'.repeat(50));
pageRanges.sort((a, b) => a.start - b.start);
for (const range of pageRanges) {
	const pages = range.end ? `${range.start}-${range.end}` : `${range.start}`;
	console.log(`${range.file.padEnd(40)} Pages: ${pages}`);
}
