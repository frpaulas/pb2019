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
}

export interface Psalm {
	number: number;
	name: string;
	title: string;
	verses: Verse[];
}

type PsalmsDatabase = Record<string, Psalm>;

const db: PsalmsDatabase = psalmsData as PsalmsDatabase;

/**
 * Get verses from a psalm
 *
 * @param psalmKey - The psalm key (e.g., 1, 23, 119, "23kjv")
 * @param vs_from - Starting verse number (inclusive)
 * @param vs_to - Ending verse number (inclusive)
 * @returns Array of verses in the specified range
 * @throws Error if psalm not found
 */
export function psalm(psalmKey: number | string, vs_from: number, vs_to: number): Verse[] {
	const key = psalmKey.toString();
	const psalmData = db[key];

	if (!psalmData) {
		throw new Error(`Psalm ${psalmKey} not found in database`);
	}

	const verses = psalmData.verses.filter((verse) => verse.vs >= vs_from && verse.vs <= vs_to);

	return verses;
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
