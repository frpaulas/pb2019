#!/usr/bin/env node
/**
 * Convert World English Bible USFX XML to JSON database
 *
 * Usage: node scripts/convert-bible-xml.cjs
 *
 * Input: src/lib/web/eng-web_usfx.xml
 * Output: src/lib/db/bible.json
 *
 * Format:
 * {
 *   "books": {
 *     "GEN": { "name": "Genesis", "shortName": "Gen", "chapters": 50 },
 *     ...
 *   },
 *   "verses": {
 *     "GEN": {
 *       "1": {
 *         "1": "In the beginning, God created the heavens and the earth.",
 *         "2": "The earth was formless and empty...\n\n",  // paragraph end
 *         ...
 *       }
 *     }
 *   }
 * }
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../src/lib/web/eng-web_usfx.xml');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/db/bible.json');
const BOOK_NAMES_FILE = path.join(__dirname, '../src/lib/web/BookNames.xml');

// Books to include (canonical + deuterocanon)
const INCLUDE_BOOKS = new Set([
	// Old Testament
	'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT',
	'1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST',
	'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN',
	'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL',
	// Deuterocanon/Apocrypha
	'TOB', 'JDT', 'ESG', 'WIS', 'SIR', 'BAR', 'LJE', 'S3Y', 'SUS', 'BEL',
	'1MA', '2MA', '1ES', 'MAN', 'PS2', '3MA', '2ES', '4MA', 'DAG',
	// New Testament
	'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
	'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB',
	'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV'
]);

// Map of book codes to common abbreviations (for lectionary matching)
const BOOK_ABBREVS = {
	'GEN': 'Gen', 'EXO': 'Exod', 'LEV': 'Lev', 'NUM': 'Num', 'DEU': 'Deut',
	'JOS': 'Josh', 'JDG': 'Judg', 'RUT': 'Ruth',
	'1SA': '1 Sam', '2SA': '2 Sam', '1KI': '1 Kgs', '2KI': '2 Kgs',
	'1CH': '1 Chr', '2CH': '2 Chr', 'EZR': 'Ezra', 'NEH': 'Neh', 'EST': 'Esth',
	'JOB': 'Job', 'PSA': 'Ps', 'PRO': 'Prov', 'ECC': 'Eccl', 'SNG': 'Song',
	'ISA': 'Isa', 'JER': 'Jer', 'LAM': 'Lam', 'EZK': 'Ezek', 'DAN': 'Dan',
	'HOS': 'Hos', 'JOL': 'Joel', 'AMO': 'Amos', 'OBA': 'Obad', 'JON': 'Jonah',
	'MIC': 'Mic', 'NAM': 'Nah', 'HAB': 'Hab', 'ZEP': 'Zeph', 'HAG': 'Hag',
	'ZEC': 'Zech', 'MAL': 'Mal',
	// Deuterocanon
	'TOB': 'Tob', 'JDT': 'Jdt', 'ESG': 'EsthGr', 'WIS': 'Wis', 'SIR': 'Sir',
	'BAR': 'Bar', 'LJE': 'EpJer', 'S3Y': 'PrAzar', 'SUS': 'Sus', 'BEL': 'Bel',
	'1MA': '1 Macc', '2MA': '2 Macc', '1ES': '1 Esd', 'MAN': 'PrMan',
	'PS2': 'Ps151', '3MA': '3 Macc', '2ES': '2 Esd', '4MA': '4 Macc', 'DAG': 'DanGr',
	// New Testament
	'MAT': 'Matt', 'MRK': 'Mark', 'LUK': 'Luke', 'JHN': 'John', 'ACT': 'Acts',
	'ROM': 'Rom', '1CO': '1 Cor', '2CO': '2 Cor', 'GAL': 'Gal', 'EPH': 'Eph',
	'PHP': 'Phil', 'COL': 'Col', '1TH': '1 Thess', '2TH': '2 Thess',
	'1TI': '1 Tim', '2TI': '2 Tim', 'TIT': 'Titus', 'PHM': 'Phlm', 'HEB': 'Heb',
	'JAS': 'Jas', '1PE': '1 Pet', '2PE': '2 Pet', '1JN': '1 John', '2JN': '2 John',
	'3JN': '3 John', 'JUD': 'Jude', 'REV': 'Rev'
};

function parseBookNames(xml) {
	const books = {};
	const bookRegex = /<book code="([^"]+)"[^>]*short="([^"]*)"[^>]*long="([^"]*)"[^>]*\/>/g;
	let match;
	while ((match = bookRegex.exec(xml)) !== null) {
		const [, code, short, long] = match;
		if (INCLUDE_BOOKS.has(code)) {
			books[code] = {
				name: long || short,
				shortName: BOOK_ABBREVS[code] || short
			};
		}
	}
	return books;
}

function extractVerseText(content) {
	// Remove footnotes <f>...</f>
	let text = content.replace(/<f[^>]*>[\s\S]*?<\/f>/g, '');

	// Remove all XML tags but preserve text content
	// First, handle <w> tags - just keep the text between them
	text = text.replace(/<w[^>]*>([^<]*)<\/w>/g, '$1');

	// Remove verse end markers
	text = text.replace(/<ve\s*\/>/g, '');

	// Remove any remaining XML tags
	text = text.replace(/<[^>]+>/g, '');

	// Clean up whitespace
	text = text.replace(/\s+/g, ' ').trim();

	return text;
}

function parseUsfxXml(xml) {
	const result = {
		books: {},
		verses: {}
	};

	// Track current position
	let currentBook = null;
	let currentChapter = null;
	let inParagraph = false;
	let lastVerseInParagraph = null;

	// Split into processable chunks - find book, chapter, verse, and paragraph markers
	// Process character by character to track state

	// First, extract books
	const bookRegex = /<book id="([^"]+)">([\s\S]*?)(?=<book id="|<\/usfx>)/g;
	let bookMatch;

	while ((bookMatch = bookRegex.exec(xml)) !== null) {
		const bookCode = bookMatch[1];
		if (!INCLUDE_BOOKS.has(bookCode)) continue;

		currentBook = bookCode;
		const bookContent = bookMatch[2];

		// Extract book name from <h> tag
		const hMatch = bookContent.match(/<h>([^<]+)/);
		const bookName = hMatch ? hMatch[1].trim() : bookCode;

		result.books[bookCode] = {
			name: bookName,
			shortName: BOOK_ABBREVS[bookCode] || bookName,
			chapters: 0
		};
		result.verses[bookCode] = {};

		// Process chapters and verses
		// Find all chapter markers
		const chapterRegex = /<c id="(\d+)"\s*\/>/g;
		let chapterMatch;
		let chapterPositions = [];

		while ((chapterMatch = chapterRegex.exec(bookContent)) !== null) {
			chapterPositions.push({
				chapter: chapterMatch[1],
				start: chapterMatch.index + chapterMatch[0].length
			});
		}

		// Add end position
		chapterPositions.push({ chapter: null, start: bookContent.length });

		// Process each chapter
		for (let i = 0; i < chapterPositions.length - 1; i++) {
			const chapterNum = chapterPositions[i].chapter;
			const chapterStart = chapterPositions[i].start;
			const chapterEnd = chapterPositions[i + 1].start;
			const chapterContent = bookContent.substring(chapterStart, chapterEnd);

			result.verses[bookCode][chapterNum] = {};
			result.books[bookCode].chapters = Math.max(
				result.books[bookCode].chapters,
				parseInt(chapterNum)
			);

			// Find all verses in this chapter
			// Pattern: <v id="X" bcv="..." /> followed by content until next <v or end
			const verseRegex = /<v id="(\d+)"[^>]*\/>/g;
			let verseMatch;
			let versePositions = [];

			while ((verseMatch = verseRegex.exec(chapterContent)) !== null) {
				versePositions.push({
					verse: verseMatch[1],
					start: verseMatch.index + verseMatch[0].length
				});
			}

			// Add end position
			versePositions.push({ verse: null, start: chapterContent.length });

			// Extract verse text
			for (let j = 0; j < versePositions.length - 1; j++) {
				const verseNum = versePositions[j].verse;
				const verseStart = versePositions[j].start;
				const verseEnd = versePositions[j + 1].start;
				let verseContent = chapterContent.substring(verseStart, verseEnd);

				// Check if this verse ends a paragraph
				// Look for </p> before the next verse or end
				const endsParagraph = /<\/p>/.test(verseContent);

				// Extract clean text
				let text = extractVerseText(verseContent);

				// Add paragraph marker if needed
				if (endsParagraph && text) {
					text = text + '\n\n';
				}

				if (text) {
					result.verses[bookCode][chapterNum][verseNum] = text;
				}
			}
		}

		console.log(`Processed ${bookCode}: ${result.books[bookCode].chapters} chapters`);
	}

	return result;
}

function main() {
	console.log('Reading XML file...');
	const xml = fs.readFileSync(INPUT_FILE, 'utf-8');

	console.log('Parsing book names...');
	const bookNamesXml = fs.readFileSync(BOOK_NAMES_FILE, 'utf-8');
	const bookNames = parseBookNames(bookNamesXml);

	console.log('Parsing USFX XML...');
	const result = parseUsfxXml(xml);

	// Merge book names
	for (const code of Object.keys(result.books)) {
		if (bookNames[code]) {
			result.books[code].name = bookNames[code].name;
		}
	}

	// Calculate stats
	let totalVerses = 0;
	let totalChapters = 0;
	for (const book of Object.keys(result.verses)) {
		const chapters = Object.keys(result.verses[book]);
		totalChapters += chapters.length;
		for (const chapter of chapters) {
			totalVerses += Object.keys(result.verses[book][chapter]).length;
		}
	}

	console.log(`\nTotal: ${Object.keys(result.books).length} books, ${totalChapters} chapters, ${totalVerses} verses`);

	console.log('\nWriting JSON file...');
	const json = JSON.stringify(result, null, '\t');
	fs.writeFileSync(OUTPUT_FILE, json);

	const stats = fs.statSync(OUTPUT_FILE);
	console.log(`Output: ${OUTPUT_FILE} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

main();
