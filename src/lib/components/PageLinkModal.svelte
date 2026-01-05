<script>
	import { pageLinkModal } from '$lib/stores/pageLinkModal.js';
	import { onMount } from 'svelte';
	import ServicePageRenderer from '$lib/page/ServicePageRenderer.svelte';
	import PsalmPageRenderer from '$lib/page/PsalmPageRenderer.svelte';
	import servicePagesData from '$lib/data/service_pages.json';
	import psalmPagesData from '$lib/data/psalm_pages.json';

	let modalElement;
	let currentPageIndex = $state(0);

	// Generate array of pages to display
	let pages = $derived(() => {
		if (!$pageLinkModal.isOpen || !$pageLinkModal.startPage) return [];

		const start = $pageLinkModal.startPage;
		const end = $pageLinkModal.endPage || start;
		const pageList = [];

		for (let i = start; i <= end; i++) {
			pageList.push(i);
		}

		return pageList;
	});

	let currentPage = $derived(pages()[currentPageIndex] || null);

	// Get page data for current page
	let pageData = $derived(() => {
		if (!currentPage) return null;

		// Try psalm pages first, then service pages
		return psalmPagesData[currentPage] || servicePagesData[currentPage] || null;
	});

	let isPsalmPage = $derived(() => {
		return currentPage && psalmPagesData[currentPage] !== undefined;
	});

	function close() {
		currentPageIndex = 0;
		pageLinkModal.close();
	}

	function handleKeydown(event) {
		if (!$pageLinkModal.isOpen) return;

		if (event.key === 'Escape') {
			close();
		} else if (event.key === 'ArrowLeft' && currentPageIndex > 0) {
			currentPageIndex--;
		} else if (event.key === 'ArrowRight' && currentPageIndex < pages().length - 1) {
			currentPageIndex++;
		}
	}

	function handleOverlayClick(event) {
		if (event.target === modalElement) {
			close();
		}
	}

	function nextPage() {
		if (currentPageIndex < pages().length - 1) {
			currentPageIndex++;
		}
	}

	function prevPage() {
		if (currentPageIndex > 0) {
			currentPageIndex--;
		}
	}

	onMount(() => {
		// Reset page index when modal opens
		const unsubscribe = pageLinkModal.subscribe((state) => {
			if (state.isOpen) {
				currentPageIndex = 0;
			}
		});

		return unsubscribe;
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $pageLinkModal.isOpen}
	<div
		bind:this={modalElement}
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
		onclick={handleOverlayClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div
			class="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="flex items-center justify-between p-4 border-b border-gray-200">
				<div class="flex items-center gap-4">
					<h2 id="modal-title" class="text-xl font-semibold text-gray-900">
						{#if pages().length > 1}
							Page {currentPage} of {pages()[0]}-{pages()[pages().length - 1]}
						{:else}
							Page {currentPage}
						{/if}
					</h2>

					{#if pages().length > 1}
						<div class="flex gap-2">
							<button
								type="button"
								onclick={prevPage}
								disabled={currentPageIndex === 0}
								class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded transition-colors"
								aria-label="Previous page"
							>
								← Prev
							</button>
							<button
								type="button"
								onclick={nextPage}
								disabled={currentPageIndex === pages().length - 1}
								class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded transition-colors"
								aria-label="Next page"
							>
								Next →
							</button>
						</div>
					{/if}
				</div>

				<button
					type="button"
					onclick={close}
					class="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
					aria-label="Close modal"
				>
					×
				</button>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto p-6">
				{#if pageData()}
					{#if isPsalmPage()}
						<PsalmPageRenderer pageData={pageData()} />
					{:else}
						<ServicePageRenderer pageData={pageData()} />
					{/if}
				{:else}
					<div class="text-center text-gray-500 py-8">
						Page {currentPage} not found
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
				{#if $pageLinkModal.returnPage}
					<p class="text-sm text-gray-600">
						Returning to page {$pageLinkModal.returnPage}
					</p>
				{:else}
					<div></div>
				{/if}

				<button
					type="button"
					onclick={close}
					class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Close (ESC)
				</button>
			</div>
		</div>
	</div>
{/if}
