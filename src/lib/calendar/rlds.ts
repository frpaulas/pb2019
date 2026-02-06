/**
 * Red Letter Days (RLDs) and feast day database interface and getter functions
 */

import rldsData from './rlds.json';
import antiphonsData from './antiphons.json';
import { calculateLiturgicalDates, getLiturgicalSeason } from './sunday_key_mapping';

export interface FeastDay {
	type: 'PF' | 'RLD' | 'ANG' | 'ECU';
	name: string;
	color?: 'red' | 'purple' | 'white' | 'green'; // Only PF/RLD have color; commemorations inherit from Sunday
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
 * Holy Days - these MAY be observed on Sunday OR transferred to following weekday
 * EXCEPT during Advent, Lent, and Easter season when they MUST transfer
 *
 * Note: Principal Feasts (PF type) NEVER move, even on Sunday
 * Note: Easter, Ascension, Pentecost, and Trinity are always on specific days of the week
 */
const HOLY_DAYS = new Set([
	'1-1', // The Circumcision and Holy Name
	'1-18', // Confession of Peter the Apostle
	'1-25', // Conversion of Paul the Apostle
	'2-2', // The Presentation (not in rlds.json, would need to be added)
	'3-19', // Joseph
	'3-25', // The Annunciation
	'4-25', // Mark (Evangelist)
	'5-1', // Philip and James (Apostles)
	'5-31', // The Visitation
	'6-11', // Barnabas (Apostle)
	'6-24', // Nativity of John the Baptist
	'6-29', // Peter and Paul (Apostles)
	'7-22', // Mary Magdalene
	'7-25', // James the Elder (Apostle)
	'8-6', // The Transfiguration
	'8-15', // The Virgin Mary
	'9-14', // Holy Cross Day
	'9-21', // Matthew (Apostle and Evangelist)
	'9-29', // Holy Michael and All Angels
	'10-18', // Luke (Evangelist)
	'10-23', // James of Jerusalem
	'10-28', // Simon and Jude (Apostles)
	'11-30', // Andrew (Apostle)
	'12-21', // Thomas (Apostle)
	'12-26', // Stephen
	'12-27', // John (Apostle and Evangelist)
	'12-28' // The Holy Innocents
]);

/**
 * Check if a date falls on a Sunday
 */
function isSunday(year: number, month: number, day: number): boolean {
	const date = new Date(year, month - 1, day);
	return date.getDay() === 0;
}

/**
 * Check if a date is in Advent, Lent, or Easter season
 */
function isInRestrictedSeason(year: number, month: number, day: number): boolean {
	const season = getLiturgicalSeason(year, month, day);
	if (!season) return false;
	return season.season === 'advent' || season.season === 'lent' || season.season === 'easter';
}

/**
 * Check if a date is in Holy Week (Palm Sunday through Easter Eve)
 * or Easter Week (Easter Day through the following Saturday)
 */
function isInHolyOrEasterWeek(year: number, month: number, day: number): boolean {
	const date = new Date(year, month - 1, day);
	const dates = calculateLiturgicalDates(year);

	// Holy Week: Palm Sunday (inclusive) to Easter Eve (inclusive)
	const palmSunday = dates.palmSunday;
	const easterEve = new Date(dates.easterDay);
	easterEve.setDate(easterEve.getDate() - 1);

	// Easter Week: Easter Day (inclusive) to following Saturday (inclusive)
	const easterWeekEnd = new Date(dates.easterDay);
	easterWeekEnd.setDate(easterWeekEnd.getDate() + 6);

	return (
		(date >= palmSunday && date <= easterEve) || (date >= dates.easterDay && date <= easterWeekEnd)
	);
}

/**
 * Check if a date is Ash Wednesday
 */
function isAshWednesday(year: number, month: number, day: number): boolean {
	const date = new Date(year, month - 1, day);
	const dates = calculateLiturgicalDates(year);
	return (
		date.getFullYear() === dates.ashWednesday.getFullYear() &&
		date.getMonth() === dates.ashWednesday.getMonth() &&
		date.getDate() === dates.ashWednesday.getDate()
	);
}

/**
 * Find the next available day for a transferred feast
 * A day is available if it doesn't have an RLD feast AND is not a Sunday
 * (since feasts can't be transferred TO a Sunday)
 */
function findNextAvailableDay(
	year: number,
	month: number,
	day: number
): { month: number; day: number } {
	let currentDate = new Date(year, month - 1, day);

	// Start from the next day
	currentDate.setDate(currentDate.getDate() + 1);

	// Keep searching for up to 30 days (should be more than enough)
	for (let i = 0; i < 30; i++) {
		const testMonth = currentDate.getMonth() + 1;
		const testDay = currentDate.getDate();
		const testYear = currentDate.getFullYear();
		const key = `${testMonth}-${testDay}`;

		// A day is blocked if:
		// 1. It's a Sunday (can't transfer TO a Sunday)
		// 2. It's Ash Wednesday
		// 3. It's in Holy Week or Easter Week
		// 4. It has a PF or RLD feast (ANG and ECU can share dates with transferred feasts)
		const existingFeast = rldsDb[key];
		const isBlocked =
			isSunday(testYear, testMonth, testDay) ||
			isAshWednesday(testYear, testMonth, testDay) ||
			isInHolyOrEasterWeek(testYear, testMonth, testDay) ||
			(existingFeast && (existingFeast.type === 'PF' || existingFeast.type === 'RLD'));

		if (!isBlocked) {
			return { month: testMonth, day: testDay };
		}

		currentDate.setDate(currentDate.getDate() + 1);
	}

	// Fallback: return next day (should never happen)
	return { month: month, day: day + 1 };
}

/**
 * Determine if a feast should be transferred from Sunday to another day
 *
 * @param year - Calendar year
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns Object with shouldTransfer flag and transferredDate if applicable
 */
export function shouldTransferFeast(
	year: number,
	month: number,
	day: number
): { shouldTransfer: boolean; transferredDate?: { month: number; day: number } } {
	const key = `${month}-${day}`;
	const feast = rldsDb[key];

	// No feast on this date
	if (!feast) {
		return { shouldTransfer: false };
	}

	// Not a Sunday - no transfer needed
	if (!isSunday(year, month, day)) {
		return { shouldTransfer: false };
	}

	// Principal Feasts (PF type) never transfer
	if (feast.type === 'PF') {
		return { shouldTransfer: false };
	}

	// Holy Days always transfer when on Sunday
	// (The "may be observed on Sunday" option in BCP 2019 is a pastoral choice,
	// but in this implementation we always transfer them for consistency)
	if (HOLY_DAYS.has(key)) {
		const transferredDate = findNextAvailableDay(year, month, day);
		return { shouldTransfer: true, transferredDate };
	}

	// All other RLD feasts must transfer when on Sunday
	if (feast.type === 'RLD') {
		const transferredDate = findNextAvailableDay(year, month, day);
		return { shouldTransfer: true, transferredDate };
	}

	// ANG and ECU commemorations transfer when on Sunday
	const transferredDate = findNextAvailableDay(year, month, day);
	return { shouldTransfer: true, transferredDate };
}

/**
 * Get all feast days for a calendar date (includes transferred feasts)
 * This function accounts for feast transfers when they fall on Sunday
 * Multiple feasts can occur on the same date (e.g., ANG/ECU + transferred RLD)
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @param year - Optional year for transfer calculations (defaults to current year)
 * @returns Array of FeastDays on that date
 *
 * @example
 * getAllFeastDays(1, 31, 2028); // Returns [Samuel Shoemaker, Charles (transferred)]
 */
export function getAllFeastDays(month: number, day: number, year?: number): FeastDay[] {
	const key = `${month}-${day}`;
	const actualYear = year || new Date().getFullYear();
	const feasts: FeastDay[] = [];

	// Check if there's a feast naturally on this date
	const directFeast = rldsDb[key];

	if (directFeast) {
		if (year) {
			// Check if this feast should be transferred away
			const transfer = shouldTransferFeast(actualYear, month, day);
			if (!transfer.shouldTransfer) {
				// Not transferred, so it stays here
				feasts.push(directFeast);
			}
		} else {
			// No year provided, return the direct feast
			feasts.push(directFeast);
		}
	}

	// Check if any feast was transferred TO this date
	if (year) {
		for (const [feastKey, feast] of Object.entries(rldsDb)) {
			const [feastMonth, feastDay] = feastKey.split('-').map(Number);
			const transfer = shouldTransferFeast(actualYear, feastMonth, feastDay);

			if (transfer.shouldTransfer && transfer.transferredDate) {
				if (transfer.transferredDate.month === month && transfer.transferredDate.day === day) {
					feasts.push(feast);
				}
			}
		}
	}

	return feasts;
}

/**
 * Get a feast day by calendar date (month-day format)
 * This function now accounts for feast transfers when they fall on Sunday
 * If multiple feasts exist, returns the highest priority one (PF > RLD > ANG > ECU)
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @param year - Optional year for transfer calculations (defaults to current year)
 * @returns FeastDay or null if no feast day on that date
 *
 * @example
 * getFeastDay(12, 25); // Returns Christmas
 * getFeastDay(1, 1, 2025);   // Returns Circumcision and Holy Name (checks if transferred)
 */
export function getFeastDay(month: number, day: number, year?: number): FeastDay | null {
	const actualYear = year || new Date().getFullYear();

	// Ash Wednesday takes precedence over any other feast day
	if (isAshWednesday(actualYear, month, day)) {
		return {
			type: 'PF',
			name: 'Ash Wednesday',
			color: 'purple'
		};
	}

	const feasts = getAllFeastDays(month, day, year);

	if (feasts.length === 0) return null;

	// Return highest priority feast: PF > RLD > ANG > ECU
	const priority = { PF: 1, RLD: 2, ANG: 3, ECU: 4 };
	feasts.sort((a, b) => priority[a.type] - priority[b.type]);

	return feasts[0];
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
 * @param type - Type of feast day ('PF', 'RLD', 'ANG', or 'ECU')
 * @returns Array of [date, FeastDay] tuples
 *
 * @example
 * getFeastDaysByType('PF'); // Returns all Principal Feasts
 * getFeastDaysByType('RLD'); // Returns all Red Letter Days (excluding Principal Feasts)
 */
export function getFeastDaysByType(type: 'PF' | 'RLD' | 'ANG' | 'ECU'): Array<[string, FeastDay]> {
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
 * Check if a date is a Red Letter Day (Principal Feast or RLD)
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @param year - Optional year for transfer calculations
 * @returns true if the date is a PF or RLD
 */
export function isRedLetterDay(month: number, day: number, year?: number): boolean {
	const feast = getFeastDay(month, day, year);
	return feast?.type === 'PF' || feast?.type === 'RLD';
}

/**
 * Get the original calendar date key for a feast on a given date
 * This handles transferred feasts - if a feast was transferred TO this date,
 * returns the original date key (for looking up readings in rld_eucharist.json)
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @param year - Year for transfer calculations
 * @returns Original date key (e.g., "1-18") or null if no RLD feast
 */
export function getOriginalFeastDateKey(month: number, day: number, year: number): string | null {
	const key = `${month}-${day}`;

	// First check if there's a feast directly on this date that wasn't transferred away
	const directFeast = rldsDb[key];
	if (directFeast && (directFeast.type === 'PF' || directFeast.type === 'RLD')) {
		const transfer = shouldTransferFeast(year, month, day);
		if (!transfer.shouldTransfer) {
			// Feast stays on this date
			return key;
		}
	}

	// Check if any feast was transferred TO this date
	for (const [feastKey, feast] of Object.entries(rldsDb)) {
		if (feast.type !== 'PF' && feast.type !== 'RLD') continue;

		const [feastMonth, feastDay] = feastKey.split('-').map(Number);
		const transfer = shouldTransferFeast(year, feastMonth, feastDay);

		if (transfer.shouldTransfer && transfer.transferredDate) {
			if (transfer.transferredDate.month === month && transfer.transferredDate.day === day) {
				// This feast was transferred here - return its original date
				return feastKey;
			}
		}
	}

	return null;
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
 * @param year - Optional year for transfer calculations
 * @returns { feastDay, antiphon } with one or both present
 */
export function getObservances(
	month: number,
	day: number,
	year?: number
): {
	feastDay: FeastDay | null;
	antiphon: Antiphon | null;
} {
	return {
		feastDay: getFeastDay(month, day, year),
		antiphon: getAntiphon(month, day)
	};
}
