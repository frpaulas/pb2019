/**
 * Psalm database interface and getter functions
 */

import psalmsData from './psalms.json';

export interface Verse {
	vs: number;
	ln1: string;
	ln2: string;
	hebrew: string;
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
 * @param psalmNumber - The psalm number (e.g., 1, 23, 119)
 * @param vs_from - Starting verse number (inclusive)
 * @param vs_to - Ending verse number (inclusive)
 * @returns Array of verses in the specified range
 * @throws Error if psalm not found
 */
export function psalm(psalmNumber: number, vs_from: number, vs_to: number): Verse[] {
	const psalmData = db[psalmNumber.toString()];

	if (!psalmData) {
		throw new Error(`Psalm ${psalmNumber} not found in database`);
	}

	const verses = psalmData.verses.filter(
		(verse) => verse.vs >= vs_from && verse.vs <= vs_to
	);

	return verses;
}

/**
 * Get all verses from a psalm
 *
 * @param psalmNumber - The psalm number
 * @returns All verses in the psalm
 * @throws Error if psalm not found
 */
export function getPsalm(psalmNumber: number): Psalm {
	const psalmData = db[psalmNumber.toString()];

	if (!psalmData) {
		throw new Error(`Psalm ${psalmNumber} not found in database`);
	}

	return psalmData;
}

/**
 * Get psalm metadata (without verses)
 *
 * @param psalmNumber - The psalm number
 * @returns Psalm number, name, and title
 * @throws Error if psalm not found
 */
export function getPsalmMeta(psalmNumber: number): Pick<Psalm, 'number' | 'name' | 'title'> {
	const psalmData = db[psalmNumber.toString()];

	if (!psalmData) {
		throw new Error(`Psalm ${psalmNumber} not found in database`);
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
 * @param psalmNumber - The psalm number
 * @param verseNumber - The verse number
 * @returns The verse
 * @throws Error if psalm or verse not found
 */
export function getVerse(psalmNumber: number, verseNumber: number): Verse {
	const verses = psalm(psalmNumber, verseNumber, verseNumber);

	if (verses.length === 0) {
		throw new Error(`Psalm ${psalmNumber}:${verseNumber} not found`);
	}

	return verses[0];
}

/**
 * List all available psalms
 *
 * @returns Array of psalm numbers
 */
export function listPsalms(): number[] {
	return Object.keys(db).map(Number).sort((a, b) => a - b);
}
