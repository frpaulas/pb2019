/**
 * Liturgical calendar date conversion utilities
 * Liturgical year starts March 1 (LDOY 1) and ends Feb 28/29 (LDOY 365/366)
 */
/* example usage
calendarDateToLdoy(2024, 3, 1);   // → 1 (March 1)
calendarDateToLdoy(2024, 12, 25); // → 300 (Christmas)
calendarDateToLdoy(2025, 1, 1);   // → 307 (New Year's Day)
calendarDateToLdoy(2024, 2, 29);  // → 366 (Leap day)

ldoyToCalendarDate(2024, 1);      // → { year: 2024, month: 3, day: 1 }
ldoyToCalendarDate(2024, 366);    // → { year: 2025, month: 2, day: 29 }

*/
/**
 * Check if a year is a leap year
 */
export function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get the number of days in a given month
 */
function getDaysInMonth(year: number, month: number): number {
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (month === 2 && isLeapYear(year)) {
		return 29;
	}
	return daysInMonth[month - 1];
}

/**
 * Convert calendar date to Liturgical Day of Year (LDOY)
 * March 1 = LDOY 1
 * Feb 28 (non-leap) = LDOY 365
 * Feb 29 (leap) = LDOY 366
 *
 * @param year - Calendar year
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns LDOY (1-366)
 */
export function calendarDateToLdoy(year: number, month: number, day: number): number {
	// Days in each month (non-leap year)
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Adjust for leap year
	if (isLeapYear(year)) {
		daysInMonth[1] = 29; // February
	}

	let ldoy = 0;

	if (month >= 3) {
		// March-December: straightforward count from March 1
		// Add days from March to the month before target month
		for (let m = 3; m <= month - 1; m++) {
			ldoy += daysInMonth[m - 1];
		}
		// Add the day of the current month
		ldoy += day;
	} else {
		// January-February: these are at the END of the liturgical year
		// First, add all days from March through December
		for (let m = 3; m <= 12; m++) {
			ldoy += daysInMonth[m - 1];
		}
		// Then add January days if we're in February
		if (month === 2) {
			ldoy += daysInMonth[0]; // All of January (31 days)
		}
		// Finally add the current day
		ldoy += day;
	}

	return ldoy;
}

/**
 * Convert LDOY back to calendar date
 *
 * @param year - Calendar year (needed for leap year calculation)
 * @param ldoy - Liturgical Day of Year (1-366)
 * @returns { year, month, day }
 */
export function ldoyToCalendarDate(
	year: number,
	ldoy: number
): { year: number; month: number; day: number } {
	// Days in each month starting from March
	const daysInMonth = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28];

	// Adjust for leap year (February is last in liturgical year)
	if (isLeapYear(year)) {
		daysInMonth[11] = 29; // February
	}

	// Month order: Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, Jan, Feb
	const monthOrder = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

	let remainingDays = ldoy;
	let monthIndex = 0;

	// Find which month the LDOY falls in
	while (remainingDays > daysInMonth[monthIndex]) {
		remainingDays -= daysInMonth[monthIndex];
		monthIndex++;
	}

	const month = monthOrder[monthIndex];
	const day = remainingDays;

	// If we're in Jan/Feb, that's actually the next calendar year
	const resultYear = month <= 2 ? year + 1 : year;

	return { year: resultYear, month, day };
}

/**
 * Get LDOY for today
 */
export function getTodayLdoy(): number {
	const now = new Date();
	return calendarDateToLdoy(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/**
 * Get the liturgical year for a given calendar date
 * Liturgical year starts March 1, so:
 * - Jan 1, 2025 -> Liturgical year 2024 (started March 1, 2024)
 * - March 1, 2025 -> Liturgical year 2025
 */
export function getLiturgicalYear(year: number, month: number, day: number): number {
	if (month < 3) {
		return year - 1;
	}
	return year;
}
