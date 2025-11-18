<script>
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import VirtualList from 'svelte-virtual-scroll-list';
	import { PAGE_ORDER } from '$lib/page_helpers/page_order';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
	import IntentionallyBlank from '$lib/page_helpers/intentionally_blank.svelte';
	import { deduplicatePageLoads } from '$lib/page_helpers/page_content_map';

	let virtualList;
	let currentPageNumber = $page.params.page_number;

	// Convert PAGE_ORDER array to objects with unique IDs
	const pageItems = PAGE_ORDER.map((pageNum, index) => ({
		id: pageNum,
		pageNumber: pageNum,
		index: index
	}));

	// Find initial scroll position based on route
	const initialIndex = PAGE_ORDER.indexOf($page.params.page_number);

	// Initialize the visible page store
	currentVisiblePage.set($page.params.page_number);

	let observerUpdateTimeout = null;
	let container;

	onMount(() => {
		console.log('[VIRTUAL] Component mounted, initial page:', $page.params.page_number);

		// Scroll to the initial page
		if (virtualList && initialIndex >= 0) {
			tick().then(() => {
				virtualList.scrollToIndex(initialIndex);
			});
		}

		// Use scroll event to track visible page (more reliable with virtual scroll)
		const handleScroll = () => {
			if (!container) return;

			// Find all currently rendered page containers
			const pageContainers = Array.from(container.querySelectorAll('.page-container'));
			if (pageContainers.length === 0) return;

			// Get viewport position
			const containerRect = container.getBoundingClientRect();
			const viewportMiddle = containerRect.top + containerRect.height / 2;

			// Find which page contains the middle of the viewport
			let closestPage = null;
			let closestDistance = Infinity;

			pageContainers.forEach((el) => {
				const rect = el.getBoundingClientRect();
				const elementMiddle = rect.top + rect.height / 2;
				const distance = Math.abs(elementMiddle - viewportMiddle);

				if (distance < closestDistance && rect.height > 0) {
					closestDistance = distance;
					closestPage = el.getAttribute('data-page');
				}
			});

			if (closestPage) {
				currentVisiblePage.set(closestPage);
			}
		};

		// Throttle scroll events
		let scrollTimeout;
		const throttledScroll = () => {
			if (scrollTimeout) return;
			scrollTimeout = setTimeout(() => {
				handleScroll();
				scrollTimeout = null;
			}, 100);
		};

		if (container) {
			container.addEventListener('scroll', throttledScroll, { passive: true });
			// Initial check after mount
			setTimeout(handleScroll, 500);

			return () => {
				container.removeEventListener('scroll', throttledScroll);
			};
		}
	});

	// Watch for route changes
	$effect(() => {
		const newPage = $page.params.page_number;
		const hash = $page.url.hash;

		console.log('[VIRTUAL] Route changed to:', newPage, 'hash:', hash);

		if (newPage && newPage !== currentPageNumber) {
			currentPageNumber = newPage;
			const pageIndex = PAGE_ORDER.indexOf(newPage);

			if (pageIndex >= 0 && virtualList) {
				tick().then(() => {
					virtualList.scrollToIndex(pageIndex);

					// Handle hash anchors
					if (hash) {
						setTimeout(() => {
							const anchorElement = container?.querySelector(hash);
							if (anchorElement) {
								anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
							}
						}, 300);
					}
				});
			}
		}
	});
</script>

<div bind:this={container} class="h-screen">
	<VirtualList
		bind:this={virtualList}
		data={pageItems}
		key="id"
		keeps={10}
		estimateSize={800}
		start={initialIndex >= 0 ? initialIndex : 0}
		let:data
	>
		{#key data.id}
			<div class="page-container" data-page={data.pageNumber}>
				{#await import(`../../lib/page/${data.pageNumber}.svelte`) then Component}
					<Component.default />
				{:catch}
					<IntentionallyBlank pg={data.pageNumber} />
				{/await}
			</div>
		{/key}
	</VirtualList>
</div>

<style>
	.page-container {
		contain: layout style paint;
	}
</style>
