<script lang="ts">
	import { page } from '$app/stores';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
	import { getPageName } from '$lib/page_helpers/page_name';

	const pageOrder = ['iii', 'iv', 'v', 'vi', 'vii'];

	// Use the current visible page from the store, fallback to page params
	let currentPage = $state($currentVisiblePage || $page.params.page_number || 'iii');

	function getCurrentPage() {
		return currentPage;
	}

	let currentPageName = $derived(getPageName(getCurrentPage()));
	let isLandingPage = $state($page.url.pathname === '/');
	let pageID = $derived(currentPage); // Use currentPage instead of parsing URL

	// Update currentPage when store changes
	$effect(() => {
		if ($currentVisiblePage) {
			currentPage = $currentVisiblePage;
		}
	});

	let roman = $derived(pageOrder.indexOf(currentPage) != -1);

	// if landing page - no <prev>, <next> = 3
	// <home> = index
	// if pageId is a number <prev> = number -1, 0 = vii, <next> = number +1
	// If on landing page, treat as if we're before page iii
	let currentIndex = $derived(isLandingPage ? -1 : pageOrder.indexOf(currentPage));
	function calculatePrevPage() {
		if (roman) {
			return currentIndex > 0 ? pageOrder[currentIndex - 1] : currentIndex === 0 ? 'home' : '';
		} else if (!Number.isNaN(Number(pageID))) {
			return Number(pageID) > 1 ? (Number(pageID) - 1).toString() : 'vii';
		} else {
			return 'iii';
		}
	}

	let prevPage = $derived(calculatePrevPage());

	function calculateNextPage() {
		let page = Number(pageID);
		if (roman) {
			return currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : '1';
		} else if (!Number.isNaN(page)) {
			return page >= 0 ? (page + 1).toString() : 'iii';
		} else {
			return 'iii';
		}
	}
	//
	// let nextPage = $derived(calculateNextPage());
	//	// For landing page, next should go to first page
	//	if (isLandingPage) {
	//		nextPage = $derived(pageOrder[0]); // 'iii'
	//	}
</script>

<footer class="mx-auto mt-0 max-w-180 text-center">
	<!-- Previous Button -->
	<!-- Page Indicator -->
	{#if isLandingPage}
		<span class="text-sm text-gray-500"> Home </span>
	{:else if currentPage}
		<span class="text-sm text-gray-500">
			{currentPageName}
			{currentPage}
		</span>
	{/if}

	<!-- Next Button -->
</footer>
