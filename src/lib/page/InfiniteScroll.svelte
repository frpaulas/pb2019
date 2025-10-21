<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IntentionallyBlank from '$lib/page/intentionally_blank.svelte';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
	import { getNextPage, getPrevPage, sortPages } from '$lib/page_helpers/page_order';
	let currentPageNumber = $page.params.page_number;
	let loadedPages = $state([$page.params.page_number]);

	let isLoading = $state(false);
	let container;
	let touchStartY = 0;
	let touchStartX = 0;
	let lastScrollTop = 0;
	let scrollDirection = 'none';
	let lastLoadTime = 0;
	let scrollTimeout;
	let justLoadedPrev = false; // Flag to prevent immediate re-trigger

	async function loadNextPage() {
		if (isLoading) return;

		const currentPages = $state.snapshot(loadedPages);
		const lastPage = currentPages[currentPages.length - 1];
		const nextPage = getNextPage(lastPage);

		if (!nextPage || currentPages.includes(nextPage)) return;

		isLoading = true;

		// Add the next page to loadedPages
		loadedPages = sortPages([...currentPages, nextPage]);

		// Don't update URL immediately - let IntersectionObserver handle it
		// when a valid page becomes visible

		isLoading = false;
	}

	async function loadPrevPage(scrollToOriginal = false) {
		const currentPages = $state.snapshot(loadedPages);
		const firstPage = currentPages[0];
		const prevPage = getPrevPage(firstPage);
		if (!prevPage || currentPages.includes(prevPage)) return;

		isLoading = true;
		justLoadedPrev = true;

		if (!container) {
			loadedPages = sortPages([prevPage, ...currentPages]);
			isLoading = false;
			return;
		}

		// Store scroll info BEFORE adding new page
		const oldScrollHeight = container.scrollHeight;
		const oldScrollTop = container.scrollTop;

		// Add previous page to the beginning of loadedPages
		loadedPages = sortPages([prevPage, ...currentPages]);

		// Function to adjust scroll position based on added content height
		const adjustScroll = () => {
			if (!container) return;

			const newScrollHeight = container.scrollHeight;
			const heightAdded = newScrollHeight - oldScrollHeight;

			// Adjust scroll position to maintain the same visual content
			if (heightAdded > 0) {
				container.scrollTop = oldScrollTop + heightAdded;
			}
		};

		// Multi-strategy approach to catch DOM updates at different stages
		// Immediate check (sync)
		await Promise.resolve();
		adjustScroll();

		// After microtask queue
		setTimeout(() => {
			adjustScroll();
		}, 0);

		// After next paint
		requestAnimationFrame(() => {
			adjustScroll();
			// Double RAF for safety
			requestAnimationFrame(() => {
				adjustScroll();
			});
		});

		// Final adjustment after async component loading
		setTimeout(() => {
			adjustScroll();
			isLoading = false;
		}, 150);

		// Reset the flag after a delay to allow future loads
		setTimeout(() => {
			justLoadedPrev = false;
		}, 1000);
	}

	function handleScroll() {
		if (!container) return;

		const { scrollTop, scrollHeight, clientHeight } = container;
		const scrollProgress = (scrollTop + clientHeight) / scrollHeight;
		const scrollTopProgress = scrollTop / scrollHeight; // Position from the top

		// Determine scroll direction
		if (scrollTop > lastScrollTop) {
			scrollDirection = 'down';
		} else if (scrollTop < lastScrollTop) {
			scrollDirection = 'up';
		}
		lastScrollTop = scrollTop;

		// Load next page when 80% scrolled down
		if (scrollProgress > 0.8 && !isLoading && scrollDirection === 'down') {
			loadNextPage();
		}

		// Load previous page when scrolling up and the first page is visible or nearly visible
		// Get current snapshot of loadedPages to avoid stale closure
		const currentLoadedPages = $state.snapshot(loadedPages);
		const firstPageElement = container?.querySelector(`[data-page="${currentLoadedPages[0]}"]`);

		if (firstPageElement && scrollDirection === 'up') {
			const firstPageTop = firstPageElement.offsetTop;
			const firstPageBottom = firstPageTop + firstPageElement.offsetHeight;
			const viewportTop = scrollTop;
			const viewportBottom = scrollTop + clientHeight;

			// Trigger when the first page is visible in viewport or we're within 500px of it
			const isFirstPageVisible = viewportBottom > firstPageTop && viewportTop < firstPageBottom;
			const isNearFirstPage = viewportTop < firstPageBottom + 500;

			if ((isFirstPageVisible || isNearFirstPage) && !isLoading && !justLoadedPrev) {
				loadPrevPage(true);
			}
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
			// Preload 2 previous pages on mount to ensure scrollable content
			const currentPages = $state.snapshot(loadedPages);
			const firstPage = currentPages[0];
			const hasPrev = getPrevPage(firstPage);
			const hasPrevPrev = hasPrev ? getPrevPage(hasPrev) : null;

			if (container.scrollTop === 0 && hasPrev) {
				loadPrevPage(true); // Load first previous page

				// Load second previous page after waiting for first to complete
				if (hasPrevPrev) {
					setTimeout(() => {
						justLoadedPrev = false; // Reset the flag to allow second load
						loadPrevPage(true);
					}, 1500);
				}
			}

			// Scroll handler now attached via onscroll in template
			// container.addEventListener('scroll', handleScroll, { passive: true });
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
			const currentPages = $state.snapshot(loadedPages);
			// Only reset loadedPages if this is a true navigation (not from infinite scroll)
			// Check if the new page is adjacent to current loaded pages
			const isAdjacent = currentPages.some((page) => {
				const pageNum = parseInt(page);
				const newPageNum = parseInt(newPage);
				if (!isNaN(pageNum) && !isNaN(newPageNum)) {
					return Math.abs(pageNum - newPageNum) <= 1;
				}
				return false;
			});

			currentPageNumber = newPage;
			if (!currentPages.includes(newPage) && !isAdjacent) {
				// Only reset if it's not an adjacent page (true navigation)
				loadedPages = [newPage];
			} else if (!currentPages.includes(newPage)) {
				// Add to existing pages if adjacent
				const newPageNum = parseInt(newPage);
				if (!isNaN(newPageNum)) {
					const sortedPages = [...currentPages, newPage].sort((a, b) => {
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

<div
	bind:this={container}
	class="h-screen overflow-auto"
	onscroll={(e) => {
		handleScroll();
	}}
>
	{#each loadedPages as pageNum, index (pageNum)}
		<div class="page-container pb-5" data-page={pageNum}>
			{#await import(`../../lib/page/${pageNum}.svelte`) then Component}
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
		contain: layout style paint;
	}

	div[bind\:this] {
		scroll-snap-type: y mandatory;
	}
</style>
