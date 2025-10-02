<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IntentionallyBlank from '$lib/page/intentionally_blank.svelte';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
	import { next_page, prev_page } from '$lib/page_helpers/nav_helpers.svelte';
	//const { page, next, prev } = createCurrentPage();
	const pageOrder = ['iii', 'iv', 'v', 'vi', 'vii'];
	let currentPageNumber = $page.params.page_number;
	let loadedPages = $state([$page.params.page_number]);
	$inspect(currentPageNumber, loadedPages);

	let isLoading = $state(false);
	let container;
	let touchStartY = 0;
	let touchStartX = 0;
	let lastScrollTop = 0;
	let scrollDirection = 'none';
	let hasScrolledFromTop = false;
	let lastLoadTime = 0;
	let canLoadPrevious = true;
	let scrollTimeout;
	console.log('Loaded Pages: ', $state.snapshot(loadedPages));
	async function loadNextPage() {
		if (isLoading) return;

		const lastPage = loadedPages[loadedPages.length - 1];
		// const nextPage = getNextPage(lastPage);
		const nextPage = next_page(lastPage);

		if (!nextPage || loadedPages.includes(nextPage)) return;

		isLoading = true;

		// Add the next page to loadedPages
		loadedPages = [...loadedPages, nextPage];

		// Don't update URL immediately - let IntersectionObserver handle it
		// when a valid page becomes visible

		isLoading = false;
	}

	async function loadPrevPage() {
		console.log('loadPrevPage called - trigger source:', new Error().stack);

		// Debounce: prevent loading if called within 500ms of last load
		const now = Date.now();
		if (now - lastLoadTime < 500) {
			console.log('Debounced loadPrevPage call');
			return;
		}

		if (isLoading) return;

		const firstPage = loadedPages[0];
		//const prevPage = getPrevPage(firstPage);
		const prevPage = prev_page(firstPage);
		if (!prevPage || loadedPages.includes(prevPage)) return;

		isLoading = true;
		lastLoadTime = now;

		// Add previous page to the beginning of loadedPages
		loadedPages = [prevPage, ...loadedPages];
		// Don't update URL immediately - let IntersectionObserver handle it
		// when a valid page becomes visible

		isLoading = false;
	}

	function handleScroll() {
		if (!container) return;

		const { scrollTop, scrollHeight, clientHeight } = container;
		const scrollProgress = (scrollTop + clientHeight) / scrollHeight;

		// Track if user has scrolled away from the top
		if (scrollTop > 0) {
			hasScrolledFromTop = true;
		}

		// Reset previous page loading permission when scrolling down
		if (scrollDirection === 'down' && scrollTop > 100) {
			canLoadPrevious = true;
		}

		// Determine scroll direction
		if (scrollTop > lastScrollTop) {
			scrollDirection = 'down';
		} else if (scrollTop < lastScrollTop) {
			scrollDirection = 'up';
		}
		lastScrollTop = scrollTop;

		// Load next page when 80% scrolled down AND scrolling down
		if (scrollProgress > 0.8 && !isLoading && scrollDirection === 'down') {
			loadNextPage();
		}

		// Load previous page with timeout-based debouncing
		if (scrollTop === 0 && !isLoading && (scrollDirection === 'up' || !hasScrolledFromTop)) {
			// Clear any existing timeout
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}

			// Set a timeout to load previous page after scroll stops
			scrollTimeout = setTimeout(() => {
				if (scrollTop === 0 && !isLoading) {
					loadPrevPage();
				}
			}, 150);
		}
	}

	function handleTouchStart(event) {
		touchStartY = event.touches[0].clientY;
		touchStartX = event.touches[0].clientX;
	}

	function handleTouchEnd(event) {
		const touchEndY = event.changedTouches[0].clientY;
		const touchEndX = event.changedTouches[0].clientX;

		const deltaY = touchStartY - touchEndY;
		const deltaX = Math.abs(touchStartX - touchEndX);

		// Vertical swipe up (positive deltaY) with minimal horizontal movement
		if (deltaY > 50 && deltaX < 100) {
			loadNextPage();
		}
		// Vertical swipe down (negative deltaY) with minimal horizontal movement
		// TEMPORARILY DISABLED to prevent cascade loading
		// else if (deltaY < -50 && deltaX < 100) {
		// 	loadPrevPage();
		// }
	}

	onMount(() => {
		if (container) {
			container.addEventListener('scroll', handleScroll, { passive: true });
			container.addEventListener('touchstart', handleTouchStart, { passive: true });
			container.addEventListener('touchend', handleTouchEnd, { passive: true });

			// Handle mouse wheel
			container.addEventListener(
				'wheel',
				(event) => {
					const { scrollTop, scrollHeight, clientHeight } = container;
					if (event.deltaY > 0) {
						// Scrolling down
						if (scrollTop + clientHeight >= scrollHeight - 10) {
							loadNextPage();
						}
					} else if (event.deltaY < 0) {
						// Scrolling up - let regular scroll handler deal with it
						// Don't trigger additional logic here
					}
				},
				{ passive: true }
			);

			// Intersection observer to track which page is currently visible
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const pageNum = entry.target.getAttribute('data-page');
							if (pageNum && pageNum !== currentPageNumber) {
								currentVisiblePage.set(pageNum);
								// Only update URL if we're not loading and the page actually exists
								// Check if this is an intentionally blank page by looking for the component
								const pageContainer = entry.target;
								const hasIntentionallyBlank = pageContainer.querySelector(
									'[data-intentionally-blank]'
								);

								// Disable URL updates to prevent $effect from resetting loadedPages
								// if (!isLoading && !hasIntentionallyBlank) {
								// 	const newUrl = `/pg/${pageNum}`;
								// 	window.history.replaceState({}, '', newUrl);
								// 	currentPageNumber = pageNum;
								// }
							}
						}
					});
				},
				{
					root: container,
					threshold: 0.7, // Increase threshold to be more conservative
					rootMargin: '0px'
				}
			);

			// Observe all page containers
			const observePages = () => {
				const pageContainers = container.querySelectorAll('.page-container');
				pageContainers.forEach((pageContainer) => {
					observer.observe(pageContainer);
				});
			};

			// Initial observation
			observePages();

			// Re-observe when new pages are added
			const mutationObserver = new MutationObserver(() => {
				observePages();
			});

			mutationObserver.observe(container, {
				childList: true,
				subtree: true
			});

			return () => {
				container.removeEventListener('scroll', handleScroll);
				container.removeEventListener('touchstart', handleTouchStart);
				container.removeEventListener('touchend', handleTouchEnd);
				observer.disconnect();
				mutationObserver.disconnect();
			};
		}
	});

	// Watch for page parameter changes from navigation
	$effect(() => {
		const newPage = $page.params.page_number;
		if (newPage && newPage !== currentPageNumber) {
			// Only reset loadedPages if this is a true navigation (not from infinite scroll)
			// Check if the new page is adjacent to current loaded pages
			const isAdjacent = loadedPages.some((page) => {
				const pageNum = parseInt(page);
				const newPageNum = parseInt(newPage);
				if (!isNaN(pageNum) && !isNaN(newPageNum)) {
					return Math.abs(pageNum - newPageNum) <= 1;
				}
				return false;
			});

			currentPageNumber = newPage;
			if (!loadedPages.includes(newPage) && !isAdjacent) {
				// Only reset if it's not an adjacent page (true navigation)
				loadedPages = [newPage];
			} else if (!loadedPages.includes(newPage)) {
				// Add to existing pages if adjacent
				const newPageNum = parseInt(newPage);
				if (!isNaN(newPageNum)) {
					const sortedPages = [...loadedPages, newPage].sort((a, b) => {
						const aNum = parseInt(a);
						const bNum = parseInt(b);
						if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
						return a.localeCompare(b);
					});
					loadedPages = sortedPages;
				}
			}
		}
	});
</script>

<div bind:this={container} class="h-screen overflow-auto">
	{#each loadedPages as pageNum, index}
		<div class="page-container pb-5" data-page={pageNum}>
			{#await import(`../../lib/page/${pageNum}.svelte`)}
				<div class="flex h-screen items-center justify-center">
					<div class="text-lg">Loading page {pageNum}...</div>
				</div>
			{:then Component}
				<Component.default />
			{:catch}
				<IntentionallyBlank pg={pageNum} />
			{/await}
		</div>
	{/each}

	{#if isLoading}
		<div class="flex items-center justify-center py-8">
			<div class="text-lg">Loading next page...</div>
		</div>
	{/if}
</div>

<style>
	.page-container {
		scroll-snap-align: start;
	}

	div[bind\:this] {
		scroll-snap-type: y mandatory;
	}
</style>
