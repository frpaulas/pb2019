/**
 * Sunday Lectionary Key Mapping
 * Maps calendar dates to Sunday lectionary keys based on liturgical calendar rules
 */

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
	return date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate();
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

		// Special case: last Sunday of Epiphany is always "last-epiphany"
		if (isSameDay(date, dates.lastEpiphany)) {
			return 'last-epiphany';
		}

		return `epiphany-${sundayCount}`;
	}

	// Check if we're in Proper season (after Trinity Sunday)
	if (date > dates.trinitySunday) {
		// Calculate which Proper this is
		const weeksSinceTrinity = Math.floor((date.getTime() - dates.trinitySunday.getTime()) / (7 * 24 * 60 * 60 * 1000));
		const properNumber = weeksSinceTrinity;

		// Propers go from 1 to 29
		if (properNumber >= 1 && properNumber <= 29) {
			return `proper-${properNumber}`;
		}
	}

	// Check Christmas season (between Christmas and Epiphany)
	if (date > dates.christmasDay && date < dates.epiphany) {
		// Sundays after Christmas
		const weeksSinceChristmas = Math.floor((date.getTime() - dates.christmasDay.getTime()) / (7 * 24 * 60 * 60 * 1000));
		if (weeksSinceChristmas === 1) return 'christmas-1';
		if (weeksSinceChristmas === 2) return 'christmas-2';
	}

	return null;
}

/**
 * Get information about the liturgical season for a given date
 */
export function getLiturgicalSeason(year: number, month: number, day: number): {
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
