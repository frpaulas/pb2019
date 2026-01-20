/**
 * Bible database interface and getter functions
 *
 * Reference format examples:
 *   "John 1"           - whole chapter
 *   "John 1:14"        - single verse
 *   "John 1:1-28"      - verse range
 *   "John 1:29-end"    - to end of chapter (end = 999)
 *   "Matt 5:1-12,6:9-13" - multiple ranges (each segment is chapter:verse)
 *   "Philemon 4-7"     - chapterless book (assumes chapter 1)
 *   "Philemon"         - whole chapterless book
 */

import bibleData from './bible.json';

export interface BibleBook {
	name: string;
	shortName: string;
	chapters: number;
}

export interface BibleVerse {
	book: string;
	bookCode: string;
	chapter: number;
	verse: number;
	text: string;
}

export interface BiblePassage {
	reference: string;
	bookName: string;
	verses: BibleVerse[];
	text: string; // Combined text with paragraph breaks preserved
}

interface BibleDatabase {
	books: Record<string, BibleBook>;
	verses: Record<string, Record<string, Record<string, string>>>;
}

const db: BibleDatabase = bibleData as BibleDatabase;

// Chapterless books - always assume chapter 1
const CHAPTERLESS_BOOKS = new Set(['OBA', 'PHM', '2JN', '3JN', 'JUD']);

// Map common book names/abbreviations to book codes
const BOOK_NAME_MAP: Record<string, string> = {
	// Old Testament
	genesis: 'GEN',
	gen: 'GEN',
	gn: 'GEN',
	exodus: 'EXO',
	exod: 'EXO',
	ex: 'EXO',
	leviticus: 'LEV',
	lev: 'LEV',
	lv: 'LEV',
	numbers: 'NUM',
	num: 'NUM',
	nm: 'NUM',
	deuteronomy: 'DEU',
	deut: 'DEU',
	dt: 'DEU',
	joshua: 'JOS',
	josh: 'JOS',
	jos: 'JOS',
	judges: 'JDG',
	judg: 'JDG',
	jdg: 'JDG',
	jgs: 'JDG',
	ruth: 'RUT',
	ru: 'RUT',
	'1 samuel': '1SA',
	'1 sam': '1SA',
	'1samuel': '1SA',
	'1sam': '1SA',
	'1sa': '1SA',
	'2 samuel': '2SA',
	'2 sam': '2SA',
	'2samuel': '2SA',
	'2sam': '2SA',
	'2sa': '2SA',
	'1 kings': '1KI',
	'1 kgs': '1KI',
	'1kings': '1KI',
	'1kgs': '1KI',
	'1ki': '1KI',
	'2 kings': '2KI',
	'2 kgs': '2KI',
	'2kings': '2KI',
	'2kgs': '2KI',
	'2ki': '2KI',
	'1 chronicles': '1CH',
	'1 chr': '1CH',
	'1chronicles': '1CH',
	'1chr': '1CH',
	'1ch': '1CH',
	'2 chronicles': '2CH',
	'2 chr': '2CH',
	'2chronicles': '2CH',
	'2chr': '2CH',
	'2ch': '2CH',
	ezra: 'EZR',
	ezr: 'EZR',
	nehemiah: 'NEH',
	neh: 'NEH',
	ne: 'NEH',
	esther: 'EST',
	esth: 'EST',
	est: 'EST',
	es: 'EST',
	job: 'JOB',
	jb: 'JOB',
	psalms: 'PSA',
	psalm: 'PSA',
	ps: 'PSA',
	pss: 'PSA',
	proverbs: 'PRO',
	prov: 'PRO',
	pr: 'PRO',
	prv: 'PRO',
	ecclesiastes: 'ECC',
	eccl: 'ECC',
	ecc: 'ECC',
	ec: 'ECC',
	qoh: 'ECC',
	'song of solomon': 'SNG',
	'song of songs': 'SNG',
	song: 'SNG',
	sng: 'SNG',
	sos: 'SNG',
	sg: 'SNG',
	isaiah: 'ISA',
	isa: 'ISA',
	is: 'ISA',
	jeremiah: 'JER',
	jer: 'JER',
	je: 'JER',
	lamentations: 'LAM',
	lam: 'LAM',
	la: 'LAM',
	ezekiel: 'EZK',
	ezek: 'EZK',
	ezk: 'EZK',
	ez: 'EZK',
	daniel: 'DAN',
	dan: 'DAN',
	dn: 'DAN',
	hosea: 'HOS',
	hos: 'HOS',
	ho: 'HOS',
	joel: 'JOL',
	jol: 'JOL',
	jl: 'JOL',
	amos: 'AMO',
	am: 'AMO',
	obadiah: 'OBA',
	obad: 'OBA',
	ob: 'OBA',
	jonah: 'JON',
	jon: 'JON',
	jnh: 'JON',
	micah: 'MIC',
	mic: 'MIC',
	mi: 'MIC',
	nahum: 'NAM',
	nah: 'NAM',
	na: 'NAM',
	habakkuk: 'HAB',
	hab: 'HAB',
	hb: 'HAB',
	zephaniah: 'ZEP',
	zeph: 'ZEP',
	zep: 'ZEP',
	zp: 'ZEP',
	haggai: 'HAG',
	hag: 'HAG',
	hg: 'HAG',
	zechariah: 'ZEC',
	zech: 'ZEC',
	zec: 'ZEC',
	zc: 'ZEC',
	malachi: 'MAL',
	mal: 'MAL',
	ml: 'MAL',

	// Deuterocanon/Apocrypha
	tobit: 'TOB',
	tob: 'TOB',
	tb: 'TOB',
	judith: 'JDT',
	jdt: 'JDT',
	jdth: 'JDT',
	'esther (greek)': 'ESG',
	'greek esther': 'ESG',
	esg: 'ESG',
	gkesth: 'ESG',
	wisdom: 'WIS',
	'wisdom of solomon': 'WIS',
	wis: 'WIS',
	ws: 'WIS',
	sirach: 'SIR',
	ecclesiasticus: 'SIR',
	sir: 'SIR',
	ecclus: 'SIR',
	baruch: 'BAR',
	bar: 'BAR',
	'letter of jeremiah': 'LJE',
	'epistle of jeremiah': 'LJE',
	lje: 'LJE',
	epjer: 'LJE',
	'song of three': 'S3Y',
	'prayer of azariah': 'S3Y',
	s3y: 'S3Y',
	prazr: 'S3Y',
	susanna: 'SUS',
	sus: 'SUS',
	'bel and the dragon': 'BEL',
	bel: 'BEL',
	'1 maccabees': '1MA',
	'1 macc': '1MA',
	'1maccabees': '1MA',
	'1macc': '1MA',
	'1ma': '1MA',
	'2 maccabees': '2MA',
	'2 macc': '2MA',
	'2maccabees': '2MA',
	'2macc': '2MA',
	'2ma': '2MA',
	'1 esdras': '1ES',
	'1esdras': '1ES',
	'1es': '1ES',
	'1esd': '1ES',
	'prayer of manasseh': 'MAN',
	'prayer of manasses': 'MAN',
	man: 'MAN',
	prman: 'MAN',
	'psalm 151': 'PS2',
	ps151: 'PS2',
	ps2: 'PS2',
	'3 maccabees': '3MA',
	'3 macc': '3MA',
	'3maccabees': '3MA',
	'3macc': '3MA',
	'3ma': '3MA',
	'2 esdras': '2ES',
	'2esdras': '2ES',
	'2es': '2ES',
	'2esd': '2ES',
	'4 maccabees': '4MA',
	'4 macc': '4MA',
	'4maccabees': '4MA',
	'4macc': '4MA',
	'4ma': '4MA',
	'daniel (greek)': 'DAG',
	'greek daniel': 'DAG',
	dag: 'DAG',
	gkdan: 'DAG',

	// New Testament
	matthew: 'MAT',
	matt: 'MAT',
	mat: 'MAT',
	mt: 'MAT',
	mark: 'MRK',
	mrk: 'MRK',
	mk: 'MRK',
	luke: 'LUK',
	luk: 'LUK',
	lk: 'LUK',
	john: 'JHN',
	jhn: 'JHN',
	jn: 'JHN',
	acts: 'ACT',
	act: 'ACT',
	ac: 'ACT',
	romans: 'ROM',
	rom: 'ROM',
	ro: 'ROM',
	'1 corinthians': '1CO',
	'1 cor': '1CO',
	'1corinthians': '1CO',
	'1cor': '1CO',
	'1co': '1CO',
	'2 corinthians': '2CO',
	'2 cor': '2CO',
	'2corinthians': '2CO',
	'2cor': '2CO',
	'2co': '2CO',
	galatians: 'GAL',
	gal: 'GAL',
	ga: 'GAL',
	ephesians: 'EPH',
	eph: 'EPH',
	ep: 'EPH',
	philippians: 'PHP',
	phil: 'PHP',
	php: 'PHP',
	pp: 'PHP',
	colossians: 'COL',
	col: 'COL',
	co: 'COL',
	'1 thessalonians': '1TH',
	'1 thess': '1TH',
	'1thessalonians': '1TH',
	'1thess': '1TH',
	'1th': '1TH',
	'2 thessalonians': '2TH',
	'2 thess': '2TH',
	'2thessalonians': '2TH',
	'2thess': '2TH',
	'2th': '2TH',
	'1 timothy': '1TI',
	'1 tim': '1TI',
	'1timothy': '1TI',
	'1tim': '1TI',
	'1ti': '1TI',
	'2 timothy': '2TI',
	'2 tim': '2TI',
	'2timothy': '2TI',
	'2tim': '2TI',
	'2ti': '2TI',
	titus: 'TIT',
	tit: 'TIT',
	ti: 'TIT',
	philemon: 'PHM',
	phlm: 'PHM',
	phm: 'PHM',
	philem: 'PHM',
	hebrews: 'HEB',
	heb: 'HEB',
	he: 'HEB',
	james: 'JAS',
	jas: 'JAS',
	jm: 'JAS',
	'1 peter': '1PE',
	'1 pet': '1PE',
	'1peter': '1PE',
	'1pet': '1PE',
	'1pe': '1PE',
	'1pt': '1PE',
	'2 peter': '2PE',
	'2 pet': '2PE',
	'2peter': '2PE',
	'2pet': '2PE',
	'2pe': '2PE',
	'2pt': '2PE',
	'1 john': '1JN',
	'1john': '1JN',
	'1jn': '1JN',
	'1jhn': '1JN',
	'2 john': '2JN',
	'2john': '2JN',
	'2jn': '2JN',
	'2jhn': '2JN',
	'3 john': '3JN',
	'3john': '3JN',
	'3jn': '3JN',
	'3jhn': '3JN',
	jude: 'JUD',
	jud: 'JUD',
	jd: 'JUD',
	revelation: 'REV',
	rev: 'REV',
	re: 'REV',
	apocalypse: 'REV'
};

/**
 * Resolve a book name to its code
 */
function resolveBookCode(name: string): string | null {
	const normalized = name.toLowerCase().trim();
	return BOOK_NAME_MAP[normalized] || null;
}

/**
 * Parse a verse reference segment like "1:1-28" or "1:29-end" or "1" (whole chapter)
 * Returns { chapter, startVerse, endVerse }
 */
function parseVerseSegment(
	segment: string,
	bookCode: string,
	defaultChapter?: number
): { chapter: number; startVerse: number; endVerse: number } | null {
	segment = segment.trim();

	// Helper to parse verse number, handling "end" and letter suffixes (e.g., "24a")
	const parseVerseNum = (v: string): number => {
		v = v.trim().toLowerCase();
		if (v === 'end') return 999;
		// Strip letter suffixes (e.g., "24a" -> "24")
		return parseInt(v.replace(/[a-z]+$/i, ''), 10);
	};

	// Check for chapter:verse format
	if (segment.includes(':')) {
		const [chapterPart, versePart] = segment.split(':');
		const chapter = parseInt(chapterPart, 10);

		if (isNaN(chapter)) return null;

		// Handle verse range
		if (versePart.includes('-')) {
			const [start, end] = versePart.split('-');
			const startVerse = parseVerseNum(start);
			const endVerse = parseVerseNum(end);

			if (isNaN(startVerse) || isNaN(endVerse)) return null;

			return { chapter, startVerse, endVerse };
		}

		// Single verse
		const verse = parseVerseNum(versePart);
		if (isNaN(verse)) return null;

		return { chapter, startVerse: verse, endVerse: verse };
	}

	// No colon - could be whole chapter or verse range for chapterless book
	if (segment.includes('-')) {
		// Verse range without chapter (for chapterless books)
		const [start, end] = segment.split('-');
		const startVerse = parseVerseNum(start);
		const endVerse = parseVerseNum(end);
		const chapter = defaultChapter || 1;

		if (isNaN(startVerse) || isNaN(endVerse)) return null;

		return { chapter, startVerse, endVerse };
	}

	// Just a number - whole chapter or single verse for chapterless book
	const num = parseInt(segment, 10);
	if (isNaN(num)) {
		// No number at all - whole book (for chapterless books)
		if (defaultChapter && CHAPTERLESS_BOOKS.has(bookCode)) {
			return { chapter: 1, startVerse: 1, endVerse: 999 };
		}
		return null;
	}

	// For chapterless books, this is a single verse
	if (CHAPTERLESS_BOOKS.has(bookCode)) {
		return { chapter: 1, startVerse: num, endVerse: num };
	}

	// Otherwise it's a whole chapter
	return { chapter: num, startVerse: 1, endVerse: 999 };
}

/**
 * Parse a full reference string like "John 1:29-end" or "Matt 5:1-12,6:9-13"
 */
export function parseReference(reference: string): {
	bookCode: string;
	bookName: string;
	segments: Array<{ chapter: number; startVerse: number; endVerse: number }>;
} | null {
	reference = reference.trim();

	// Extract book name - everything up to first digit or end of string
	const bookMatch = reference.match(/^([a-z0-9\s]+?)(?:\s+(\d.*))?$/i);
	if (!bookMatch) return null;

	let bookName = bookMatch[1].trim();
	const rest = bookMatch[2] || '';

	// Handle numbered books like "1 John" - the regex might split wrong
	// Try to match numbered book patterns
	const numberedBookMatch = reference.match(/^(\d\s*[a-z]+)\s*(.*)/i);
	if (numberedBookMatch) {
		bookName = numberedBookMatch[1].trim();
	}

	const bookCode = resolveBookCode(bookName);
	if (!bookCode) return null;

	const book = db.books[bookCode];
	if (!book) return null;

	// If no verse specification, return whole book (for chapterless) or error
	if (!rest && !numberedBookMatch?.[2]) {
		if (CHAPTERLESS_BOOKS.has(bookCode)) {
			return {
				bookCode,
				bookName: book.name,
				segments: [{ chapter: 1, startVerse: 1, endVerse: 999 }]
			};
		}
		// For books with chapters, a bare book name isn't valid for our purposes
		return null;
	}

	// Get the part after book name
	const verseSpec = numberedBookMatch ? numberedBookMatch[2].trim() : rest.trim();

	// Split by comma to get segments
	const segmentStrs = verseSpec.split(',').map((s) => s.trim());
	const segments: Array<{ chapter: number; startVerse: number; endVerse: number }> = [];

	for (const segStr of segmentStrs) {
		const seg = parseVerseSegment(segStr, bookCode, 1);
		if (seg) {
			segments.push(seg);
		}
	}

	if (segments.length === 0) return null;

	return { bookCode, bookName: book.name, segments };
}

/**
 * Get verses for a single segment
 */
function getSegmentVerses(
	bookCode: string,
	chapter: number,
	startVerse: number,
	endVerse: number
): BibleVerse[] {
	const bookData = db.verses[bookCode];
	if (!bookData) return [];

	const chapterData = bookData[chapter.toString()];
	if (!chapterData) return [];

	const book = db.books[bookCode];
	const verses: BibleVerse[] = [];

	// Get all verse numbers and sort numerically
	const verseNums = Object.keys(chapterData)
		.map((v) => parseInt(v, 10))
		.sort((a, b) => a - b);

	for (const verseNum of verseNums) {
		if (verseNum >= startVerse && verseNum <= endVerse) {
			verses.push({
				book: book.name,
				bookCode,
				chapter,
				verse: verseNum,
				text: chapterData[verseNum.toString()]
			});
		}
	}

	return verses;
}

/**
 * Get a Bible passage by reference
 *
 * @param reference - The passage reference (e.g., "John 1:1-14", "Gen 1", "Philemon 4-7")
 * @returns BiblePassage object with verses and combined text, or null if not found
 */
export function getPassage(reference: string): BiblePassage | null {
	const parsed = parseReference(reference);
	if (!parsed) return null;

	const allVerses: BibleVerse[] = [];

	for (const segment of parsed.segments) {
		const verses = getSegmentVerses(
			parsed.bookCode,
			segment.chapter,
			segment.startVerse,
			segment.endVerse
		);
		allVerses.push(...verses);
	}

	if (allVerses.length === 0) return null;

	// Combine text, preserving paragraph breaks
	const text = allVerses
		.map((v) => v.text)
		.join(' ')
		.trim();

	return {
		reference,
		bookName: parsed.bookName,
		verses: allVerses,
		text
	};
}

/**
 * Get a single verse
 *
 * @param bookRef - Book name or code
 * @param chapter - Chapter number (use 1 for chapterless books)
 * @param verse - Verse number
 * @returns Verse text or null if not found
 */
export function getVerse(bookRef: string, chapter: number, verse: number): string | null {
	const bookCode = resolveBookCode(bookRef) || bookRef.toUpperCase();
	const bookData = db.verses[bookCode];
	if (!bookData) return null;

	const chapterData = bookData[chapter.toString()];
	if (!chapterData) return null;

	return chapterData[verse.toString()] || null;
}

/**
 * Get book metadata
 *
 * @param bookRef - Book name or code
 * @returns Book metadata or null if not found
 */
export function getBook(bookRef: string): BibleBook | null {
	const bookCode = resolveBookCode(bookRef) || bookRef.toUpperCase();
	return db.books[bookCode] || null;
}

/**
 * Get the number of verses in a chapter
 *
 * @param bookRef - Book name or code
 * @param chapter - Chapter number
 * @returns Number of verses, or 0 if chapter not found
 */
export function getChapterLength(bookRef: string, chapter: number): number {
	const bookCode = resolveBookCode(bookRef) || bookRef.toUpperCase();
	const bookData = db.verses[bookCode];
	if (!bookData) return 0;

	const chapterData = bookData[chapter.toString()];
	if (!chapterData) return 0;

	return Object.keys(chapterData).length;
}

/**
 * List all available books
 *
 * @returns Array of book codes
 */
export function listBooks(): string[] {
	return Object.keys(db.books);
}

/**
 * Check if a book code is for a chapterless book
 *
 * @param bookCode - The book code
 * @returns true if the book has no chapters (uses chapter 1 internally)
 */
export function isChapterlessBook(bookCode: string): boolean {
	return CHAPTERLESS_BOOKS.has(bookCode);
}
