/**
 * Store for managing preferences modal state
 */

import { writable } from 'svelte/store';

interface PreferencesModalState {
	isOpen: boolean;
}

const initialState: PreferencesModalState = {
	isOpen: false
};

function createPreferencesModal() {
	const { subscribe, set } = writable<PreferencesModalState>(initialState);

	return {
		subscribe,

		/**
		 * Open the preferences modal
		 */
		open: () => {
			set({ isOpen: true });
		},

		/**
		 * Close the preferences modal
		 */
		close: () => {
			set(initialState);
		}
	};
}

export const preferencesModal = createPreferencesModal();
