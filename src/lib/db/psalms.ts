/**
 * Psalm database interface and getter functions
 */

import psalmsData from './psalms.json';

export interface Verse {
	vs: number;
	ln1: string;
	ln2: string;
	hebrew: string;
	latin: string;
	pb?: number; // Optional page break number
}

export interface Psalm {
	number: number;
	name: string;
	title: string;
	cycle?: string; // Optional cycle heading (e.g., "DAY 1: MORNING PRAYER")
	verses: Verse[];
}

type PsalmsDatabase = Record<string, Psalm>;

const db: PsalmsDatabase = psalmsData as PsalmsDatabase;

/**
 * Get verses from a psalm with optional line selection
 *
 * @param psalmKey - The psalm key (e.g., 1, 23, 119, "23kjv")
 * @param vs_from - Starting verse number (inclusive)
 * @param vs_to - Ending verse number (inclusive)
 * @param fromLine - Starting line: 1 for ln1, 2 for ln2 (default: 1)
 * @param toLine - Ending line: 1 for ln1 only, 2 for both lines (default: 2)
 * @returns Array of verses in the specified range with line filtering applied
 * @throws Error if psalm not found
 */
export function psalm(
	psalmKey: number | string,
	vs_from: number,
	vs_to: number,
	fromLine: number = 1,
	toLine: number = 2
): Verse[] {
	const key = psalmKey.toString();
	const psalmData = db[key];

	if (!psalmData) {
		throw new Error(`Psalm ${psalmKey} not found in database`);
	}

	const verses = psalmData.verses.filter((verse) => verse.vs >= vs_from && verse.vs <= vs_to);

	// Handle line filtering
	return verses.map((verse, index) => {
		const isFirstVerse = index === 0;
		const isLastVerse = index === verses.length - 1;

		let ln1 = verse.ln1;
		let ln2 = verse.ln2;

		// If starting from ln2 on first verse, hide ln1
		if (isFirstVerse && fromLine === 2) {
			ln1 = '';
		}

		// If ending at ln1 on last verse, hide ln2
		if (isLastVerse && toLine === 1) {
			ln2 = '';
		}

		return { ...verse, ln1, ln2 };
	});
}

/**
 * Get all verses from a psalm
 *
 * @param psalmKey - The psalm key (e.g., 1, 23, 119, "23kjv")
 * @returns All verses in the psalm
 * @throws Error if psalm not found
 */
export function getPsalm(psalmKey: number | string): Psalm {
	const key = psalmKey.toString();
	const psalmData = db[key];

	if (!psalmData) {
		throw new Error(`Psalm ${psalmKey} not found in database`);
	}

	return psalmData;
}

/**
 * Get psalm metadata (without verses)
 *
 * @param psalmKey - The psalm key (e.g., 1, 23, 119, "23kjv")
 * @returns Psalm number, name, and title
 * @throws Error if psalm not found
 */
export function getPsalmMeta(psalmKey: number | string): Pick<Psalm, 'number' | 'name' | 'title'> {
	const key = psalmKey.toString();
	const psalmData = db[key];

	if (!psalmData) {
		throw new Error(`Psalm ${psalmKey} not found in database`);
	}

	return {
		number: psalmData.number,
		name: psalmData.name,
		title: psalmData.title
	};
}

/**
 * Get a single verse from a psalm
 *
 * @param psalmKey - The psalm key (e.g., 1, 23, 119, "23kjv")
 * @param verseNumber - The verse number
 * @returns The verse
 * @throws Error if psalm or verse not found
 */
export function getVerse(psalmKey: number | string, verseNumber: number): Verse {
	const verses = psalm(psalmKey, verseNumber, verseNumber);

	if (verses.length === 0) {
		throw new Error(`Psalm ${psalmKey}:${verseNumber} not found`);
	}

	return verses[0];
}

/**
 * List all available psalms
 *
 * @returns Array of psalm numbers
 */
export function listPsalms(): number[] {
	return Object.keys(db)
		.map(Number)
		.sort((a, b) => a - b);
}
