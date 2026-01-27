import { writable, derived } from 'svelte/store';
import {
	getDetailedLiturgicalSeason,
	getPreviousSundayColor
} from '$lib/calendar/sunday_key_mapping';

export type LiturgicalSeason =
	| 'advent'
	| 'christmas'
	| 'epiphany'
	| 'lent'
	| 'easter'
	| 'ascension'
	| 'pentecost'
	| 'trinity'
	| 'proper';

export type LiturgicalColor = 'white' | 'red' | 'purple' | 'green' | 'blue' | 'black' | 'rose';

export interface LiturgicalState {
	actualDateTime: Date;
	selectedDate: Date;
	season: LiturgicalSeason;
	colors: LiturgicalColor[];
}

// Create the writable store with initial values
function createLiturgicalStore() {
	const now = new Date();

	const initialSeason = getDetailedLiturgicalSeason(now) as LiturgicalSeason;
	const initialColor = getPreviousSundayColor(now) as LiturgicalColor;

	const { subscribe, set, update } = writable<LiturgicalState>({
		actualDateTime: now,
		selectedDate: now,
		season: initialSeason,
		colors: [initialColor]
	});

	return {
		subscribe,
		set,
		update,
		setActualDateTime: (date: Date) => update((state) => ({ ...state, actualDateTime: date })),
		setSelectedDate: (date: Date) => update((state) => ({ ...state, selectedDate: date })),
		setSeason: (season: LiturgicalSeason) => update((state) => ({ ...state, season })),
		setColors: (colors: LiturgicalColor[]) => update((state) => ({ ...state, colors })),
		setSeasonAndColors: (season: LiturgicalSeason, colors: LiturgicalColor[]) =>
			update((state) => ({ ...state, season, colors }))
	};
}

export const liturgical = createLiturgicalStore();

// Derived stores for convenient access to individual properties
export const actualDateTime = derived(liturgical, ($liturgical) => $liturgical.actualDateTime);
export const selectedDate = derived(liturgical, ($liturgical) => $liturgical.selectedDate);
export const season = derived(liturgical, ($liturgical) => $liturgical.season);
export const colors = derived(liturgical, ($liturgical) => $liturgical.colors);

// Liturgical Context for dynamic substitutions (gender, number, names)
export type Gender = 'masculine' | 'feminine' | 'neutral';
export type GrammaticalNumber = 'singular' | 'plural';

export interface SubjectContext {
	gender: Gender;
	number: GrammaticalNumber;
	firstName?: string;
	lastName?: string;
	fullName?: string;
}

export interface LiturgicalContextState {
	// Primary subject (baptismal candidate, deceased person, etc.)
	subject?: SubjectContext;
	// Secondary subject (e.g., second person in marriage)
	subject2?: SubjectContext;
	// For group contexts (multiple candidates)
	candidates?: SubjectContext[];
	// Metadata for persistence
	_metadata?: {
		setAt?: number; // timestamp when context was set
		expiresAt?: number; // timestamp when context expires
		serviceSlug?: string; // which service this context is for
	};
}

const CONTEXT_STORAGE_KEY = 'liturgicalContext';
const DEFAULT_EXPIRATION_DAYS = 1; // Context expires at end of tomorrow

/**
 * Calculate midnight expiration timestamp
 * @param days - 0 = midnight today, 1 = midnight tomorrow, etc.
 * @returns Timestamp of midnight on that day
 */
function getMidnightExpiration(days: number): number {
	const now = new Date();
	const target = new Date(now);

	// Set to midnight of the target day
	target.setDate(target.getDate() + days);
	target.setHours(23, 59, 59, 999); // End of that day

	return target.getTime();
}

function createLiturgicalContextStore() {
	// Load initial state from localStorage if available and not expired
	const loadFromStorage = (): LiturgicalContextState => {
		if (typeof window === 'undefined') return {};

		try {
			const stored = localStorage.getItem(CONTEXT_STORAGE_KEY);
			if (!stored) return {};

			const parsed: LiturgicalContextState = JSON.parse(stored);

			// Check if expired
			if (parsed._metadata?.expiresAt && Date.now() > parsed._metadata.expiresAt) {
				localStorage.removeItem(CONTEXT_STORAGE_KEY);
				return {};
			}

			return parsed;
		} catch (e) {
			console.warn('Failed to load liturgical context from storage:', e);
			return {};
		}
	};

	const { subscribe, set, update } = writable<LiturgicalContextState>(loadFromStorage());

	// Subscribe to changes and persist to localStorage
	const persistToStorage = (state: LiturgicalContextState) => {
		if (typeof window === 'undefined') return;

		try {
			if (!state.subject && !state.subject2 && !state.candidates) {
				// Empty state - remove from storage
				localStorage.removeItem(CONTEXT_STORAGE_KEY);
			} else {
				localStorage.setItem(CONTEXT_STORAGE_KEY, JSON.stringify(state));
			}
		} catch (e) {
			console.warn('Failed to persist liturgical context to storage:', e);
		}
	};

	// Custom set that persists
	const persistentSet = (state: LiturgicalContextState) => {
		set(state);
		persistToStorage(state);
	};

	// Custom update that persists
	const persistentUpdate = (updater: (state: LiturgicalContextState) => LiturgicalContextState) => {
		let newState: LiturgicalContextState;
		update((state) => {
			newState = updater(state);
			return newState;
		});
		persistToStorage(newState!);
	};

	return {
		subscribe,
		set: persistentSet,
		update: persistentUpdate,

		/**
		 * Set the primary subject with optional expiration
		 * @param subject - The subject context
		 * @param options - Optional configuration
		 * @param options.expirationDays - 0=midnight today, 1=midnight tomorrow, 2=midnight day after, etc.
		 * @param options.serviceSlug - Which service this context is for
		 */
		setSubject: (
			subject: SubjectContext,
			options?: { expirationDays?: number; serviceSlug?: string }
		) => {
			persistentUpdate((state) => {
				const expirationDays = options?.expirationDays ?? DEFAULT_EXPIRATION_DAYS;
				return {
					...state,
					subject,
					_metadata: {
						setAt: Date.now(),
						expiresAt: getMidnightExpiration(expirationDays),
						serviceSlug: options?.serviceSlug
					}
				};
			});
		},

		/**
		 * Set the secondary subject (e.g., second person in marriage)
		 */
		setSubject2: (subject2: SubjectContext) => {
			persistentUpdate((state) => ({ ...state, subject2 }));
		},

		/**
		 * Set multiple candidates
		 */
		setCandidates: (candidates: SubjectContext[]) => {
			persistentUpdate((state) => ({ ...state, candidates }));
		},

		/**
		 * Extend expiration by specified days (to midnight)
		 * @param days - 0=midnight today, 1=midnight tomorrow, etc.
		 */
		extendExpiration: (days: number = DEFAULT_EXPIRATION_DAYS) => {
			persistentUpdate((state) => ({
				...state,
				_metadata: {
					...state._metadata,
					expiresAt: getMidnightExpiration(days)
				}
			}));
		},

		/**
		 * Check if context is for a specific service
		 */
		isForService: (serviceSlug: string): boolean => {
			let currentState: LiturgicalContextState;
			subscribe((state) => (currentState = state))();
			return currentState!._metadata?.serviceSlug === serviceSlug;
		},

		/**
		 * Reset context and clear from storage
		 */
		reset: () => {
			persistentSet({});
		},

		/**
		 * Clear expired contexts (called automatically on load, but can be called manually)
		 */
		clearIfExpired: () => {
			persistentUpdate((state) => {
				if (state._metadata?.expiresAt && Date.now() > state._metadata.expiresAt) {
					return {};
				}
				return state;
			});
		}
	};
}

export const liturgicalContext = createLiturgicalContextStore();
