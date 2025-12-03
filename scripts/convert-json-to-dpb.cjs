#!/usr/bin/env node
/**
 * Converter for JSON service files to DPB source format
 * Usage: node scripts/convert-json-to-dpb.cjs <input-file> [output-file]
 */

const fs = require('fs');
const path = require('path');

class JsonToDpbConverter {
	constructor() {
		this.output = [];
	}

	/**
	 * Converts content array (with page_link objects) back to plain text
	 */
	contentArrayToText(contentArray) {
		if (!Array.isArray(contentArray)) {
			return '';
		}

		return contentArray
			.map((item) => {
				if (item.type === 'text') {
					return item.value || '';
				} else if (item.type === 'page_link') {
					// Convert page link back to "on page n" or "on pages n-m"
					const pageText = item.text || String(item.page);
					const isRange = pageText.includes('-');
					return `on page${isRange ? 's' : ''} ${pageText}`;
				}
				return '';
			})
			.join('');
	}

	/**
	 * Builds modifier string from item properties
	 */
	buildModifiers(item) {
		const mods = [];
		if (item.bold) mods.push('b');
		if (item.optional) mods.push('o');
		if (item.indent) mods.push('i');
		if (item.lowercase) mods.push('lc');
		return mods.length > 0 ? ':' + mods.join(':') : '';
	}

	/**
	 * Extract psalm number from section title or content
	 * Looks backwards from the current index to find a section_title with psalm number
	 */
	getPsalmNumber(section, currentIndex) {
		const content = section.content || [];

		// Look backwards from current position for section_title with psalm number
		for (let i = currentIndex - 1; i >= 0; i--) {
			const item = content[i];
			if (item.type === 'section_title' && item.text) {
				// Match patterns like "psalm 119:105-112" or "psalm 121"
				const match = item.text.match(/psalm\s+(\d+)/i);
				if (match) {
					return match[1];
				}
			}
		}

		return null;
	}

	/**
	 * Convert a single content item to DPB format
	 * Returns a string or array of strings for composite components
	 */
	convertItem(item) {
		if (!item || !item.type) {
			return null;
		}

		const modifiers = this.buildModifiers(item);

		switch (item.type) {
			case 'section_title': {
				// Convert Tailwind sizes (2xl, 3xl, 4xl) to numbers (2, 3, 4)
				let size = '';
				if (item.size) {
					const match = item.size.match(/^(\d+)x?l?$/);
					size = match ? `:${match[1]}` : `:${item.size}`;
				}
				return `st${size}${modifiers}: ${item.text || ''}`;
			}

			case 'text_block': {
				const text = item.content ? this.contentArrayToText(item.content) : item.text || '';
				return `tb${modifiers}: ${text}`;
			}

			case 'rubric': {
				const text = item.content ? this.contentArrayToText(item.content) : item.text || '';
				return `r${modifiers}: ${text}`;
			}

			case 'ref': {
				if (item.add_on) {
					return `ref+${modifiers}:${item.text || ''}:${item.add_on}`;
				}
				return `ref${modifiers}: ${item.text || ''}`;
			}

			case 'versical': {
				// Check for speaker as boolean property (celebrant, people, officiant, etc.)
				const speakers = [
					'celebrant',
					'people',
					'officiant',
					'deacon',
					'reader',
					'bishop',
					'candidate',
					'presenters'
				];
				let who = item.who || ''; // Support old 'who' format

				// Check boolean properties for speaker
				for (const speaker of speakers) {
					if (item[speaker] === true) {
						who = speaker;
						break;
					}
				}

				const text = item.text || '';

				// Handle v:b: (bold with no speaker)
				if (!who && item.bold && !text) {
					return 'v:b:';
				}

				// Handle v:: (no speaker)
				if (!who) {
					return `v${modifiers}:: ${text}`;
				}

				// Handle v:speaker:text
				return `v${modifiers}:${who}: ${text}`;
			}

			case 'line': {
				return `l${modifiers}: ${item.text || ''}`;
			}

			case 'button': {
				const link = item.link || '';
				return `button:${link}: ${item.text || ''}`;
			}

			case 'page_break': {
				return `pb: ${item.page || ''}`;
			}

			case 'scripture': {
				const ref = item.ref || '';
				const text = item.text || '';
				return `scripture:${ref}:: ${text}`;
			}

			case 'or_this': {
				return 'r: or this';
			}

			case 'psalm': {
				const ref = item.ref || '';
				return `psalm:${ref}:`;
			}

			case 'show_psalm': {
				const ps = item.ps;
				const from = item.from || 1;
				const to = item.to || 999;
				const bold = item.bold ? ':b' : '';
				return `use:psalm:${ps}:${from}:${to}${bold}:`;
			}

			case 'show_psalm_verses': {
				const ps = item.ps || '';
				const verses = item.verses || [];
				// For specific verses, we'd need a different format
				// For now, fall back to showing the whole psalm
				return `use:psalm:${ps}:1:999:`;
			}

			case 'antiphon': {
				return `antiphon: ${item.text || ''}`;
			}

			case 'apostles_creed': {
				return 'use:apostles_creed:';
			}

			case 'gloria': {
				return 'use:gloria:';
			}

			case 'kyrie': {
				return 'use:kyrie:';
			}

			case 'lord_be_with_you': {
				return [
					'v:officiant: The Lord be with you.',
					'v:people: And with your spirit.',
					'v:officiant: Let us pray.'
				];
			}

			case 'word_of_the_lord': {
				return ['v:: The Word of the Lord.', 'v:people: Thanks be to God.'];
			}

			case 'let_us_bless': {
				return ['v:officiant: Let us bless the Lord.', 'v:people: Thanks be to God.'];
			}

			case 'grace_of_our_lord': {
				return [
					'tb: The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit, be with us all evermore.',
					'v:: Amen.'
				];
			}

			case 'chrysostom': {
				return 'use:canticle:chrysostom:';
			}

			case 'canticle': {
				const name = item.name || '';
				return `use:canticle:${name}:`;
			}

			case 'lords_prayer': {
				return 'use:lords_prayer:';
			}

			case 'incline_our_hearts': {
				return [
					'v:people: Lord, have mercy upon us,',
					'v:: and incline our hearts to keep this law.'
				];
			}

			case 'guide_us': {
				return [
					'tb:b: Guide us waking, O Lord, and guard us sleeping; that awake we may watch with Christ, and asleep we may rest in peace.',
					'r: In Easter Season, add',
					'l: Alleluia, alleluia, alleluia.'
				];
			}

			case 'we_entreat_you': {
				return 'l:b:i: We entreat you, O Lord.';
			}

			case 'kneel_or_stand': {
				return 'r: The People kneel or stand.';
			}

			case 'keep_the_feast': {
				return 'v:people: Therefore let us keep the feast. [Alleluia.]';
			}

			case 'the_peace': {
				return [
					'st: the peace',
					'r: In Easter Season, add',
					'l: Alleluia, alleluia, alleluia.',
					'v:celebrant: The Peace of the Lord be always with you.',
					'v:people: And with your spirit.',
					'r: Then the Ministers and People may greet one another in the Name of the Lord.'
				];
			}

			case 'trisagion': {
				return [
					'l: Holy God,',
					'l: Holy and Mighty,',
					'l: Holy Immortal One,',
					'l:b: Have mercy upon us.'
				];
			}

			case 'silence': {
				return 'r: Silence';
			}

			case 'then_follows': {
				return 'r: Then follows';
			}

			case 'intentionally_blank': {
				return 'intentionally_blank:';
			}

			case 'signature_block': {
				return `signature_block: ${item.text || ''}`;
			}

			case 'section_page': {
				return `section_page: ${item.text || ''}`;
			}

			case 'footnote': {
				return `footnote: ${item.text || ''}`;
			}

			default:
				console.warn(`⚠️  Unknown type: ${item.type}`);
				return `# UNKNOWN TYPE: ${item.type}`;
		}
	}

	/**
	 * Convert JSON service file to DPB format
	 */
	convert(inputPath) {
		this.output = [];

		const content = fs.readFileSync(inputPath, 'utf-8');
		const json = JSON.parse(content);

		// Get the root key (e.g., "morning_prayer", "holy_baptism")
		const rootKey = Object.keys(json)[0];
		const service = json[rootKey];

		if (!service) {
			throw new Error('Invalid JSON structure: missing root service object');
		}

		// Extract metadata
		const title = service.title || 'Untitled Service';
		const pb_pages = service.pb_pages || [];
		const sections = service.sections || [];

		// Write page range
		if (pb_pages.length === 1) {
			this.output.push(`pg: ${pb_pages[0]}`);
		} else if (pb_pages.length >= 2) {
			// Use first and last page for range
			const firstPage = pb_pages[0];
			const lastPage = pb_pages[pb_pages.length - 1];
			this.output.push(`pg: ${firstPage}-${lastPage}`);
		}

		// Write title
		this.output.push(`tp: ${title}`);
		this.output.push(''); // Blank line after metadata

		// Convert each section
		for (const section of sections) {
			const content = section.content || [];

			// Group consecutive psalm verses
			let i = 0;
			while (i < content.length) {
				const item = content[i];

				// Check if this is a psalm verse
				if (item.type === 'psalm' && item.vs) {
					// Collect consecutive psalm verses
					const psalmVerses = [item];
					let j = i + 1;

					while (j < content.length && content[j].type === 'psalm' && content[j].vs) {
						psalmVerses.push(content[j]);
						j++;
					}

					// Determine psalm number and range from the section title or verse numbers
					const psalmNumber = this.getPsalmNumber(section, i);
					const startVerse = parseInt(psalmVerses[0].vs);
					const endVerse = parseInt(psalmVerses[psalmVerses.length - 1].vs);

					// Output use:psalm: format
					if (psalmNumber) {
						this.output.push(`use:psalm:${psalmNumber}:${startVerse}:${endVerse}:`);
					} else {
						// Fallback if we can't determine psalm number
						console.warn('Could not determine psalm number, outputting individual verses');
						for (const pv of psalmVerses) {
							this.output.push(`psalm:${pv.vs}:${pv.ln1}:${pv.ln2}:`);
						}
					}

					i = j;
				} else {
					// Not a psalm verse, convert normally
					const result = this.convertItem(item);
					if (result !== null) {
						// Handle arrays (composite components) or single strings
						if (Array.isArray(result)) {
							this.output.push(...result);
						} else {
							this.output.push(result);
						}
					}
					i++;
				}
			}

			// Add blank line between sections
			this.output.push('');
		}

		return this.output.join('\n');
	}
}

function convertFile(inputPath, outputPath) {
	console.log(`\n📄 Converting: ${inputPath}`);

	if (!fs.existsSync(inputPath)) {
		console.error(`❌ File not found: ${inputPath}`);
		process.exit(1);
	}

	const converter = new JsonToDpbConverter();
	const result = converter.convert(inputPath);

	// Determine output path
	let output = outputPath;
	if (!output) {
		const inputDir = path.dirname(inputPath);
		const inputName = path.basename(inputPath, '.json');
		output = path.join(inputDir, 'dpb', `${inputName}.dpb`);
	}

	// Ensure output directory exists
	const outputDir = path.dirname(output);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Write DPB file
	fs.writeFileSync(output, result);
	console.log(`✅ Converted to: ${output}`);

	return output;
}

/**
 * Find JSON files that don't have corresponding DPB files
 */
function findFilesWithoutDpb(servicesDir) {
	const jsonFiles = fs.readdirSync(servicesDir).filter((f) => f.endsWith('.json'));
	const dpbDir = path.join(servicesDir, 'dpb');

	if (!fs.existsSync(dpbDir)) {
		fs.mkdirSync(dpbDir, { recursive: true });
	}

	const dpbFiles = fs.existsSync(dpbDir)
		? fs.readdirSync(dpbDir).filter((f) => f.endsWith('.dpb'))
		: [];

	const dpbBasenames = new Set(dpbFiles.map((f) => path.basename(f, '.dpb')));

	const missingDpb = jsonFiles.filter((jsonFile) => {
		const basename = path.basename(jsonFile, '.json');
		return !dpbBasenames.has(basename);
	});

	return missingDpb;
}

// Main execution
if (require.main === module) {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log('Usage: node convert-json-to-dpb.cjs <input-file> [output-file]');
		console.log('   or: node convert-json-to-dpb.cjs <services-directory>');
		console.log('   or: node convert-json-to-dpb.cjs --missing <services-directory>');
		console.log('\nExamples:');
		console.log('  node convert-json-to-dpb.cjs src/lib/data/services/morning_prayer.json');
		console.log('  node convert-json-to-dpb.cjs src/lib/data/services/');
		console.log('  node convert-json-to-dpb.cjs --missing src/lib/data/services/');
		process.exit(1);
	}

	const target = args[0];

	// Handle --missing flag
	if (target === '--missing') {
		if (args.length < 2) {
			console.error('❌ Please specify services directory after --missing flag');
			process.exit(1);
		}

		const servicesDir = args[1];
		const missingFiles = findFilesWithoutDpb(servicesDir);

		if (missingFiles.length === 0) {
			console.log('\n✅ All JSON files have corresponding DPB files!');
			process.exit(0);
		}

		console.log(`\n🔄 Converting ${missingFiles.length} JSON files without DPB equivalents...\n`);

		for (const file of missingFiles) {
			const inputPath = path.join(servicesDir, file);
			convertFile(inputPath);
		}

		console.log('\n✅ All missing files converted successfully!');
		process.exit(0);
	}

	// Handle single file or directory
	const stats = fs.statSync(target);

	if (stats.isDirectory()) {
		// Convert all .json files in directory
		const files = fs.readdirSync(target).filter((f) => f.endsWith('.json'));
		console.log(`\n🔄 Converting ${files.length} JSON files in ${target}...\n`);

		for (const file of files) {
			const inputPath = path.join(target, file);
			convertFile(inputPath);
		}

		console.log('\n✅ All files converted successfully!');
	} else {
		// Convert single file
		const outputPath = args[1];
		convertFile(target, outputPath);
	}
}

module.exports = { JsonToDpbConverter, convertFile, findFilesWithoutDpb };
