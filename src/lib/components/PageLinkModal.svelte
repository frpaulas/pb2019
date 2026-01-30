<script>
	import { pageLinkModal } from '$lib/stores/pageLinkModal.js';
	import { onMount } from 'svelte';
	import ServicePageRenderer from '$lib/page/ServicePageRenderer.svelte';
	import PsalmPageRenderer from '$lib/page/PsalmPageRenderer.svelte';
	import servicePagesData from '$lib/data/service_pages.json';
	import psalmPagesData from '$lib/data/psalm_pages.json';

	let modalElement;
	let contentElement;

	// Supplemental canticles are pages 79-88
	const canticleButtons = [
		{ id: 'canticle-1', label: '1' },
		{ id: 'canticle-2', label: '2' },
		{ id: 'canticle-3', label: '3' },
		{ id: 'canticle-4', label: '4' },
		{ id: 'canticle-5', label: '5' },
		{ id: 'canticle-6', label: '6' },
		{ id: 'canticle-7', label: '7' },
		{ id: 'canticle-8', label: '8' },
		{ id: 'canticle-9', label: '9' },
		{ id: 'canticle-10', label: '10' }
	];

	// Check if this is the supplemental canticles page range
	let isSupplementalCanticles = $derived(
		$pageLinkModal.startPage === 79 &&
			($pageLinkModal.endPage === 88 || $pageLinkModal.endPage === 90)
	);

	let selectedCanticle = $state(null);

	function scrollToCanticle(id) {
		const element = document.getElementById(id);
		if (element && contentElement) {
			selectedCanticle = id;
			const elementRect = element.getBoundingClientRect();
			const containerRect = contentElement.getBoundingClientRect();
			// Small offset to show canticle number at top of content area
			const targetScroll = contentElement.scrollTop + elementRect.top - containerRect.top - 16;
			contentElement.scrollTo({ top: targetScroll, behavior: 'smooth' });
		}
	}

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

	// Get page data for a specific page number
	function getPageData(pageNumber) {
		// Try psalm pages first, then service pages
		const data = psalmPagesData[pageNumber] || servicePagesData[pageNumber] || null;

		// For supplemental canticles page 79, filter out the main section title since it's in the modal header
		if (isSupplementalCanticles && pageNumber === 79 && data?.content) {
			return {
				...data,
				content: data.content.filter(
					(block) =>
						!(block.type === 'section_title' && block.text?.includes('supplemental canticles'))
				)
			};
		}

		return data;
	}

	function isPsalmPage(pageNumber) {
		return psalmPagesData[pageNumber] !== undefined;
	}

	function close() {
		pageLinkModal.close();
	}

	function handleKeydown(event) {
		if (!$pageLinkModal.isOpen) return;

		if (event.key === 'Escape') {
			close();
		}
	}

	function handleOverlayClick(event) {
		if (event.target === modalElement) {
			close();
		}
	}

	onMount(() => {
		// Prevent body scroll when modal is open
		const unsubscribe = pageLinkModal.subscribe((state) => {
			if (state.isOpen) {
				// Prevent scrolling on body when modal is open
				document.body.style.overflow = 'hidden';
			} else {
				// Restore scrolling when modal closes
				document.body.style.overflow = '';
			}
		});

		return () => {
			unsubscribe();
			// Cleanup: restore scrolling
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $pageLinkModal.isOpen}
	<div
		bind:this={modalElement}
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
		onclick={handleOverlayClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div
			class="relative flex max-h-[90vh] w-full max-w-180 flex-col rounded-lg bg-neutral-100 font-serif shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="border-b border-gray-200 p-4">
				<div class="flex items-center justify-between">
					<h2 id="modal-title" class="text-xl font-semibold text-gray-900">
						{#if isSupplementalCanticles}
							Supplemental Canticles
						{:else if pages().length > 1}
							Pages {pages()[0]}-{pages()[pages().length - 1]}
						{:else}
							Page {pages()[0]}
						{/if}
					</h2>

					<button
						type="button"
						onclick={close}
						class="flex h-8 w-8 items-center justify-center rounded-full text-2xl font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
						aria-label="Close modal"
					>
						×
					</button>
				</div>
				{#if isSupplementalCanticles}
					<div class="mt-3 flex flex-wrap justify-center gap-2">
						{#each canticleButtons as btn}
							<button
								class="h-10 w-10 rounded text-sm font-medium transition-colors {selectedCanticle ===
								btn.id
									? 'bg-stone-700 text-white'
									: 'bg-stone-200 text-stone-700 hover:bg-stone-500 hover:text-white'}"
								onclick={() => scrollToCanticle(btn.id)}
							>
								{btn.label}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Content - Render all pages in the range -->
			<div
				bind:this={contentElement}
				class="flex-1 overflow-y-auto overscroll-contain scroll-smooth p-6"
			>
				{#each pages() as pageNumber}
					{@const pageData = getPageData(pageNumber)}
					{#if pageData}
						<div class="mb-8">
							{#if isPsalmPage(pageNumber)}
								<PsalmPageRenderer {pageData} />
							{:else}
								<ServicePageRenderer {pageData} />
							{/if}
						</div>
					{:else}
						<div class="mb-8 py-8 text-center text-gray-500">
							Page {pageNumber} not found
						</div>
					{/if}
				{/each}
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between border-t border-gray-200 bg-neutral-100 p-4">
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
					class="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Close (ESC)
				</button>
			</div>
		</div>
	</div>
{/if}
