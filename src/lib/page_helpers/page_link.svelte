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

	// Format display text with "page" or "pages" prefix
	let displayText = $derived(() => {
		const isRange = text?.includes('-') || endPage;
		const prefix = isRange ? 'pages ' : 'page ';
		return prefix + (text || page);
	});
</script>

<button
	type="button"
	onclick={handleClick}
	class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
	aria-label={endPage || text?.includes('-') ? `View pages ${text}` : `View page ${page}`}
>
	{displayText()}
</button>
