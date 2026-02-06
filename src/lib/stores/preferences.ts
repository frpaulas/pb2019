/**
 * User preferences store with localStorage persistence
 */

import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

export interface OfficeTimes {
	morning: number; // End time as HHMM (default 1130)
	midday: number; // End time as HHMM (default 1500)
	evening: number; // End time as HHMM (default 2000)
}

export type Theme = 'light' | 'dark' | 'system';
export type PsalmVersion = 'web' | 'bcp';

export interface Preferences {
	psalmCycle: 30 | 60;
	psalmVersion: PsalmVersion; // 'web' for WEB Bible, 'bcp' for BCP Psalter
	fontSize: number; // 0.8 - 1.4, default 1.0
	dateOverride: string | null; // ISO date string or null for "today"
	officeTimes: OfficeTimes;
	theme: Theme;
}

const STORAGE_KEY = 'pb2019_preferences';

const defaultPreferences: Preferences = {
	psalmCycle: 60,
	psalmVersion: 'bcp',
	fontSize: 1.0,
	dateOverride: null,
	officeTimes: {
		morning: 1130, // Morning Prayer ends at 11:30 AM
		midday: 1500, // Midday Prayer ends at 3:00 PM
		evening: 2000 // Evening Prayer ends at 8:00 PM
	},
	theme: 'light'
};

function loadPreferences(): Preferences {
	if (!browser) return defaultPreferences;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			// Merge with defaults to handle any missing fields from older versions
			return {
				...defaultPreferences,
				...parsed,
				officeTimes: {
					...defaultPreferences.officeTimes,
					...parsed.officeTimes
				}
			};
		}
	} catch (e) {
		console.warn('Failed to load preferences from localStorage:', e);
	}

	return defaultPreferences;
}

function savePreferences(prefs: Preferences): void {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
	} catch (e) {
		console.warn('Failed to save preferences to localStorage:', e);
	}
}

function createPreferencesStore() {
	const { subscribe, set, update } = writable<Preferences>(loadPreferences());

	// Subscribe to changes and persist
	subscribe((value) => {
		savePreferences(value);
	});

	return {
		subscribe,
		set,
		update,

		/**
		 * Set psalm cycle preference
		 */
		setPsalmCycle: (cycle: 30 | 60) => {
			update((prefs) => ({ ...prefs, psalmCycle: cycle }));
		},

		/**
		 * Set psalm version preference (WEB or BCP)
		 */
		setPsalmVersion: (version: PsalmVersion) => {
			update((prefs) => ({ ...prefs, psalmVersion: version }));
		},

		/**
		 * Set font size multiplier
		 */
		setFontSize: (size: number) => {
			// Clamp to valid range
			const clamped = Math.max(0.8, Math.min(1.4, size));
			update((prefs) => ({ ...prefs, fontSize: clamped }));
		},

		/**
		 * Set date override (ISO string) or null for today
		 */
		setDateOverride: (date: string | null) => {
			update((prefs) => ({ ...prefs, dateOverride: date }));
		},

		/**
		 * Set office time boundaries
		 */
		setOfficeTimes: (times: Partial<OfficeTimes>) => {
			update((prefs) => ({
				...prefs,
				officeTimes: { ...prefs.officeTimes, ...times }
			}));
		},

		/**
		 * Set theme preference
		 */
		setTheme: (theme: Theme) => {
			update((prefs) => ({ ...prefs, theme }));
		},

		/**
		 * Reset all preferences to defaults
		 */
		reset: () => {
			set(defaultPreferences);
		},

		/**
		 * Get default preferences (useful for reset UI)
		 */
		getDefaults: () => defaultPreferences
	};
}

export const preferences = createPreferencesStore();

// Derived stores for individual preferences (convenience)
export const psalmCycle = derived(preferences, ($p) => $p.psalmCycle);
export const psalmVersion = derived(preferences, ($p) => $p.psalmVersion);
export const fontSize = derived(preferences, ($p) => $p.fontSize);
export const dateOverride = derived(preferences, ($p) => $p.dateOverride);
export const officeTimes = derived(preferences, ($p) => $p.officeTimes);
export const theme = derived(preferences, ($p) => $p.theme);

/**
 * Get the effective date (either override or today)
 */
export const effectiveDate = derived(preferences, ($p) => {
	if ($p.dateOverride) {
		return new Date($p.dateOverride);
	}
	return new Date();
});
