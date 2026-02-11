/**
 * Sunday Lectionary Key Mapping
 * Maps calendar dates to Sunday lectionary keys based on liturgical calendar rules
 */

import { getSundayReadings } from './sunday_lectionary';

/**
 * Calculate Easter Sunday for a given year using the Anonymous Gregorian algorithm
 * (Meeus/Jones/Butcher algorithm)
 *
 * @param year - Calendar year
 * @returns Date object for Easter Sunday
 */
export function calculateEaster(year: number): Date {
	const a = year % 19;
	const b = Math.floor(year / 100);
	const c = year % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);
	const month = Math.floor((h + l - 7 * m + 114) / 31);
	const day = ((h + l - 7 * m + 114) % 31) + 1;

	return new Date(year, month - 1, day);
}

/**
 * Get the Sunday on or before a given date
 */
function getSundayOnOrBefore(date: Date): Date {
	const dayOfWeek = date.getDay();
	const sunday = new Date(date);
	sunday.setDate(date.getDate() - dayOfWeek);
	return sunday;
}

/**
 * Get the Sunday on or after a given date
 */
function getSundayOnOrAfter(date: Date): Date {
	const dayOfWeek = date.getDay();
	if (dayOfWeek === 0) return new Date(date);
	const sunday = new Date(date);
	sunday.setDate(date.getDate() + (7 - dayOfWeek));
	return sunday;
}

/**
 * Add days to a date
 */
function addDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/**
 * Add weeks to a date
 */
function addWeeks(date: Date, weeks: number): Date {
	return addDays(date, weeks * 7);
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

/**
 * Key liturgical dates for a given year
 */
interface LiturgicalDates {
	// Advent/Christmas
	advent1: Date;
	advent2: Date;
	advent3: Date;
	advent4: Date;
	christmasDay: Date;

	// Epiphany
	epiphany: Date;
	baptismOfLord: Date; // First Sunday after Epiphany
	lastEpiphany: Date; // Sunday before Ash Wednesday

	// Lent/Easter
	ashWednesday: Date;
	lent1: Date;
	lent2: Date;
	lent3: Date;
	lent4: Date;
	lent5: Date;
	palmSunday: Date; // lent-6
	easterDay: Date;

	// Easter Season
	easter2: Date;
	easter3: Date;
	easter4: Date;
	easter5: Date;
	easter6: Date;
	ascensionThursday: Date;
	ascensionSunday: Date; // easter-7
	pentecostSunday: Date;
	trinitySunday: Date;

	// Ordinary Time (Propers)
	proper1: Date; // Sunday after Trinity
}

/**
 * Calculate all key liturgical dates for a given year
 */
export function calculateLiturgicalDates(year: number): LiturgicalDates {
	// Easter is the anchor for many calculations
	const easter = calculateEaster(year);

	// Ash Wednesday is Easter minus 46 days
	const ashWednesday = addDays(easter, -46);

	// Lent-1 is the Sunday following Ash Wednesday
	const lent1 = getSundayOnOrAfter(addDays(ashWednesday, 1));

	// Palm Sunday is the Sunday before Easter (lent-6)
	const palmSunday = addDays(easter, -7);

	// Other Lent Sundays
	const lent2 = addWeeks(lent1, 1);
	const lent3 = addWeeks(lent1, 2);
	const lent4 = addWeeks(lent1, 3);
	const lent5 = addWeeks(lent1, 4);

	// Easter Season Sundays
	const easter2 = addWeeks(easter, 1);
	const easter3 = addWeeks(easter, 2);
	const easter4 = addWeeks(easter, 3);
	const easter5 = addWeeks(easter, 4);
	const easter6 = addWeeks(easter, 5);
	const ascensionSunday = addWeeks(easter, 6); // easter-7
	const pentecostSunday = addWeeks(easter, 7);
	const trinitySunday = addWeeks(easter, 8);

	// Ascension Thursday is the Thursday before Ascension Sunday
	const ascensionThursday = addDays(ascensionSunday, -3);

	// Christmas and Advent
	const christmasDay = new Date(year, 11, 25); // December 25
	const advent4 = getSundayOnOrBefore(addDays(christmasDay, -1)); // Sunday before Christmas
	const advent3 = addWeeks(advent4, -1);
	const advent2 = addWeeks(advent4, -2);
	const advent1 = addWeeks(advent4, -3);

	// Epiphany season
	const epiphany = new Date(year, 0, 6); // January 6
	const baptismOfLord = getSundayOnOrAfter(addDays(epiphany, 1)); // First Sunday after Epiphany
	const lastEpiphany = addDays(ashWednesday, -3); // Get to Sunday before Ash Wednesday

	// Proper 1 (first Sunday after Trinity)
	const proper1 = addWeeks(trinitySunday, 1);

	return {
		advent1,
		advent2,
		advent3,
		advent4,
		christmasDay,
		epiphany,
		baptismOfLord,
		lastEpiphany,
		ashWednesday,
		lent1,
		lent2,
		lent3,
		lent4,
		lent5,
		palmSunday,
		easterDay: easter,
		easter2,
		easter3,
		easter4,
		easter5,
		easter6,
		ascensionThursday,
		ascensionSunday,
		pentecostSunday,
		trinitySunday,
		proper1
	};
}

/**
 * Get the Sunday lectionary key for a given date
 *
 * @param year - Calendar year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @returns Sunday lectionary key (e.g., "advent-1", "easter-3", "proper-15") or null if not a Sunday
 */
export function getSundayLectionaryKey(year: number, month: number, day: number): string | null {
	const date = new Date(year, month - 1, day);

	// Check if it's a Sunday
	if (date.getDay() !== 0) {
		return null;
	}

	return getSundayLectionaryKeyForDate(date);
}

/**
 * Get the Sunday lectionary key for any date (uses previous Sunday if not a Sunday)
 *
 * @param year - Calendar year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @returns Sunday lectionary key (e.g., "advent-1", "easter-3", "proper-15") or null if no applicable Sunday
 */
export function getSundayLectionaryKeyForAnyDate(
	year: number,
	month: number,
	day: number
): string | null {
	const date = new Date(year, month - 1, day);

	// If it's a Sunday, use this date; otherwise find the previous Sunday
	const sunday = date.getDay() === 0 ? date : getSundayOnOrBefore(date);

	return getSundayLectionaryKeyForDate(sunday);
}

/**
 * Internal function to get Sunday lectionary key for a date (assumes date is a Sunday)
 */
function getSundayLectionaryKeyForDate(date: Date): string | null {
	const year = date.getFullYear();

	const dates = calculateLiturgicalDates(year);

	// Check Advent
	if (isSameDay(date, dates.advent1)) return 'advent-1';
	if (isSameDay(date, dates.advent2)) return 'advent-2';
	if (isSameDay(date, dates.advent3)) return 'advent-3';
	if (isSameDay(date, dates.advent4)) return 'advent-4';

	// Check Christmas Day (can be on Sunday)
	if (isSameDay(date, dates.christmasDay)) return 'christmas-day-1';

	// Check Lent
	if (isSameDay(date, dates.lent1)) return 'lent-1';
	if (isSameDay(date, dates.lent2)) return 'lent-2';
	if (isSameDay(date, dates.lent3)) return 'lent-3';
	if (isSameDay(date, dates.lent4)) return 'lent-4';
	if (isSameDay(date, dates.lent5)) return 'lent-5';
	if (isSameDay(date, dates.palmSunday)) return 'lent-6';

	// Check Easter Season
	if (isSameDay(date, dates.easterDay)) return 'easter-day';
	if (isSameDay(date, dates.easter2)) return 'easter-2';
	if (isSameDay(date, dates.easter3)) return 'easter-3';
	if (isSameDay(date, dates.easter4)) return 'easter-4';
	if (isSameDay(date, dates.easter5)) return 'easter-5';
	if (isSameDay(date, dates.easter6)) return 'easter-6';
	if (isSameDay(date, dates.ascensionSunday)) return 'easter-7';
	if (isSameDay(date, dates.pentecostSunday)) return 'pentecost';
	if (isSameDay(date, dates.trinitySunday)) return 'trinity';

	// Check if we're in Epiphany season (between Baptism of Lord and Last Epiphany)
	if (date >= dates.baptismOfLord && date <= dates.lastEpiphany) {
		// Count which Sunday of Epiphany this is
		let sundayCount = 1;
		let currentSunday = new Date(dates.baptismOfLord);

		while (!isSameDay(currentSunday, date) && currentSunday < dates.lastEpiphany) {
			currentSunday = addWeeks(currentSunday, 1);
			sundayCount++;
		}

		// Special case: last Sunday of Epiphany is always "epiphany-last"
		if (isSameDay(date, dates.lastEpiphany)) {
			return 'epiphany-last';
		}

		return `epiphany-${sundayCount}`;
	}

	// Check if we're in Proper season (after Trinity Sunday)
	if (date > dates.trinitySunday) {
		// Propers are mapped to specific date ranges
		// Each Proper corresponds to a specific week in the calendar year
		const properDateRanges = [
			{ proper: 1, start: [5, 8], end: [5, 14] }, // May 8-14
			{ proper: 2, start: [5, 15], end: [5, 21] }, // May 15-21
			{ proper: 3, start: [5, 22], end: [5, 28] }, // May 22-28
			{ proper: 4, start: [5, 29], end: [6, 4] }, // May 29 - June 4
			{ proper: 5, start: [6, 5], end: [6, 11] }, // June 5-11
			{ proper: 6, start: [6, 12], end: [6, 18] }, // June 12-18
			{ proper: 7, start: [6, 19], end: [6, 25] }, // June 19-25
			{ proper: 8, start: [6, 26], end: [7, 2] }, // June 26 - July 2
			{ proper: 9, start: [7, 3], end: [7, 9] }, // July 3-9
			{ proper: 10, start: [7, 10], end: [7, 16] }, // July 10-16
			{ proper: 11, start: [7, 17], end: [7, 23] }, // July 17-23
			{ proper: 12, start: [7, 24], end: [7, 30] }, // July 24-30
			{ proper: 13, start: [7, 31], end: [8, 6] }, // July 31 - Aug 6
			{ proper: 14, start: [8, 7], end: [8, 13] }, // Aug 7-13
			{ proper: 15, start: [8, 14], end: [8, 20] }, // Aug 14-20
			{ proper: 16, start: [8, 21], end: [8, 27] }, // Aug 21-27
			{ proper: 17, start: [8, 28], end: [9, 3] }, // Aug 28 - Sept 3
			{ proper: 18, start: [9, 4], end: [9, 10] }, // Sept 4-10
			{ proper: 19, start: [9, 11], end: [9, 17] }, // Sept 11-17
			{ proper: 20, start: [9, 18], end: [9, 24] }, // Sept 18-24
			{ proper: 21, start: [9, 25], end: [10, 1] }, // Sept 25 - Oct 1
			{ proper: 22, start: [10, 2], end: [10, 8] }, // Oct 2-8
			{ proper: 23, start: [10, 9], end: [10, 15] }, // Oct 9-15
			{ proper: 24, start: [10, 16], end: [10, 22] }, // Oct 16-22
			{ proper: 25, start: [10, 23], end: [10, 29] }, // Oct 23-29
			{ proper: 26, start: [10, 30], end: [11, 5] }, // Oct 30 - Nov 5
			{ proper: 27, start: [11, 6], end: [11, 12] }, // Nov 6-12
			{ proper: 28, start: [11, 13], end: [11, 19] }, // Nov 13-19
			{ proper: 29, start: [11, 20], end: [11, 26] } // Nov 20-26
		];

		// Find which Proper date range this Sunday falls into
		for (const range of properDateRanges) {
			const startDate = new Date(year, range.start[0] - 1, range.start[1]);
			const endDate = new Date(year, range.end[0] - 1, range.end[1]);

			if (date >= startDate && date <= endDate) {
				return `proper-${range.proper}`;
			}
		}
	}

	// Check Christmas season (between Christmas and Epiphany)
	if (date > dates.christmasDay && date < dates.epiphany) {
		// Sundays after Christmas
		const weeksSinceChristmas = Math.floor(
			(date.getTime() - dates.christmasDay.getTime()) / (7 * 24 * 60 * 60 * 1000)
		);
		if (weeksSinceChristmas === 1) return 'christmas-1';
		if (weeksSinceChristmas === 2) return 'christmas-2';
	}

	return null;
}

/**
 * Get information about the liturgical season for a given date
 */
export function getLiturgicalSeason(
	year: number,
	month: number,
	day: number
): {
	season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost';
	week?: number;
} | null {
	const date = new Date(year, month - 1, day);
	const dates = calculateLiturgicalDates(year);

	// Advent: Advent 1 to Christmas Eve
	if (date >= dates.advent1 && date < dates.christmasDay) {
		return { season: 'advent' };
	}

	// Christmas: Christmas Day to Epiphany Eve
	if (date >= dates.christmasDay && date < dates.epiphany) {
		return { season: 'christmas' };
	}

	// Epiphany: Epiphany to Ash Wednesday Eve
	if (date >= dates.epiphany && date < dates.ashWednesday) {
		return { season: 'epiphany' };
	}

	// Lent: Ash Wednesday to Easter Eve
	if (date >= dates.ashWednesday && date < dates.easterDay) {
		return { season: 'lent' };
	}

	// Easter: Easter Day to Pentecost Eve
	if (date >= dates.easterDay && date < dates.pentecostSunday) {
		return { season: 'easter' };
	}

	// Pentecost/Ordinary Time: Pentecost onwards
	if (date >= dates.pentecostSunday) {
		return { season: 'pentecost' };
	}

	return null;
}

/**
 * Get the detailed liturgical season for the store, distinguishing
 * ascension, trinity, and proper seasons.
 *
 * Returns a season key matching the LiturgicalSeason type:
 * 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'ascension' | 'pentecost' | 'trinity' | 'proper'
 */
export function getDetailedLiturgicalSeason(date: Date): string {
	const year = date.getFullYear();

	// We need to check two possible liturgical years:
	// - If before Advent 1 of this year, we're in the liturgical year that started last year
	// - If after Advent 1 of this year, we've started a new liturgical year
	const dates = calculateLiturgicalDates(year);
	const prevYearDates = calculateLiturgicalDates(year - 1);

	// Handle Jan-early Jan: could be in previous year's Christmas season
	// Christmas of prev year to Epiphany of this year
	const prevChristmas = prevYearDates.christmasDay;
	const thisEpiphany = new Date(year, 0, 6); // Jan 6

	if (date >= prevChristmas && date < thisEpiphany) {
		return 'christmas';
	}

	// Advent: Advent 1 to Christmas Eve
	if (date >= dates.advent1 && date < dates.christmasDay) {
		return 'advent';
	}

	// Christmas: Christmas Day to Dec 31
	if (date >= dates.christmasDay) {
		return 'christmas';
	}

	// Epiphany: Jan 6 to Ash Wednesday Eve
	if (date >= thisEpiphany && date < dates.ashWednesday) {
		return 'epiphany';
	}

	// Lent: Ash Wednesday to Palm Sunday Eve
	// Holy Week: Palm Sunday to Easter Eve
	if (date >= dates.ashWednesday && date < dates.palmSunday) {
		return 'lent';
	}
	if (date >= dates.palmSunday && date < dates.easterDay) {
		return 'lent'; // Holy Week is still Lent for opening sentences
	}

	// Easter: Easter Day to Ascension Thursday Eve
	if (date >= dates.easterDay && date < dates.ascensionThursday) {
		return 'easter';
	}

	// Ascension: Ascension Thursday to Pentecost Eve
	if (date >= dates.ascensionThursday && date < dates.pentecostSunday) {
		return 'ascension';
	}

	// Pentecost Sunday
	if (isSameDay(date, dates.pentecostSunday)) {
		return 'pentecost';
	}

	// Trinity Sunday
	if (isSameDay(date, dates.trinitySunday)) {
		return 'trinity';
	}

	// Proper season (ordinary time after Trinity)
	if (date > dates.trinitySunday && date < dates.advent1) {
		return 'proper';
	}

	// Pentecost week (between Pentecost and Trinity)
	if (date > dates.pentecostSunday && date <= dates.trinitySunday) {
		return 'pentecost';
	}

	return 'proper';
}

/**
 * Get the lectionary key for Holy Week days (Monday-Saturday of Holy Week)
 * Returns null if not in Holy Week, or the appropriate key like 'holy-week-monday', 'maundy-thursday', etc.
 *
 * @param year - Calendar year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @returns Holy Week lectionary key or null if not in Holy Week
 */
export function getHolyWeekLectionaryKey(year: number, month: number, day: number): string | null {
	const date = new Date(year, month - 1, day);
	const dates = calculateLiturgicalDates(year);

	// Palm Sunday
	if (isSameDay(date, dates.palmSunday)) {
		return 'palm-sunday';
	}

	// Holy Week Monday through Saturday
	const palmSundayTime = dates.palmSunday.getTime();
	const easterTime = dates.easterDay.getTime();
	const dateTime = date.getTime();

	if (dateTime > palmSundayTime && dateTime < easterTime) {
		const dayOfWeek = date.getDay();
		switch (dayOfWeek) {
			case 1:
				return 'holy-week-monday';
			case 2:
				return 'holy-week-tuesday';
			case 3:
				return 'holy-week-wednesday';
			case 4:
				return 'maundy-thursday';
			case 5:
				return 'good-friday';
			case 6:
				return 'holy-saturday';
		}
	}

	return null;
}

/**
 * Get the lectionary key for any date, including Holy Week weekdays
 * This extends getSundayLectionaryKeyForAnyDate to also return Holy Week keys
 *
 * @param year - Calendar year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @returns Lectionary key or null
 */
export function getLectionaryKeyForDate(year: number, month: number, day: number): string | null {
	// Check Holy Week first
	const holyWeekKey = getHolyWeekLectionaryKey(year, month, day);
	if (holyWeekKey) {
		return holyWeekKey;
	}

	// Check if it's Ash Wednesday
	const date = new Date(year, month - 1, day);
	const dates = calculateLiturgicalDates(year);
	if (isSameDay(date, dates.ashWednesday)) {
		return 'lent-ash-wednesday';
	}

	// Fall back to Sunday lectionary
	return getSundayLectionaryKeyForAnyDate(year, month, day);
}

/**
 * Get the liturgical color based on the most recent Sunday.
 * On a Sunday, returns that Sunday's color. On weekdays, returns the previous Sunday's color.
 * Special case: Days between Ash Wednesday and the first Sunday of Lent return purple.
 *
 * @param date - The date to check
 * @returns Liturgical color string ('white' | 'red' | 'purple' | 'green')
 */
export function getPreviousSundayColor(date: Date): string {
	const year = date.getFullYear();
	const dates = calculateLiturgicalDates(year);

	// Special case: Ash Wednesday through Saturday before Lent 1
	// These days are in Lent but the previous Sunday is still Last Epiphany (green)
	if (date >= dates.ashWednesday && date < dates.lent1) {
		return 'purple';
	}

	const dayOfWeek = date.getDay();

	// Get the most recent Sunday (or today if it's Sunday)
	const sunday = new Date(date);
	if (dayOfWeek !== 0) {
		sunday.setDate(sunday.getDate() - dayOfWeek);
	}

	const key = getSundayLectionaryKeyForDate(sunday);
	if (key) {
		const readings = getSundayReadings(key);
		if (readings?.color) {
			return readings.color;
		}
	}

	return 'green';
}
