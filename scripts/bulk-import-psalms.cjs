#!/usr/bin/env node

/**
 * Bulk import psalms and canticles from formatted text file
 *
 * Format:
 * === key|name|title
 * verse_number
 * line1
 * line2
 * verse_number
 * line1
 * line2
 *
 * === next_key|name|title
 * ...
 *
 * Keys can be:
 * - Numbers: "1", "23", etc. (psalms)
 * - Special: "23kjv" (KJV version)
 * - Names: "jubilate", "benedictus", etc. (canticles)
 *
 * Usage:
 *   node scripts/bulk-import-psalms.cjs < tmp.txt
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/lib/db/psalms.json');

function parseFile(input) {
	const lines = input.split('\n');
	const entries = [];
	let currentEntry = null;
	let currentVerses = [];
	let lineBuffer = [];
	let lineNum = 0;
	let currentHebrew = ''; // Track current Hebrew letter section

	for (const line of lines) {
		lineNum++;

		// Check for new entry marker
		if (line.startsWith('===')) {
			// Save previous entry if exists
			if (currentEntry) {
				currentEntry.verses = currentVerses;
				entries.push(currentEntry);
			}

			// Parse new entry header
			const match = line.match(/^===\s*([^|]+)\|([^|]+)\|(.+)$/);
			if (!match) {
				console.error(`Line ${lineNum}: Invalid entry header: "${line}"`);
				process.exit(1);
			}

			const [, key, name, title] = match;
			currentEntry = {
				key: key.trim(),
				name: name.trim(),
				title: title.trim()
			};
			currentVerses = [];
			lineBuffer = [];
			currentHebrew = ''; // Reset Hebrew section for new entry
			continue;
		}

		// Skip empty lines between entries
		if (!currentEntry && line.trim() === '') {
			continue;
		}

		// Collect verse lines
		if (currentEntry) {
			const trimmed = line.trim();

			// Check for Hebrew letter section marker (all uppercase, alphabetic)
			if (trimmed && /^[A-Z]+$/.test(trimmed) && trimmed.length > 1) {
				currentHebrew = trimmed;
				console.log(`  Found Hebrew section: ${currentHebrew} in ${currentEntry.key}`);
				continue;
			}

			if (trimmed !== '') {
				lineBuffer.push(line);
			}

			// When we have 3 lines, create a verse
			if (lineBuffer.length === 3) {
				const vs = parseInt(lineBuffer[0].trim());
				// Replace || with actual newlines for line breaks within verses
				const ln1 = lineBuffer[1].trim().replace(/\|\|/g, '\n');
				const ln2 = lineBuffer[2].trim().replace(/\|\|/g, '\n');

				if (isNaN(vs)) {
					console.error(`Line ${lineNum - 2}: Invalid verse number: "${lineBuffer[0]}"`);
					console.error(`  Entry: ${currentEntry.key} | ${currentEntry.name}`);
					process.exit(1);
				}

				currentVerses.push({
					vs,
					ln1,
					ln2,
					hebrew: currentHebrew // Use current Hebrew section (empty string if none)
				});

				lineBuffer = [];
			}
		}
	}

	// Save last entry
	if (currentEntry) {
		if (lineBuffer.length > 0) {
			console.error(
				`Warning: Entry "${currentEntry.key}" has incomplete verse data (${lineBuffer.length} lines remaining)`
			);
			console.error(`  Lines: ${JSON.stringify(lineBuffer)}`);
		}
		currentEntry.verses = currentVerses;
		entries.push(currentEntry);
	}

	return entries;
}

function main() {
	console.log('=== Bulk Import Psalms and Canticles ===\n');

	// Read from stdin
	const input = fs.readFileSync(0, 'utf-8');

	console.log('Parsing input file...');
	const entries = parseFile(input);

	console.log(`\nFound ${entries.length} entries:`);
	entries.forEach((entry) => {
		console.log(`  ${entry.key}: "${entry.name}" (${entry.verses.length} verses)`);
	});

	// Load existing database
	const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
	console.log(`\nExisting database has ${Object.keys(db).length} entries`);

	// Check for conflicts
	const conflicts = entries.filter((e) => db[e.key]);
	if (conflicts.length > 0) {
		console.log('\n⚠️  Warning: The following entries already exist and will be overwritten:');
		conflicts.forEach((c) => console.log(`  - ${c.key}: ${c.name}`));
		console.log('\nPress Ctrl+C to cancel, or wait 3 seconds to continue...');

		// Wait 3 seconds before proceeding
		const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		return wait(3000).then(() => continueImport());
	} else {
		continueImport();
	}

	function continueImport() {
		// Add new entries to database
		let addedCount = 0;
		let updatedCount = 0;

		entries.forEach((entry) => {
			const isNew = !db[entry.key];

			// Convert parsed entry to database format
			// For numeric keys, ensure number field is a number
			const keyAsNum = parseInt(entry.key);
			const number = isNaN(keyAsNum) ? entry.key : keyAsNum;

			db[entry.key] = {
				number: number,
				name: entry.name,
				title: entry.title,
				verses: entry.verses
			};

			if (isNew) {
				addedCount++;
			} else {
				updatedCount++;
			}
		});

		// Write back to file with nice formatting
		fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');

		console.log('\n✅ Import complete!');
		console.log(`  Added: ${addedCount}`);
		console.log(`  Updated: ${updatedCount}`);
		console.log(`  Total entries in database: ${Object.keys(db).length}`);

		// Show statistics
		const totalVerses = Object.values(db).reduce((sum, entry) => sum + entry.verses.length, 0);
		console.log(`  Total verses: ${totalVerses}`);
	}
}

main();
