import { writable } from 'svelte/store';

/**
 * Store for managing the page link modal state
 *
 * State structure:
 * {
 *   isOpen: boolean,
 *   startPage: number,
 *   endPage: number | null,
 *   returnPage: number,
 *   returnScrollPosition: number
 * }
 */
function createPageLinkModalStore() {
	const { subscribe, set, update } = writable({
		isOpen: false,
		startPage: null,
		endPage: null,
		returnPage: null,
		returnScrollPosition: 0
	});

	return {
		subscribe,
		/**
		 * Open the modal to display a page or page range
		 * @param {number} page - The starting page number
		 * @param {number|null} endPage - Optional ending page for a range
		 * @param {number} returnPage - The current page to return to
		 */
		open: (page, endPage = null, returnPage = null) => {
			// Save current scroll position
			const scrollPosition = window.scrollY || document.documentElement.scrollTop;

			set({
				isOpen: true,
				startPage: page,
				endPage: endPage,
				returnPage: returnPage,
				returnScrollPosition: scrollPosition
			});
		},
		/**
		 * Close the modal and optionally restore scroll position
		 */
		close: () => {
			update(state => {
				// Restore scroll position if we have a return page
				if (state.returnScrollPosition !== null) {
					setTimeout(() => {
						window.scrollTo(0, state.returnScrollPosition);
					}, 0);
				}

				return {
					isOpen: false,
					startPage: null,
					endPage: null,
					returnPage: null,
					returnScrollPosition: 0
				};
			});
		},
		/**
		 * Reset the store
		 */
		reset: () => {
			set({
				isOpen: false,
				startPage: null,
				endPage: null,
				returnPage: null,
				returnScrollPosition: 0
			});
		}
	};
}

export const pageLinkModal = createPageLinkModalStore();
