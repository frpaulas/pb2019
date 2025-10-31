/**
 * Red Letter Days (RLDs) and feast day database interface and getter functions
 */

import rldsData from './rlds.json';
import antiphonsData from './antiphons.json';

export interface FeastDay {
	type: 'RLD' | 'ANG' | 'ECU';
	name: string;
	color?: 'red' | 'purple' | 'white' | 'green'; // Only RLDs have color; commemorations inherit from Sunday
	subtitle?: string;
	year?: string;
	tags?: string;
}

export interface Antiphon {
	name: string;
	english: string;
}

type RldsDatabase = Record<string, FeastDay>;
type AntiphonsDatabase = Record<string, Antiphon>;

const rldsDb: RldsDatabase = rldsData as RldsDatabase;
const antiphonsDb: AntiphonsDatabase = antiphonsData as AntiphonsDatabase;

/**
 * Get a feast day by calendar date (month-day format)
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns FeastDay or null if no feast day on that date
 *
 * @example
 * getFeastDay(12, 25); // Returns Christmas
 * getFeastDay(1, 1);   // Returns Circumcision and Holy Name
 */
export function getFeastDay(month: number, day: number): FeastDay | null {
	const key = `${month}-${day}`;
	return rldsDb[key] || null;
}

/**
 * Get an O Antiphon by calendar date
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns Antiphon or null if no antiphon on that date
 *
 * @example
 * getAntiphon(12, 17); // Returns O Sapientia
 */
export function getAntiphon(month: number, day: number): Antiphon | null {
	const key = `${month}-${day}`;
	return antiphonsDb[key] || null;
}

/**
 * Get all feast days of a specific type
 *
 * @param type - Type of feast day ('RLD', 'ANG', or 'ECU')
 * @returns Array of [date, FeastDay] tuples
 *
 * @example
 * getFeastDaysByType('RLD'); // Returns all Red Letter Days
 */
export function getFeastDaysByType(type: 'RLD' | 'ANG' | 'ECU'): Array<[string, FeastDay]> {
	return Object.entries(rldsDb).filter(([_, feast]) => feast.type === type);
}

/**
 * Get all Red Letter Days (principal feast days)
 *
 * @returns Array of [date, FeastDay] tuples for all RLDs
 */
export function getRedLetterDays(): Array<[string, FeastDay]> {
	return getFeastDaysByType('RLD');
}

/**
 * Check if a date is a Red Letter Day
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns true if the date is an RLD
 */
export function isRedLetterDay(month: number, day: number): boolean {
	const feast = getFeastDay(month, day);
	return feast?.type === 'RLD';
}

/**
 * Get all O Antiphons (Dec 16-23)
 *
 * @returns Array of [date, Antiphon] tuples
 */
export function getAllAntiphons(): Array<[string, Antiphon]> {
	return Object.entries(antiphonsDb);
}

/**
 * Check if a date has any observance (feast day or antiphon)
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns { feastDay, antiphon } with one or both present
 */
export function getObservances(
	month: number,
	day: number
): {
	feastDay: FeastDay | null;
	antiphon: Antiphon | null;
} {
	return {
		feastDay: getFeastDay(month, day),
		antiphon: getAntiphon(month, day)
	};
}
