#!/usr/bin/env node
/**
 * Build service_pages.json from individual service JSON files
 *
 * This script reads all service JSON files from src/lib/data/services/
 * and builds a page-indexed JSON file where each page number maps to its content.
 */

const fs = require('fs');
const path = require('path');

const SERVICES_DIR = path.join(__dirname, '../src/lib/data/services');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/data/service_pages.json');

console.log('📖 Building service_pages.json from service files...\n');

// Read all service JSON files
const serviceFiles = fs
	.readdirSync(SERVICES_DIR)
	.filter((file) => file.endsWith('.json') && file !== 'service_pages.json');

console.log(`Found ${serviceFiles.length} service files`);

const servicePages = {};

for (const filename of serviceFiles) {
	const filepath = path.join(SERVICES_DIR, filename);
	const fileData = JSON.parse(fs.readFileSync(filepath, 'utf8'));

	// Get the actual service object - it could be under different keys
	let service = null;
	let serviceTitle = '';

	if (fileData.service) {
		service = fileData.service;
		serviceTitle = service.title || '';
	} else {
		// Find the first key that has sections
		const keys = Object.keys(fileData);
		for (const key of keys) {
			if (fileData[key] && fileData[key].sections) {
				service = fileData[key];
				serviceTitle = service.title || key;
				break;
			}
		}
	}

	if (!service || !service.sections) {
		console.log(`⚠️  Skipping ${filename} - no sections found`);
		continue;
	}

	console.log(`Processing ${filename} (${serviceTitle})`);

	// Process each section
	for (const section of service.sections) {
		let currentPage = null;
		let currentPageContent = [];

		for (const block of section.content || []) {
			// Check if this is a page break or blank page
			if (block.type === 'page_break' || block.type === 'blank_page') {
				// Save previous page if exists
				if (currentPage !== null) {
					if (!servicePages[currentPage]) {
						servicePages[currentPage] = {
							pageNumber: currentPage,
							headerText: serviceTitle,
							content: []
						};
					}
					servicePages[currentPage].content.push(...currentPageContent);
				}

				// Start new page
				currentPage = block.page;
				currentPageContent = [];

				// For blank pages, add the blank_page block as content
				if (block.type === 'blank_page') {
					currentPageContent.push(block);
				}
			} else {
				// Add content to current page
				if (currentPage !== null) {
					currentPageContent.push(block);
				}
			}
		}

		// Save last page
		if (currentPage !== null) {
			if (!servicePages[currentPage]) {
				servicePages[currentPage] = {
					pageNumber: currentPage,
					headerText: serviceTitle,
					content: []
				};
			}
			servicePages[currentPage].content.push(...currentPageContent);
		}
	}
}

// Write output
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(servicePages, null, 2));

const pageCount = Object.keys(servicePages).length;
const numericPages = Object.keys(servicePages)
	.map((p) => parseInt(p))
	.filter((p) => !isNaN(p))
	.sort((a, b) => a - b);
const pageRange =
	numericPages.length > 0
		? `${numericPages[0]} to ${numericPages[numericPages.length - 1]}`
		: 'none';

console.log(`\n✅ Built service_pages.json with ${pageCount} pages`);
console.log(`📄 Page range: ${pageRange}`);
console.log(`📝 Output: ${OUTPUT_FILE}`);
