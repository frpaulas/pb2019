#!/usr/bin/env node
/**
 * Validator for DPB source format service files
 * Usage: node scripts/validate-raw-format.cjs <file-path>
 */

const fs = require('fs');
const path = require('path');

// Valid line types from key.txt
const VALID_TYPES = new Set([
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
	'lords_prayer'
]);

// Global modifiers
const VALID_MODIFIERS = new Set(['b', 'o', 'i']);

class ValidationError {
	constructor(line, lineNum, message) {
		this.line = line;
		this.lineNum = lineNum;
		this.message = message;
	}

	toString() {
		return `Line ${this.lineNum}: ${this.message}\n  "${this.line}"`;
	}
}

function validateLine(line, lineNum) {
	const errors = [];
	const trimmed = line.trim();

	// Skip empty lines and comments
	if (!trimmed || trimmed.startsWith('#')) {
		return errors;
	}

	// Parse line type
	const colonIndex = trimmed.indexOf(':');
	if (colonIndex === -1) {
		errors.push(new ValidationError(line, lineNum, 'Missing colon separator'));
		return errors;
	}

	const typeWithModifiers = trimmed.substring(0, colonIndex);
	const parts = typeWithModifiers.split(':');
	const type = parts[0];

	// Validate type
	if (!VALID_TYPES.has(type)) {
		errors.push(
			new ValidationError(
				line,
				lineNum,
				`Invalid type "${type}". Valid types: ${Array.from(VALID_TYPES).join(', ')}`
			)
		);
	}

	// Validate modifiers (if present after type)
	for (let i = 1; i < parts.length; i++) {
		const modifier = parts[i];
		if (modifier && !VALID_MODIFIERS.has(modifier) && modifier !== '') {
			// For versicals, second part is speaker, not modifier
			if (type === 'v' && i === 1) {
				continue; // speakers can be anything
			}
			// For st (section title), second part can be size (1,2,3)
			if (type === 'st' && i === 1 && /^[123]$/.test(modifier)) {
				continue;
			}
			if (!VALID_MODIFIERS.has(modifier)) {
				errors.push(
					new ValidationError(
						line,
						lineNum,
						`Invalid modifier "${modifier}". Valid modifiers: ${Array.from(VALID_MODIFIERS).join(', ')}`
					)
				);
			}
		}
	}

	// Type-specific validation
	switch (type) {
		case 'pg':
			// pg: n | pg: n-n
			const pgContent = trimmed.substring(colonIndex + 1).trim();
			if (!pgContent || !/^\d+(-\d+)?$/.test(pgContent)) {
				errors.push(
					new ValidationError(line, lineNum, 'Invalid page format. Expected: pg: n or pg: n-n')
				);
			}
			break;

		case 'pb':
			// pb: n
			const pbContent = trimmed.substring(colonIndex + 1).trim();
			if (!pbContent || !/^\d+$/.test(pbContent)) {
				errors.push(
					new ValidationError(line, lineNum, 'Invalid page break format. Expected: pb: n')
				);
			}
			break;

		case 'v':
			// v::text or v:b: or v:speaker:text
			if (parts.length < 2) {
				errors.push(
					new ValidationError(
						line,
						lineNum,
						'Invalid versical format. Expected: v::text or v:speaker:text or v:b:'
					)
				);
			}
			break;

		case 'button':
			// button:link:text or button::text
			if (parts.length < 2) {
				errors.push(
					new ValidationError(
						line,
						lineNum,
						'Invalid button format. Expected: button:link:text or button::text'
					)
				);
			}
			break;

		case 'st':
			// st:text or st:(1|2|3):text
			if (parts.length > 1 && parts[1] && !/^[123]?$/.test(parts[1])) {
				const content = trimmed.substring(colonIndex + 1).trim();
				if (!content && parts[1] !== '1' && parts[1] !== '2' && parts[1] !== '3') {
					errors.push(
						new ValidationError(
							line,
							lineNum,
							'Invalid section title format. Expected: st:text or st:(1|2|3):text'
						)
					);
				}
			}
			break;
	}

	// Check for content (except for page breaks and special markers)
	if (!['pb', 'pg'].includes(type)) {
		const contentStart = trimmed.indexOf(':', colonIndex + 1);
		const content =
			contentStart > -1
				? trimmed.substring(contentStart + 1).trim()
				: trimmed.substring(colonIndex + 1).trim();

		// For versicals, content can be empty if it's a bold marker
		if (type === 'v' && parts[1] === 'b' && !content) {
			// This is ok
		} else if (!content && type !== 'button') {
			errors.push(new ValidationError(line, lineNum, 'Missing content after type declaration'));
		}
	}

	return errors;
}

function validateFile(filePath) {
	console.log(`\n📋 Validating: ${filePath}`);

	if (!fs.existsSync(filePath)) {
		console.error(`❌ File not found: ${filePath}`);
		process.exit(1);
	}

	const content = fs.readFileSync(filePath, 'utf-8');
	const lines = content.split('\n');
	const allErrors = [];

	lines.forEach((line, index) => {
		const errors = validateLine(line, index + 1);
		allErrors.push(...errors);
	});

	if (allErrors.length === 0) {
		console.log('✅ Validation passed! No errors found.');
		return true;
	} else {
		console.log(`\n❌ Found ${allErrors.length} error(s):\n`);
		allErrors.forEach((error) => {
			console.log(error.toString());
			console.log('');
		});
		return false;
	}
}

// Main execution
if (require.main === module) {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log('Usage: node validate-raw-format.cjs <file-path>');
		console.log('   or: node validate-raw-format.cjs <directory-path>');
		process.exit(1);
	}

	const target = args[0];
	const stats = fs.statSync(target);

	if (stats.isDirectory()) {
		// Validate all .dpb files in directory
		const files = fs.readdirSync(target).filter((f) => f.endsWith('.dpb'));
		console.log(`\n🔍 Validating ${files.length} files in ${target}...\n`);

		let allValid = true;
		for (const file of files) {
			const filePath = path.join(target, file);
			const isValid = validateFile(filePath);
			if (!isValid) allValid = false;
		}

		if (allValid) {
			console.log('\n✅ All files validated successfully!');
			process.exit(0);
		} else {
			console.log('\n❌ Some files have validation errors.');
			process.exit(1);
		}
	} else {
		// Validate single file
		const isValid = validateFile(target);
		process.exit(isValid ? 0 : 1);
	}
}

module.exports = { validateLine, validateFile };
