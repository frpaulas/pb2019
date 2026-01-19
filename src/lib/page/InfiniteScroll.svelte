<script>
	import { onMount, tick, untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IntentionallyBlank from '$lib/page_helpers/intentionally_blank.svelte';
	import PsalmPageRenderer from '$lib/page/PsalmPageRenderer.svelte';
	import ServicePageRenderer from '$lib/page/ServicePageRenderer.svelte';
	import StickyPageIndicator from '$lib/page_helpers/sticky_page_indicator.svelte';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
	import { getNextPage, getPrevPage, sortPages } from '$lib/page_helpers/page_order';
	import { deduplicatePageLoads, getContentFile } from '$lib/page_helpers/page_content_map';
	import psalmPagesData from '$lib/data/psalm_pages.json';
	import servicePagesData from '$lib/data/service_pages.json';

	// Map roman numerals to actual page numbers
	const romanToPageNumber = {
		iii: '-4',
		iv: '-3',
		v: '-2',
		vi: '-1',
		vii: '0'
	};

	// Helper function to get actual page number from display page
	function getActualPageNumber(displayPage) {
		return romanToPageNumber[displayPage] || displayPage;
	}

	let currentPageNumber = $derived($page.params.page_number);
	// Track the last page we actually handled/scrolled to (separate from derived value)
	let lastHandledPage = $state($page.params.page_number);
	// For landing page (iii), also load the next page (iv)
	const initialPages = currentPageNumber === 'iii' ? ['iii', 'iv'] : [currentPageNumber];
	let loadedPages = $state(initialPages);

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
	let preventLoadPrev = false; // Flag to prevent loading when navigating from menu
	let isUserScrolling = false; // Track active scrolling
	let isInfiniteScrollActive = false; // Track if we're actively using infinite scroll
	let hasUserScrolled = false; // Track if user has scrolled at all
	let isUpdatingUrlFromScroll = false; // Flag to prevent $effect from triggering during scroll-based URL updates
	let observerUpdateTimeout = null; // Debounce timeout for IntersectionObserver updates

	// DISABLED: Windowing was causing scroll position issues when trimming pages
	// With JSON-based rendering for psalm pages, we don't need windowing anymore
	// The lightweight JSON data doesn't cause performance issues like component mounting did

	async function loadNextPage() {
		if (isLoading) return;

		const currentPages = $state.snapshot(loadedPages);
		const lastPage = currentPages[currentPages.length - 1];
		const nextPage = getNextPage(lastPage);

		if (!nextPage || currentPages.includes(nextPage)) return;

		console.log('[LOAD] Loading next page:', nextPage, 'Current pages:', currentPages);
		isLoading = true;

		const oldScrollTop = container?.scrollTop || 0;
		const oldScrollHeight = container?.scrollHeight || 0;

		// Add the next page to loadedPages
		loadedPages = sortPages([...currentPages, nextPage]);

		// Wait for DOM to update
		await tick();

		// Check if browser reset our scroll position and restore it
		const newScrollTop = container?.scrollTop || 0;
		if (newScrollTop !== oldScrollTop && oldScrollTop > 0) {
			console.log('[LOAD] Restoring scrollTop from', newScrollTop, 'to', oldScrollTop);
			container.scrollTop = oldScrollTop;

			// Multiple restoration attempts to ensure it sticks
			requestAnimationFrame(() => {
				if (container.scrollTop !== oldScrollTop) {
					console.log('[LOAD] Re-restoring scrollTop (frame 1)');
					container.scrollTop = oldScrollTop;
				}
			});

			setTimeout(() => {
				if (container.scrollTop !== oldScrollTop) {
					console.log('[LOAD] Re-restoring scrollTop (timeout 10ms)');
					container.scrollTop = oldScrollTop;
				}
			}, 10);

			setTimeout(() => {
				if (container.scrollTop !== oldScrollTop) {
					console.log('[LOAD] Re-restoring scrollTop (timeout 50ms)');
					container.scrollTop = oldScrollTop;
				}
			}, 50);
		}

		isLoading = false;
	}

	async function loadPrevPage() {
		if (isLoading) return;

		const currentPages = $state.snapshot(loadedPages);
		const firstPage = currentPages[0];
		const prevPage = getPrevPage(firstPage);

		if (!prevPage || currentPages.includes(prevPage)) return;

		console.log('[LOAD] Loading previous page:', prevPage, 'Current pages:', currentPages);
		isLoading = true;
		justLoadedPrev = true;

		// Capture current scroll position and height
		const oldScrollTop = container?.scrollTop || 0;
		const oldScrollHeight = container?.scrollHeight || 0;

		// Add the previous page to loadedPages
		loadedPages = sortPages([prevPage, ...currentPages]);

		// Wait for DOM to update
		await tick();

		// Calculate how much height was added and adjust scroll position
		const newScrollHeight = container?.scrollHeight || 0;
		const heightAdded = newScrollHeight - oldScrollHeight;

		if (heightAdded > 0) {
			// Adjust scroll position to maintain visual position
			const targetScrollTop = oldScrollTop + heightAdded;
			console.log(
				'[LOAD] Adjusting scrollTop by',
				heightAdded,
				'from',
				oldScrollTop,
				'to',
				targetScrollTop
			);
			container.scrollTop = targetScrollTop;

			// Multiple restoration attempts to ensure it sticks
			requestAnimationFrame(() => {
				if (container.scrollTop !== targetScrollTop) {
					console.log('[LOAD] Re-adjusting scrollTop (frame 1)');
					container.scrollTop = targetScrollTop;
				}
			});

			setTimeout(() => {
				if (container.scrollTop !== targetScrollTop) {
					console.log('[LOAD] Re-adjusting scrollTop (timeout 10ms)');
					container.scrollTop = targetScrollTop;
				}
			}, 10);

			setTimeout(() => {
				if (container.scrollTop !== targetScrollTop) {
					console.log('[LOAD] Re-adjusting scrollTop (timeout 50ms)');
					container.scrollTop = targetScrollTop;
				}
			}, 50);
		}

		isLoading = false;

		// Reset the flag after a short delay to allow future loads
		setTimeout(() => {
			justLoadedPrev = false;
		}, 100);
	}

	function handleScroll() {
		if (!container) return;

		// Mark that user has scrolled
		hasUserScrolled = true;

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

		console.log(
			'[SCROLL] Direction:',
			scrollDirection,
			'First page:',
			currentLoadedPages[0],
			'ScrollTop:',
			scrollTop
		);

		// Load previous page when scrolling up near the top
		if (firstPageElement && scrollDirection === 'up' && !preventLoadPrev) {
			const firstPageTop = firstPageElement.offsetTop;
			const firstPageBottom = firstPageTop + firstPageElement.offsetHeight;
			const viewportTop = scrollTop;
			const viewportBottom = scrollTop + clientHeight;

			// Trigger when the first page is visible in viewport
			const isFirstPageVisible = viewportBottom > firstPageTop && viewportTop < firstPageBottom;

			// Trigger when we're within 300px of the first page
			const isNearFirstPage = viewportTop < firstPageBottom + 300;

			if ((isFirstPageVisible || isNearFirstPage) && !isLoading && !justLoadedPrev) {
				console.log('[SCROLL] Triggering loadPrevPage - near top of first page');
				loadPrevPage();
			}
		}
	}

	function handleTouchStart(event) {
		touchStartY = event.touches[0].clientY;
		touchStartX = event.touches[0].clientX;
		isUserScrolling = true;

		// Reset the flag after scrolling settles (500ms of no touch)
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(() => {
			isUserScrolling = false;
		}, 500);
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
		console.log('=== INFINITE SCROLL COMPONENT MOUNTED ===');
		if (container) {
			console.log('[MOUNT] Container found, scrollTop:', container.scrollTop);

			// Intercept ALL scrollTop assignments
			const originalDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');
			let realScrollTop = container.scrollTop;
			Object.defineProperty(container, 'scrollTop', {
				get() {
					return originalDescriptor.get.call(this);
				},
				set(value) {
					if (value === 0 && originalDescriptor.get.call(this) > 100) {
						console.error(
							'[INTERCEPTOR] Something is setting scrollTop to 0! Current:',
							originalDescriptor.get.call(this)
						);
						console.trace();
					}
					originalDescriptor.set.call(this, value);
				},
				configurable: true
			});
			// Detect if this is a navigation from menu (not at top of page)
			const isMenuNavigation = container.scrollTop > 0;

			if (isMenuNavigation) {
				// Prevent auto-loading previous pages for 3 seconds after menu navigation
				preventLoadPrev = true;
				setTimeout(() => {
					preventLoadPrev = false;
				}, 3000);
			}

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

					// Scroll to show the original page at the top (not previous pages)
					const firstPageElement = container.querySelector(`[data-page="${firstPage}"]`);
					if (firstPageElement) {
						// Scroll to show the target page clearly at top
						const targetScrollTop = firstPageElement.offsetTop;
						container.scrollTop = targetScrollTop;

						// Set again after delay to override any interference from other components
						await new Promise((resolve) => setTimeout(resolve, 100));
						container.scrollTop = targetScrollTop;

						// Ensure the visible page store shows the correct initial page
						currentVisiblePage.set(firstPage);
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
			// This tracks both page containers (.page-container) and page break markers (.page-break-marker)
			const observer = new IntersectionObserver(
				(entries) => {
					// Debounce observer updates to prevent rapid firing during DOM changes
					if (observerUpdateTimeout) {
						clearTimeout(observerUpdateTimeout);
					}

					observerUpdateTimeout = setTimeout(() => {
						// Find the most visible element (highest intersection ratio)
						// Priority: page-break-marker > page-container
						let mostVisiblePageBreak = null;
						let mostVisiblePageContainer = null;
						let highestPageBreakRatio = 0;
						let highestPageContainerRatio = 0;

						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								// Check if this is a page break marker (fine-grained tracking)
								const pageBreak = entry.target.getAttribute('data-page-break');
								if (pageBreak && entry.intersectionRatio > highestPageBreakRatio) {
									highestPageBreakRatio = entry.intersectionRatio;
									mostVisiblePageBreak = pageBreak;
								}

								// Check if this is a page container (coarse-grained tracking)
								const pageContainer = entry.target.getAttribute('data-page');
								if (pageContainer && entry.intersectionRatio > highestPageContainerRatio) {
									highestPageContainerRatio = entry.intersectionRatio;
									mostVisiblePageContainer = pageContainer;
								}
							}
						});

						// Prefer page break markers (more precise) over page containers
						// Use page container only if no page break is visible
						const mostVisible = mostVisiblePageBreak || mostVisiblePageContainer;
						const highestRatio = mostVisiblePageBreak
							? highestPageBreakRatio
							: highestPageContainerRatio;

						// Only update if we found a most visible page and it's significantly visible
						if (mostVisible && highestRatio > 0.3) {
							// Only mark infinite scroll as active if user has actually scrolled
							// This prevents the initial page load from triggering infinite scroll mode
							if (hasUserScrolled) {
								isInfiniteScrollActive = true;
							}
							// Always update the visible page store for the header
							currentVisiblePage.set(mostVisible);
							// NOTE: We do NOT update lastHandledPage here during scroll.
							// lastHandledPage tracks what the URL requested, not what's visible.
							// Updating it here would cause the effect to scroll back to the URL page
							// when isUserScrolling becomes false.
						}
					}, 150); // 150ms debounce - wait for DOM to settle
				},
				{
					root: container,
					threshold: [0.0, 0.25, 0.5, 0.75, 1.0], // Multiple thresholds to track visibility ratio
					rootMargin: '0px'
				}
			);

			// Observe all page containers and page break markers
			const observePages = () => {
				// Observe page containers (coarse-grained tracking)
				const pageContainers = container.querySelectorAll('.page-container');
				pageContainers.forEach((pageContainer) => {
					observer.observe(pageContainer);
				});

				// Observe page break markers (fine-grained tracking within content)
				const pageBreakMarkers = container.querySelectorAll('.page-break-marker');
				pageBreakMarkers.forEach((marker) => {
					observer.observe(marker);
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
	// IMPORTANT: Only track $page changes, not scroll state changes
	$effect(() => {
		const newPage = $page.params.page_number;
		const hash = $page.url.hash; // Get the URL hash (e.g., #psalm-77)

		// Read scroll state WITHOUT creating dependencies using untrack
		const scrolling = untrack(() => isUserScrolling);
		const infiniteActive = untrack(() => isInfiniteScrollActive);
		const userScrolled = untrack(() => hasUserScrolled);

		// Skip if user is actively scrolling - don't interrupt their browsing
		if (infiniteActive && scrolling) {
			console.log('[EFFECT] Skipping - user is actively scrolling');
			return;
		}

		console.log('[EFFECT] URL changed to:', newPage, {
			lastHandledPage,
			loadedPages: $state.snapshot(loadedPages),
			hash
		});

		// Handle hash anchor even if we're already on the page
		if (hash && newPage === lastHandledPage && container) {
			tick().then(() => {
				// Function to try scrolling to anchor with retries
				const tryScrollToAnchor = (attempt = 0, maxAttempts = 10) => {
					const anchorElement = container?.querySelector(hash);
					if (anchorElement) {
						// Use getBoundingClientRect to get accurate position relative to viewport
						const anchorRect = anchorElement.getBoundingClientRect();
						const containerRect = container.getBoundingClientRect();

						// Calculate the scroll position: current scroll + distance from container top to anchor
						const targetScroll = container.scrollTop + anchorRect.top - containerRect.top - 50;

						container.scrollTop = targetScroll;

						// Double-set to override any interference
						setTimeout(() => {
							container.scrollTop = targetScroll;
						}, 100);

						// Triple-set for extra persistence
						setTimeout(() => {
							container.scrollTop = targetScroll;
						}, 300);
					} else if (attempt < maxAttempts) {
						// Retry after delay
						setTimeout(() => tryScrollToAnchor(attempt + 1, maxAttempts), 100);
					}
				};

				setTimeout(() => tryScrollToAnchor(), 50);
			});
		}

		if (newPage && newPage !== lastHandledPage) {
			const currentPages = $state.snapshot(loadedPages);

			// Check if the new page is adjacent to current loaded pages
			const isAdjacent = currentPages.some((page) => {
				const pageNum = parseInt(page);
				const newPageNum = parseInt(newPage);
				if (!isNaN(pageNum) && !isNaN(newPageNum)) {
					return Math.abs(pageNum - newPageNum) <= 1;
				}
				return false;
			});

			// If page is already loaded, infinite scroll is active, AND user is scrolling
			// just update tracking. Don't reset or scroll - they're actively browsing.
			if (infiniteActive && currentPages.includes(newPage) && userScrolled && scrolling) {
				lastHandledPage = newPage;
				return;
			}

			lastHandledPage = newPage;

			// If page is already loaded but user navigated via menu (not scrolling),
			// we need to scroll to show that page
			if (currentPages.includes(newPage) && !scrolling && container) {
				console.log('[EFFECT] Page already loaded, scrolling to show it:', newPage);
				tick().then(() => {
					const targetPageElement = container?.querySelector(`[data-page="${newPage}"]`);
					if (targetPageElement) {
						const targetScroll = targetPageElement.offsetTop - 50;
						container.scrollTop = targetScroll;
						// Double-set to override any interference
						setTimeout(() => {
							if (container) container.scrollTop = targetScroll;
						}, 100);
					}
				});
				return;
			}

			if (!currentPages.includes(newPage) && !isAdjacent) {
				console.log('[EFFECT] TRUE NAVIGATION - Resetting pages to:', newPage);
				// True navigation - reset infinite scroll state and load target page
				isInfiniteScrollActive = false;
				hasUserScrolled = false;
				const hasPrev = getPrevPage(newPage);
				const hasNext = getNextPage(newPage);
				// Load prev and target pages first
				let pagesToLoad = [newPage];
				if (hasPrev) pagesToLoad.unshift(hasPrev);
				loadedPages = pagesToLoad;

				// Scroll to show the target page at top, or to hash anchor if present
				if (container) {
					// Wait for DOM to fully render before scrolling
					tick().then(() => {
						setTimeout(() => {
							// Set scroll position to target page
							if (hash) {
								const anchorElement = container?.querySelector(hash);
								if (anchorElement) {
									const targetScroll = anchorElement.offsetTop - 50;
									container.scrollTop = targetScroll;
								}
							} else {
								const targetPageElement = container?.querySelector(`[data-page="${newPage}"]`);
								if (targetPageElement) {
									const targetScroll = targetPageElement.offsetTop - 50;
									container.scrollTop = targetScroll;
								} else if (!hasPrev) {
									container.scrollTop = 0;
								}
							}

							// Now add the next page after scroll is set
							if (hasNext) {
								loadedPages = [...$state.snapshot(loadedPages), hasNext];
							}
						}, 50);
					});
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

<StickyPageIndicator />

<div
	bind:this={container}
	class="scroll-container h-screen overflow-auto"
	data-sveltekit-noscroll
	onscroll={(e) => {
		handleScroll();
	}}
>
	{#each deduplicatePageLoads(loadedPages) as { file, displayPage } (file)}
		{@const actualPage = getActualPageNumber(displayPage)}
		{(() => {
			console.log('[RENDER] Processing page:', {
				file,
				displayPage,
				actualPage,
				hasPsalmData: !!psalmPagesData[actualPage],
				hasServiceData: !!servicePagesData[actualPage],
				psalmKeys: Object.keys(psalmPagesData).slice(0, 5),
				serviceKeys: Object.keys(servicePagesData).slice(0, 10)
			});
			return '';
		})()}
		<div class="page-container" data-page={displayPage}>
			{#if psalmPagesData[actualPage]}
				<!-- Render psalm page from JSON data -->
				<PsalmPageRenderer pageData={psalmPagesData[actualPage]} />
			{:else if servicePagesData[actualPage]}
				<!-- Render service page from JSON data -->
				<ServicePageRenderer pageData={servicePagesData[actualPage]} />
			{:else}
				<!-- Render regular page component -->
				{(() => {
					console.log('[RENDER] Fallback - attempting dynamic import of:', file);
					return '';
				})()}
				{#await import(`../../lib/page/${file}.svelte`) then Component}
					<Component.default />
				{:catch error}
					{(() => {
						console.log('[RENDER] Import failed, showing blank page:', error.message);
						return '';
					})()}
					<IntentionallyBlank pg={displayPage} />
				{/await}
			{/if}
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
		margin-left: 1em;
	}

	.scroll-container {
		/* Scroll snap completely disabled */
		/* overflow-anchor disabled - we handle scroll positioning manually */
		overflow-anchor: none;
	}
</style>
