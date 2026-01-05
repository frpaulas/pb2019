<script>
	import { pageLinkModal } from '$lib/stores/pageLinkModal.js';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';

	let { page, text, endPage = null } = $props();

	function handleClick(event) {
		event.preventDefault();

		// Parse end page from text if it contains a range (e.g., "27-29")
		let actualEndPage = endPage;
		if (!actualEndPage && text && text.includes('-')) {
			const parts = text.split('-');
			if (parts.length === 2) {
				actualEndPage = parseInt(parts[1]);
			}
		}

		// Get current page for return navigation
		const returnPage = $currentVisiblePage;

		// Open modal with the page reference
		pageLinkModal.open(page, actualEndPage, returnPage);
	}
</script>

<button
	type="button"
	onclick={handleClick}
	class="text-blue-600 hover:text-blue-800 underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
	aria-label={endPage || text.includes('-') ? `View pages ${text}` : `View page ${page}`}
>
	{text || page}
</button>
