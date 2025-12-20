#!/usr/bin/env node

/**
 * DPB Linter
 * Validates *.dpb files for correct syntax and common issues
 */

const fs = require('fs');
const path = require('path');

// Valid line prefixes and their patterns
const VALID_PREFIXES = {
	pg: /^pg:\s*\d+(-\d+)?$/,
	tp: /^tp:\s*.+$/,
	pb: /^pb:\s*\d+$/,
	r: /^r:\s*.*/,
	st: /^st(:\d)?:\s*.+$/,
	tb: /^tb:\s*.*/,
	l: /^l:\s*.*/,
	v: /^v:([\w\s]*):.*$/,
	button: /^button:([\w\s]*):.*$/,
	lords_prayer: /^lords_prayer:/,
	ol: /^ol:\d+:\s*.*/,
	ul: /^ul:\s*.*/,
	blank: /^blank:\s*$/,
	hd: /^hd:\d+-\d+\s*\/\/\s*.+$/,
	ref: /^ref:\s*.+$/,
	'ref+': /^ref\+:\s*.+$/,
	use: /^use:\w+:.+$/,
	scripture: /^scripture:[^:]+::.+$/,
	footnote: /^footnote:\s*.+$/,
	br: /^br:\s*$/
};

// Valid global arguments
const VALID_ARGS = ['b', 'o', 'i', 'title'];

class DPBLinter {
	constructor() {
		this.errors = [];
		this.warnings = [];
		this.currentFile = '';
		this.lineNumber = 0;
	}

	/**
	 * Lint a single file
	 */
	lintFile(filePath) {
		this.currentFile = filePath;
		this.errors = [];
		this.warnings = [];

		try {
			const content = fs.readFileSync(filePath, 'utf-8');
			const lines = content.split('\n');

			this.lintLines(lines);
		} catch (err) {
			this.addError(0, `Failed to read file: ${err.message}`);
		}

		return {
			file: filePath,
			errors: this.errors,
			warnings: this.warnings,
			success: this.errors.length === 0
		};
	}

	/**
	 * Lint all lines in a file
	 */
	lintLines(lines) {
		let expectingContinuation = false;
		let lastLineType = null;
		let hasPageRange = false;
		let lastPageBreak = null;

		for (let i = 0; i < lines.length; i++) {
			this.lineNumber = i + 1;
			const line = lines[i];
			const trimmedLine = line.trim();

			// Skip empty lines and comments
			if (trimmedLine === '' || line.startsWith('#')) {
				continue;
			}

			// Check for pg: at start
			if (i === 0 && !line.startsWith('pg:')) {
				this.addError(this.lineNumber, 'File must start with pg: directive');
			}

			if (line.startsWith('pg:')) {
				hasPageRange = true;
			}

			// Check if this line starts with whitespace (continuation line)
			const startsWithWhitespace = /^\s/.test(line);

			if (startsWithWhitespace) {
				// This is a continuation line
				if (!expectingContinuation) {
					this.addError(
						this.lineNumber,
						'Line starts with whitespace but previous line is not a multiline-capable directive (r:, tb:, l:, ol:, ul:)'
					);
				}
				this.lintLineContent(trimmedLine, lastLineType);
				continue;
			}

			// This line starts at column 0, so it must be a new directive
			if (expectingContinuation) {
				// Previous line could have continued, but this line is a new directive
				expectingContinuation = false;
			}

			// Parse line prefix
			const colonIndex = line.indexOf(':');

			// Handle lines without colons
			if (colonIndex === -1) {
				this.addError(
					this.lineNumber,
					'Line missing colon separator (not a valid directive). Should it be indented as a continuation?'
				);
				continue;
			}

			const prefix = line.substring(0, colonIndex);
			const rest = line.substring(colonIndex + 1);
			const restTrimmed = rest.trim();

			// Track what type of line this is for continuation validation
			lastLineType = prefix.split(':')[0]; // Get base prefix without args

			// Check if this directive type supports multiline continuation
			const multilineCapable = ['r', 'tb', 'l', 'ol', 'ul'];
			expectingContinuation = multilineCapable.includes(lastLineType);

			// Parse arguments (e.g., "l:i:b:" -> args: ['i', 'b'])
			const parts = prefix.split(':');
			const basePrefix = parts[0];
			const args = parts.slice(1).filter((a) => a !== '');

			// Check if prefix is valid
			if (!VALID_PREFIXES[basePrefix]) {
				this.addError(this.lineNumber, `Unknown prefix: '${basePrefix}'`);
				continue;
			}

			// Validate arguments
			for (const arg of args) {
				// For st, allow numbers (1, 2, 3)
				if (basePrefix === 'st' && arg.match(/^[123]$/)) {
					continue;
				}
				// For v, first arg is the speaker
				if (basePrefix === 'v' && args.indexOf(arg) === 0) {
					continue;
				}
				// For button, first arg is the link
				if (basePrefix === 'button' && args.indexOf(arg) === 0) {
					continue;
				}
				// For ol, first arg is the list number
				if (basePrefix === 'ol' && args.indexOf(arg) === 0 && arg.match(/^\d+$/)) {
					continue;
				}
				// Otherwise check if it's a valid global arg
				if (!VALID_ARGS.includes(arg)) {
					this.addWarning(this.lineNumber, `Unknown argument: '${arg}'`);
				}
			}

			// Validate content format
			const fullLine = basePrefix + ':' + args.join(':') + ':' + rest;
			this.lintLineType(basePrefix, fullLine, rest);

			// Track page breaks
			if (basePrefix === 'pb') {
				const pageNum = parseInt(rest.trim());
				if (lastPageBreak !== null && pageNum <= lastPageBreak) {
					this.addError(
						this.lineNumber,
						`Page break ${pageNum} is not greater than previous ${lastPageBreak}`
					);
				}
				lastPageBreak = pageNum;
			}
		}

		// Final checks
		if (!hasPageRange) {
			this.addError(1, 'Missing pg: directive at start of file');
		}
	}

	/**
	 * Lint specific line types
	 */
	lintLineType(prefix, fullLine, content) {
		// For validation, we need to construct the basic line format
		// Strip extra colons from arguments (e.g., "st:1:" -> "st:1")
		const basicLine = prefix + ':' + content.trim();
		const pattern = VALID_PREFIXES[prefix];

		// Check basic pattern match (skip for multi-line continuations)
		if (!pattern.test(basicLine) && content.trim() !== '') {
			// More lenient check - just ensure content exists for most types
			if (!['r', 'tb', 'l'].includes(prefix) || this.lineNumber === 1) {
				// Only strict validation for non-multiline types
			}
		}

		// Specific validations
		switch (prefix) {
			case 'pg':
				this.lintPageRange(content);
				break;
			case 'pb':
				this.lintPageBreak(content);
				break;
			case 'tp':
			case 'st':
			case 'r':
			case 'tb':
			case 'l':
			case 'ol':
			case 'ul':
				this.lintLineContent(content, prefix);
				break;
			case 'v':
				this.lintVersical(fullLine, content);
				break;
			case 'button':
				this.lintButton(fullLine, content);
				break;
		}
	}

	/**
	 * Lint page range
	 */
	lintPageRange(content) {
		const trimmed = content.trim();
		if (trimmed.includes('-')) {
			const [start, end] = trimmed.split('-').map((s) => parseInt(s.trim()));
			if (isNaN(start) || isNaN(end)) {
				this.addError(this.lineNumber, 'Invalid page range format');
			} else if (start >= end) {
				this.addError(
					this.lineNumber,
					`Page range start (${start}) must be less than end (${end})`
				);
			}
		} else if (isNaN(parseInt(trimmed))) {
			this.addError(this.lineNumber, 'Invalid page number');
		}
	}

	/**
	 * Lint page break
	 */
	lintPageBreak(content) {
		const pageNum = parseInt(content.trim());
		if (isNaN(pageNum)) {
			this.addError(this.lineNumber, 'Page break must have a valid page number');
		} else if (pageNum < 1) {
			this.addError(this.lineNumber, 'Page number must be positive');
		}
	}

	/**
	 * Lint line content for formatting issues
	 */
	lintLineContent(content, prefix) {
		const cleanContent = content.trim();

		// Check for mismatched markdown formatting
		this.checkMismatchedFormatting(cleanContent, '_', 'italic');
		this.checkMismatchedFormatting(cleanContent, '**', 'bold');
		this.checkMismatchedFormatting(cleanContent, '__', 'template');

		// Check for old __bold__ syntax (should be **bold** now)
		// But ignore ___n___ which is a blank line placeholder (three underscores)
		if (
			cleanContent.match(/__[^_\s]+__/) &&
			!cleanContent.match(/__[^_\s|]+\|/) &&
			!cleanContent.match(/___\d+___/)
		) {
			this.addWarning(
				this.lineNumber,
				'Found __text__ - should this be **text** (bold) or __opt1|opt2__ (template)?'
			);
		}

		// Check for unclosed quotes
		const quotes = (cleanContent.match(/"/g) || []).length;
		if (quotes % 2 !== 0) {
			this.addWarning(this.lineNumber, 'Unclosed quotation marks');
		}

		// Check for template syntax issues
		this.lintTemplateSyntax(cleanContent);

		// Check for blank line placeholders
		if (cleanContent.match(/___\d+___/)) {
			const match = cleanContent.match(/___(\d+)___/);
			const length = parseInt(match[1]);
			if (length > 50) {
				this.addWarning(this.lineNumber, `Blank line length (${length}) seems excessive`);
			}
		}
	}

	/**
	 * Check for mismatched formatting markers
	 */
	checkMismatchedFormatting(content, marker, name) {
		const count = (
			content.match(new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []
		).length;
		if (count % 2 !== 0) {
			this.addWarning(this.lineNumber, `Mismatched ${name} markers (${marker})`);
		}
	}

	/**
	 * Lint template syntax
	 */
	lintTemplateSyntax(content) {
		// Find all template patterns: __something__ (but not ___n___ blank line placeholders)
		// Use negative lookbehind/lookahead to avoid matching ___n___ as __n__
		const templates = content.match(/(?<!_)__([^_]+)__(?!_)/g);
		if (!templates) return;

		for (const template of templates) {
			const inner = template.slice(2, -2); // Remove __ from both sides

			// Check if it contains a pipe (template with options)
			if (inner.includes('|')) {
				const options = inner.split('|').map((o) => o.trim());

				// Check for empty options
				if (options.some((o) => o === '')) {
					this.addError(this.lineNumber, `Template has empty option: ${template}`);
				}

				// Check for common pronoun patterns (should have 2 or 3 options)
				const firstOpt = options[0].toLowerCase();
				const pronouns = [
					'he',
					'she',
					'him',
					'her',
					'his',
					'hers',
					'they',
					'them',
					'their',
					'theirs'
				];
				if (pronouns.includes(firstOpt) && options.length < 2) {
					this.addWarning(
						this.lineNumber,
						`Pronoun template should have at least 2 options: ${template}`
					);
				}

				// Check for number agreement (should have exactly 2 options)
				const singularPlural = ['is', 'are', 'has', 'have', 'this', 'these'];
				if (singularPlural.includes(firstOpt) && options.length !== 2) {
					this.addWarning(
						this.lineNumber,
						`Number agreement should have exactly 2 options: ${template}`
					);
				}
			} else {
				// Single value - should be a name placeholder
				const validNames = ['N.', 'N.N.', 'N. N.', 'N. and N.', 'N.N. and N.N.'];
				if (!validNames.includes(inner.trim())) {
					this.addWarning(
						this.lineNumber,
						`Unknown template pattern: ${template} (expected name placeholder or options with |)`
					);
				}
			}
		}
	}

	/**
	 * Lint versical
	 */
	lintVersical(fullLine, content) {
		// Extract speaker
		const match = fullLine.match(/^v:([\w\s]*):(.*)$/);
		if (!match) {
			this.addError(this.lineNumber, 'Invalid versical format');
			return;
		}

		const speaker = match[1].trim();
		const text = match[2].trim();

		// Check for common speaker values
		const commonSpeakers = [
			'',
			'people',
			'celebrant',
			'officiant',
			'priest',
			'deacon',
			'minister',
			'reader',
			'question',
			'answer',
			'candidate',
			'b'
		];
		if (speaker && !commonSpeakers.includes(speaker.toLowerCase())) {
			this.addWarning(this.lineNumber, `Unusual speaker: '${speaker}'`);
		}

		// Check if text is empty (only valid for 'b' - bold with no speaker)
		if (!text && speaker !== 'b') {
			this.addWarning(this.lineNumber, 'Versical has no text');
		}
	}

	/**
	 * Lint button
	 */
	lintButton(fullLine, content) {
		const match = fullLine.match(/^button:([\w\s]*):(.*)$/);
		if (!match) {
			this.addError(this.lineNumber, 'Invalid button format');
			return;
		}

		const link = match[1].trim();
		const text = match[2].trim();

		if (!text) {
			this.addError(this.lineNumber, 'Button has no text');
		}

		// Check if link is empty (placeholder button)
		if (!link) {
			this.addWarning(this.lineNumber, 'Button has no link (placeholder button)');
		}
	}

	/**
	 * Add an error
	 */
	addError(lineNumber, message) {
		this.errors.push({ line: lineNumber, message, type: 'error' });
	}

	/**
	 * Add a warning
	 */
	addWarning(lineNumber, message) {
		this.warnings.push({ line: lineNumber, message, type: 'warning' });
	}
}

/**
 * Main function
 */
function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error('Usage: node lint-dpb.cjs <file1.dpb> [file2.dpb ...]');
		console.error('   or: node lint-dpb.cjs src/lib/data/services/dpb/*.dpb');
		process.exit(1);
	}

	const linter = new DPBLinter();
	let totalErrors = 0;
	let totalWarnings = 0;
	let filesChecked = 0;

	for (const filePath of args) {
		if (!fs.existsSync(filePath)) {
			console.error(`File not found: ${filePath}`);
			continue;
		}

		if (!filePath.endsWith('.dpb')) {
			console.error(`Skipping non-DPB file: ${filePath}`);
			continue;
		}

		filesChecked++;
		const result = linter.lintFile(filePath);

		// Print results
		const fileName = path.basename(filePath);
		if (result.errors.length === 0 && result.warnings.length === 0) {
			console.log(`✓ ${fileName}`);
		} else {
			console.log(`\n${fileName}:`);

			for (const error of result.errors) {
				console.log(`  ❌ Line ${error.line}: ${error.message}`);
			}

			for (const warning of result.warnings) {
				console.log(`  ⚠️  Line ${warning.line}: ${warning.message}`);
			}
		}

		totalErrors += result.errors.length;
		totalWarnings += result.warnings.length;
	}

	// Summary
	console.log(`\n${'='.repeat(60)}`);
	console.log(`Checked ${filesChecked} file(s)`);
	console.log(`Errors: ${totalErrors}`);
	console.log(`Warnings: ${totalWarnings}`);

	if (totalErrors > 0) {
		process.exit(1);
	}
}

// Run if called directly
if (require.main === module) {
	main();
}

module.exports = { DPBLinter };
