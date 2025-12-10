#!/usr/bin/env node

/**
 * Migration script: Convert DPB files from backslash continuations to whitespace-based continuations
 *
 * Changes:
 * - Removes trailing \ from lines
 * - Indents continuation lines with 2 spaces
 * - Only affects r:, tb:, and l: directives (the only multiline-capable ones)
 */

const fs = require('fs');
const path = require('path');

// Multiline-capable directives
const MULTILINE_PREFIXES = ['r', 'tb', 'l'];

function migrateFile(filePath) {
	console.log(`\nMigrating: ${path.basename(filePath)}`);

	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		const lines = content.split('\n');
		const newLines = [];

		let expectingContinuation = false;
		let changeCount = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const trimmedLine = line.trim();

			// Skip empty lines and comments as-is
			if (trimmedLine === '' || line.startsWith('#')) {
				newLines.push(line);
				expectingContinuation = false;
				continue;
			}

			// If we're expecting a continuation, this line is a continuation
			// (regardless of whether it has a colon, like "hands: You")
			if (expectingContinuation) {
				// Remove trailing backslash and re-indent with 2 spaces
				const cleaned = trimmedLine.replace(/\s*\\$/, '');
				newLines.push('  ' + cleaned);
				changeCount++;

				// Check if we should continue expecting more lines
				expectingContinuation = trimmedLine.endsWith('\\');
				continue;
			}

			// This is a new directive line
			// Check if it's a multiline-capable directive
			const colonIndex = line.indexOf(':');
			if (colonIndex > 0) {
				const prefix = line.substring(0, colonIndex);
				const basePrefix = prefix.split(':')[0];

				// Check if this directive supports multiline
				const isMultilineCapable = MULTILINE_PREFIXES.includes(basePrefix);

				// Check if line ends with backslash
				if (isMultilineCapable && trimmedLine.endsWith('\\')) {
					// Remove the backslash
					const withoutBackslash = line.replace(/\s*\\$/, '');
					newLines.push(withoutBackslash);
					expectingContinuation = true;
					changeCount++;
				} else {
					newLines.push(line);
					expectingContinuation = false;
				}
			} else {
				// No colon - just preserve as-is
				newLines.push(line);
				expectingContinuation = false;
			}
		}

		// Write back to file
		const newContent = newLines.join('\n');
		fs.writeFileSync(filePath, newContent, 'utf-8');

		console.log(`  ✓ Modified ${changeCount} lines`);
		return { success: true, changes: changeCount };
	} catch (err) {
		console.error(`  ✗ Error: ${err.message}`);
		return { success: false, error: err.message };
	}
}

function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error('Usage: node migrate-dpb-to-whitespace.cjs <file1.dpb> [file2.dpb ...]');
		console.error('   or: node migrate-dpb-to-whitespace.cjs src/lib/data/services/dpb/*.dpb');
		process.exit(1);
	}

	let totalFiles = 0;
	let successCount = 0;
	let totalChanges = 0;

	console.log('DPB Migration: Backslash → Whitespace Continuation\n');
	console.log('='.repeat(60));

	for (const filePath of args) {
		if (!fs.existsSync(filePath)) {
			console.error(`File not found: ${filePath}`);
			continue;
		}

		if (!filePath.endsWith('.dpb')) {
			console.error(`Skipping non-DPB file: ${filePath}`);
			continue;
		}

		totalFiles++;
		const result = migrateFile(filePath);

		if (result.success) {
			successCount++;
			totalChanges += result.changes;
		}
	}

	// Summary
	console.log('\n' + '='.repeat(60));
	console.log(`Migrated ${successCount}/${totalFiles} file(s)`);
	console.log(`Total lines modified: ${totalChanges}`);

	if (successCount < totalFiles) {
		process.exit(1);
	}
}

// Run if called directly
if (require.main === module) {
	main();
}

module.exports = { migrateFile };
