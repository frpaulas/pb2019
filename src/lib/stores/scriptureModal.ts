/**
 * Store for managing scripture reading modal state
 */

import { writable } from 'svelte/store';

interface ScriptureModalState {
	isOpen: boolean;
	reference: string | null; // The scripture reference being displayed
	altReference: string | null; // Optional alternate reference
	showingAlt: boolean; // Whether currently showing the alternate
}

const initialState: ScriptureModalState = {
	isOpen: false,
	reference: null,
	altReference: null,
	showingAlt: false
};

function createScriptureModal() {
	const { subscribe, set, update } = writable<ScriptureModalState>(initialState);

	return {
		subscribe,

		/**
		 * Open the modal with a scripture reference
		 * @param reference - The primary scripture reference (e.g., "John 1:1-14")
		 * @param altReference - Optional alternate reference
		 */
		open: (reference: string, altReference: string | null = null) => {
			set({
				isOpen: true,
				reference,
				altReference,
				showingAlt: false
			});
		},

		/**
		 * Toggle between primary and alternate readings
		 */
		toggleAlt: () => {
			update((state) => ({
				...state,
				showingAlt: !state.showingAlt
			}));
		},

		/**
		 * Close the modal
		 */
		close: () => {
			set(initialState);
		}
	};
}

export const scriptureModal = createScriptureModal();
