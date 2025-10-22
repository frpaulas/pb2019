<script>
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IntentionallyBlank from '$lib/page/intentionally_blank.svelte';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
	import { getNextPage, getPrevPage, sortPages } from '$lib/page_helpers/page_order';
	let currentPageNumber = $page.params.page_number;
	let loadedPages = $state([$page.params.page_number]);

	// Initialize the visible page store with the current route page
	currentVisiblePage.set($page.params.page_number);

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
		if (!prevPage || currentPages.includes(prevPage)) {
			return;
		}

		isLoading = true;
		justLoadedPrev = true;

		if (!container) {
			loadedPages = sortPages([prevPage, ...currentPages]);
			isLoading = false;
			return;
		}

		// Preload the component module before adding to DOM to eliminate async render delay
		try {
			await import(`../../lib/page/${prevPage}.svelte`);
		} catch (e) {
			// Component doesn't exist, will show IntentionallyBlank
		}

		// Store scroll info immediately BEFORE we start any blocking
		const oldScrollHeight = container.scrollHeight;
		const oldScrollTop = container.scrollTop;

		// Immediately block all pointer events and user scrolling during adjustment
		const oldPointerEvents = container.style.pointerEvents;
		const oldUserSelect = container.style.userSelect;
		const oldOverflow = container.style.overflow;

		container.style.pointerEvents = 'none';
		container.style.userSelect = 'none';
		container.style.overflow = 'hidden';

		// Immediately lock the scroll position to stop momentum
		container.scrollTop = oldScrollTop;

		// Force layout flush
		void container.offsetHeight;

		// Add previous page to the beginning of loadedPages
		loadedPages = sortPages([prevPage, ...currentPages]);

		// Wait for Svelte to update DOM
		await tick();

		// Very short delay for component to render (minimize scroll blocking)
		await new Promise((resolve) => setTimeout(resolve, 10));

		// Calculate final adjustment needed
		const finalHeight = container.scrollHeight;
		const totalHeightAdded = finalHeight - oldScrollHeight;

		// Apply the adjustment in one go (round to avoid subpixel issues)
		if (totalHeightAdded > 0) {
			container.scrollTop = Math.round(oldScrollTop + totalHeightAdded);
		}

		// Wait one more frame to catch any late layout changes
		await new Promise((resolve) => requestAnimationFrame(resolve));

		const veryFinalHeight = container.scrollHeight;
		if (veryFinalHeight !== finalHeight) {
			const extraHeight = veryFinalHeight - finalHeight;
			container.scrollTop += extraHeight;
		}

		// Restore scrolling and pointer events
		container.style.pointerEvents = oldPointerEvents;
		container.style.userSelect = oldUserSelect;
		container.style.overflow = oldOverflow;

		isLoading = false;

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
			const firstPageTop = firstPageElement.offsetTop + 50;
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

	onMount(async () => {
		if (container) {
			// Only preload previous pages if we're at the top (scrollTop === 0)
			// This means it's a fresh page load, not a navigation from hamburger menu
			if (container.scrollTop === 0) {
				const currentPages = $state.snapshot(loadedPages);
				const firstPage = currentPages[0];
				const hasPrev = getPrevPage(firstPage);
				const hasPrevPrev = hasPrev ? getPrevPage(hasPrev) : null;

				// Load previous pages but don't do any scroll adjustments yet
				// since we're at the initial load position
				if (hasPrev) {
					// Preload components first
					try {
						await import(`../../lib/page/${hasPrev}.svelte`);
						if (hasPrevPrev) {
							await import(`../../lib/page/${hasPrevPrev}.svelte`);
						}
					} catch (e) {
						// Components don't exist
					}

					// Add both pages at once to avoid multiple adjustments
					const pagesToAdd = hasPrevPrev ? [hasPrevPrev, hasPrev] : [hasPrev];
					loadedPages = sortPages([...pagesToAdd, ...currentPages]);

					// Wait for rendering
					await tick();
					await new Promise((resolve) => setTimeout(resolve, 50));

					// Scroll to show the original page with slight offset
					const firstPageElement = container.querySelector(`[data-page="${firstPage}"]`);
					if (firstPageElement) {
						const targetScrollTop = firstPageElement.offsetTop - 50;
						container.scrollTop = targetScrollTop;

						// Set again after delay to override any interference from other components
						await new Promise((resolve) => setTimeout(resolve, 100));
						container.scrollTop = targetScrollTop;
					}
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
							if (pageNum) {
								// Always update the visible page store for the header
								currentVisiblePage.set(pageNum);
								// Also update currentPageNumber so navigation detection works
								currentPageNumber = pageNum;
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

			// Check if navigating to an already loaded but not currently visible page
			const currentVisiblePageValue = $state.snapshot(currentVisiblePage);
			const isNavigatingToLoadedPage =
				currentPages.includes(newPage) && currentVisiblePageValue !== newPage;

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
			if ((!currentPages.includes(newPage) && !isAdjacent) || isNavigatingToLoadedPage) {
				// True navigation - load target page plus one previous for upward scrolling
				const hasPrev = getPrevPage(newPage);
				const pagesToLoad = hasPrev ? [hasPrev, newPage] : [newPage];
				loadedPages = pagesToLoad;

				// Scroll to show the target page at top
				if (container) {
					if (hasPrev) {
						// First, reset scroll to 0 to establish consistent baseline
						container.scrollTop = 0;

						// Wait for DOM to render, then scroll to target page
						tick().then(() => {
							setTimeout(() => {
								const targetPageElement = container?.querySelector(`[data-page="${newPage}"]`);
								if (targetPageElement) {
									// Subtract offset to show page higher on screen
									const targetScroll = targetPageElement.offsetTop - 50;
									container.scrollTop = targetScroll;

									// Double-set to override any interference
									setTimeout(() => {
										container.scrollTop = targetScroll;
									}, 100);
								}
							}, 50);
						});
					} else {
						// No previous page, just scroll to top
						container.scrollTop = 0;
					}
				}
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
		/* Removed scroll-snap-align to prevent snapping */
		contain: layout style paint;
	}

	div[bind\:this] {
		/* Scroll snap completely disabled */
		/* overflow-anchor disabled - we handle scroll positioning manually */
		overflow-anchor: none;
	}
</style>
