/**
 * Psalm cycle database for Morning and Evening Prayer
 * Provides both 30-day and 60-day cycles
 */

import psalmCycle30Data from './psalm_cycle_30.json';
import psalmCycle60Data from './psalm_cycle_60.json';

export interface DailyPsalms {
	morning: string[];
	evening: string[];
}

type PsalmCycleDatabase = Record<string, DailyPsalms>;

const cycle30: PsalmCycleDatabase = psalmCycle30Data as PsalmCycleDatabase;
const cycle60: PsalmCycleDatabase = psalmCycle60Data as PsalmCycleDatabase;

/**
 * Get psalms for a specific day in the 30-day cycle
 *
 * @param day - Day of the cycle (1-30)
 * @returns DailyPsalms with morning and evening psalm arrays
 *
 * @example
 * getPsalms30(1); // { morning: ["1", "2", "3", "4", "5"], evening: ["6", "7", "8"] }
 * getPsalms30(25); // { morning: ["119:33-72"], evening: ["119:73-104"] }
 */
export function getPsalms30(day: number): DailyPsalms | null {
	if (day < 1 || day > 30) return null;
	return cycle30[day.toString()] || null;
}

/**
 * Get morning psalms for a specific day in the 30-day cycle
 *
 * @param day - Day of the cycle (1-30)
 * @returns Array of psalm references
 *
 * @example
 * getMorningPsalms30(1); // ["1", "2", "3", "4", "5"]
 */
export function getMorningPsalms30(day: number): string[] | null {
	const psalms = getPsalms30(day);
	return psalms ? psalms.morning : null;
}

/**
 * Get evening psalms for a specific day in the 30-day cycle
 *
 * @param day - Day of the cycle (1-30)
 * @returns Array of psalm references
 *
 * @example
 * getEveningPsalms30(1); // ["6", "7", "8"]
 */
export function getEveningPsalms30(day: number): string[] | null {
	const psalms = getPsalms30(day);
	return psalms ? psalms.evening : null;
}

/**
 * Get the day in the 30-day cycle for a given calendar date
 * Uses the day of the month directly (1-30)
 * Day 31 wraps to day 30
 *
 * @param day - Day of month (1-31)
 * @returns Day in the cycle (1-30)
 *
 * @example
 * getCycleDay30(15); // 15
 * getCycleDay30(31); // 30
 */
export function getCycleDay30(day: number): number {
	if (day > 30) return 30;
	if (day < 1) return 1;
	return day;
}

/**
 * Get psalms for today using the 30-day cycle
 *
 * @returns DailyPsalms for today
 */
export function getTodayPsalms30(): DailyPsalms | null {
	const today = new Date();
	const day = getCycleDay30(today.getDate());
	return getPsalms30(day);
}

/**
 * Get all psalms used in the 30-day cycle
 *
 * @returns Array of [day, DailyPsalms] tuples
 */
export function getAllPsalms30(): Array<[string, DailyPsalms]> {
	return Object.entries(cycle30);
}

/**
 * Get the total count of unique psalms covered in morning prayer
 * (Useful for statistics or verification)
 */
export function getMorningPsalmCount30(): number {
	const psalms = new Set<string>();
	Object.values(cycle30).forEach((day) => {
		day.morning.forEach((p) => psalms.add(p));
	});
	return psalms.size;
}

/**
 * Get the total count of unique psalms covered in evening prayer
 * (Useful for statistics or verification)
 */
export function getEveningPsalmCount30(): number {
	const psalms = new Set<string>();
	Object.values(cycle30).forEach((day) => {
		day.evening.forEach((p) => psalms.add(p));
	});
	return psalms.size;
}

// ============================================================================
// 60-DAY PSALM CYCLE FUNCTIONS
// ============================================================================

/**
 * Get psalms for a specific day in the 60-day cycle
 *
 * @param day - Day of the cycle (1-60)
 * @returns DailyPsalms with morning and evening psalm arrays
 *
 * @example
 * getPsalms60(1); // { morning: ["1", "2"], evening: ["3", "4"] }
 * getPsalms60(32); // { morning: ["78:41-73v"], evening: ["80"] }
 */
export function getPsalms60(day: number): DailyPsalms | null {
	if (day < 1 || day > 60) return null;
	return cycle60[day.toString()] || null;
}

/**
 * Get morning psalms for a specific day in the 60-day cycle
 *
 * @param day - Day of the cycle (1-60)
 * @returns Array of psalm references
 *
 * @example
 * getMorningPsalms60(1); // ["1", "2"]
 */
export function getMorningPsalms60(day: number): string[] | null {
	const psalms = getPsalms60(day);
	return psalms ? psalms.morning : null;
}

/**
 * Get evening psalms for a specific day in the 60-day cycle
 *
 * @param day - Day of the cycle (1-60)
 * @returns Array of psalm references
 *
 * @example
 * getEveningPsalms60(1); // ["3", "4"]
 */
export function getEveningPsalms60(day: number): string[] | null {
	const psalms = getPsalms60(day);
	return psalms ? psalms.evening : null;
}

/**
 * Get the day in the 60-day cycle for a given calendar date
 * Uses day of month for days 1-29, then wraps to beginning
 * For months with 30 days: day 30 = cycle day 30
 * For months with 31 days: day 31 = cycle day 31
 *
 * @param day - Day of month (1-31)
 * @returns Day in the cycle (1-60)
 *
 * @example
 * getCycleDay60(15); // 15
 * getCycleDay60(31); // 31 (for January) or wraps based on implementation
 */
export function getCycleDay60(day: number): number {
	if (day > 60) return ((day - 1) % 60) + 1;
	if (day < 1) return 1;
	return day;
}

/**
 * Get psalms for today using the 60-day cycle
 * Uses day of month to determine position in cycle
 *
 * @returns DailyPsalms for today
 */
export function getTodayPsalms60(): DailyPsalms | null {
	const today = new Date();
	const day = getCycleDay60(today.getDate());
	return getPsalms60(day);
}

/**
 * Get all psalms used in the 60-day cycle
 *
 * @returns Array of [day, DailyPsalms] tuples
 */
export function getAllPsalms60(): Array<[string, DailyPsalms]> {
	return Object.entries(cycle60);
}

/**
 * Get the total count of unique psalms covered in morning prayer (60-day cycle)
 */
export function getMorningPsalmCount60(): number {
	const psalms = new Set<string>();
	Object.values(cycle60).forEach((day) => {
		day.morning.forEach((p) => psalms.add(p));
	});
	return psalms.size;
}

/**
 * Get the total count of unique psalms covered in evening prayer (60-day cycle)
 */
export function getEveningPsalmCount60(): number {
	const psalms = new Set<string>();
	Object.values(cycle60).forEach((day) => {
		day.evening.forEach((p) => psalms.add(p));
	});
	return psalms.size;
}
