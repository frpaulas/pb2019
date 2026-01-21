/**
 * Store for managing psalm modal state
 */

import { writable } from 'svelte/store';

export interface PsalmReference {
	ps: number;
	from?: number;
	to?: number;
	label: string; // Display label like "Psalm 23" or "Psalm 119:33-72"
}

interface PsalmModalState {
	isOpen: boolean;
	psalms: PsalmReference[];
}

const initialState: PsalmModalState = {
	isOpen: false,
	psalms: []
};

function createPsalmModal() {
	const { subscribe, set } = writable<PsalmModalState>(initialState);

	return {
		subscribe,

		/**
		 * Open the modal with one or more psalm references
		 * @param psalms - Array of psalm references to display
		 */
		open: (psalms: PsalmReference[]) => {
			set({
				isOpen: true,
				psalms
			});
		},

		/**
		 * Close the modal
		 */
		close: () => {
			set(initialState);
		}
	};
}

export const psalmModal = createPsalmModal();

/**
 * Parse a psalm reference string like "23", "119:33-72" into a PsalmReference
 */
export function parsePsalmRef(ref: string): PsalmReference {
	// Handle formats: "23", "119:33-72", "78:1-40"
	const match = ref.match(/^(\d+)(?::(\d+)-(\d+))?$/);
	if (match) {
		const ps = parseInt(match[1]);
		if (match[2] && match[3]) {
			const from = parseInt(match[2]);
			const to = parseInt(match[3]);
			return {
				ps,
				from,
				to,
				label: `Psalm ${ps}:${from}-${to}`
			};
		}
		return { ps, label: `Psalm ${ps}` };
	}
	// Fallback: just the psalm number
	const ps = parseInt(ref) || 1;
	return { ps, label: `Psalm ${ps}` };
}
