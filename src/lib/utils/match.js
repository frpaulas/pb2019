/**
 * Simple pattern matching utility for cleaner switch-like behavior
 * @param {string} value - The value to match
 * @param {Object} cases - Object mapping values to results
 * @returns The matched result or the default value
 */
export function match(value, cases) {
	if (value in cases) {
		return cases[value];
	}
	return cases.default ?? null;
}
