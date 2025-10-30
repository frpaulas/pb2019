/**
 * Sunday Lectionary database interface and getter functions
 * Based on BCP 2019 Sunday, Holy Day, and Commemoration Lectionary
 */

import sundayLectionaryData from './sunday_lectionary.json';

export interface Reading {
	ot: string;      // Old Testament (or Acts in Easter season)
	psalm: string;
	epistle: string;
	gospel: string;
}

export interface SundayLectionary {
	name: string;
	season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost';
	yearA: Reading;
	yearB: Reading;
	yearC: Reading;
}

type LectionaryDatabase = Record<string, SundayLectionary>;

const db: LectionaryDatabase = sundayLectionaryData as LectionaryDatabase;

/**
 * Get lectionary readings for a specific Sunday by key
 *
 * @param key - The Sunday key (e.g., "advent-1", "christmas-day-1", "easter-2")
 * @returns SundayLectionary or null if not found
 *
 * @example
 * getSundayReadings('advent-1'); // First Sunday of Advent
 * getSundayReadings('christmas-day-1'); // Christmas Day I
 * getSundayReadings('easter-2'); // Second Sunday of Easter
 */
export function getSundayReadings(key: string): SundayLectionary | null {
	return db[key] || null;
}

/**
 * Get readings for a specific Sunday and liturgical year
 *
 * @param key - The Sunday key
 * @param year - The liturgical year ('A', 'B', or 'C')
 * @returns Reading or null if not found
 *
 * @example
 * getReadings('advent-1', 'A'); // Year A readings for First Sunday of Advent
 */
export function getReadings(key: string, year: 'A' | 'B' | 'C'): Reading | null {
	const sunday = getSundayReadings(key);
	if (!sunday) return null;

	return sunday[`year${year}`];
}

/**
 * Get all Sundays in a specific season
 *
 * @param season - The liturgical season
 * @returns Array of [key, SundayLectionary] tuples
 *
 * @example
 * getSundaysBySeason('advent'); // All Advent Sundays
 * getSundaysBySeason('easter'); // All Easter season readings
 */
export function getSundaysBySeason(
	season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost'
): Array<[string, SundayLectionary]> {
	return Object.entries(db).filter(([_, sunday]) => sunday.season === season);
}

/**
 * Get all Sunday keys (useful for navigation or listing)
 *
 * @returns Array of all Sunday keys
 */
export function getAllSundayKeys(): string[] {
	return Object.keys(db);
}

/**
 * Search for Sundays by name (case-insensitive)
 *
 * @param searchTerm - Term to search for in Sunday names
 * @returns Array of [key, SundayLectionary] tuples matching the search
 *
 * @example
 * searchSundays('transfiguration'); // Find Transfiguration Sunday
 * searchSundays('palm'); // Find Palm Sunday readings
 */
export function searchSundays(searchTerm: string): Array<[string, SundayLectionary]> {
	const term = searchTerm.toLowerCase();
	return Object.entries(db).filter(([_, sunday]) =>
		sunday.name.toLowerCase().includes(term)
	);
}

/**
 * Get Proper Sunday by number
 *
 * @param properNumber - The Proper number (1-29)
 * @returns SundayLectionary or null if not found
 *
 * @example
 * getProper(15); // Proper 15 readings
 */
export function getProper(properNumber: number): SundayLectionary | null {
	if (properNumber < 1 || properNumber > 29) return null;
	return getSundayReadings(`proper-${properNumber}`);
}

/**
 * Determine which liturgical year (A, B, or C) for a given calendar year
 *
 * Year C: Years divisible by 3 (e.g., 2024, 2027, 2030)
 * Year B: Years that leave remainder 2 when divided by 3 (e.g., 2023, 2026, 2029)
 * Year A: Years that leave remainder 1 when divided by 3 (e.g., 2025, 2028, 2031)
 *
 * @param year - Calendar year
 * @returns 'A', 'B', or 'C'
 *
 * @example
 * getLiturgicalYear(2024); // Returns 'C'
 * getLiturgicalYear(2025); // Returns 'A'
 */
export function getLiturgicalYearCycle(year: number): 'A' | 'B' | 'C' {
	const remainder = year % 3;
	if (remainder === 0) return 'C';
	if (remainder === 1) return 'A';
	return 'B';
}
