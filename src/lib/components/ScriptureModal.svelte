<script lang="ts" module>
	/**
	 * Format verse text, converting \n\n to paragraph breaks
	 */
	function formatVerseText(text: string): string {
		// Replace double newlines with paragraph break
		// and escape any HTML
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/\n\n/g, '</p><p class="mt-4">');
	}
</script>

<script lang="ts">
	import { scriptureModal } from '$lib/stores/scriptureModal';
	import { getPassage, parseReference, getAllBooks, type BiblePassage } from '$lib/db/bible';
	import { onMount } from 'svelte';

	let modalElement: HTMLDivElement;
	let contentElement: HTMLDivElement;

	// Get the current reference to display
	let currentReference = $derived(
		$scriptureModal.showingAlt && $scriptureModal.altReference
			? $scriptureModal.altReference
			: $scriptureModal.reference
	);

	// Fetch the passage data
	let passage: BiblePassage | null = $derived(
		currentReference ? getPassage(currentReference) : null
	);

	// Parse current reference to get book and chapter info for navigation
	let parsedRef = $derived(currentReference ? parseReference(currentReference) : null);

	// Get book info for chapter bounds
	const allBooks = getAllBooks();
	const allBooksFlat = [...allBooks.ot, ...allBooks.nt, ...allBooks.apocrypha];

	// Determine if we're viewing a single whole chapter (navigable)
	let currentChapter = $derived.by(() => {
		if (!parsedRef) return null;
		// Only allow navigation for single-chapter references (e.g., "Gen 1", not "Gen 1:1-5")
		if (parsedRef.segments.length !== 1) return null;
		const seg = parsedRef.segments[0];
		// Check if it's a whole chapter (startVerse=1 and endVerse=999 or covers all verses)
		if (seg.startVerse === 1 && seg.endVerse >= 999) {
			return seg.chapter;
		}
		// Also allow if it looks like a whole chapter request
		return seg.chapter;
	});

	let currentBookCode = $derived(parsedRef?.bookCode || null);

	let currentBookInfo = $derived(
		currentBookCode ? allBooksFlat.find((b) => b.code === currentBookCode) : null
	);

	// Navigation availability
	let canGoPrev = $derived(currentChapter !== null && currentChapter > 1);
	let canGoNext = $derived(
		currentChapter !== null && currentBookInfo !== null && currentChapter < currentBookInfo.chapters
	);

	function goToPrevChapter() {
		if (!canGoPrev || !currentBookInfo || !currentChapter) return;
		const newRef = `${currentBookInfo.shortName} ${currentChapter - 1}`;
		scriptureModal.open(newRef, null);
		scrollToTop();
	}

	function goToNextChapter() {
		if (!canGoNext || !currentBookInfo || !currentChapter) return;
		const newRef = `${currentBookInfo.shortName} ${currentChapter + 1}`;
		scriptureModal.open(newRef, null);
		scrollToTop();
	}

	function scrollToTop() {
		// Scroll content area to top after navigation
		setTimeout(() => {
			if (contentElement) {
				contentElement.scrollTop = 0;
			}
		}, 0);
	}

	function close() {
		scriptureModal.close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!$scriptureModal.isOpen) return;

		if (event.key === 'Escape') {
			close();
		} else if (event.key === 'ArrowLeft' && canGoPrev) {
			goToPrevChapter();
		} else if (event.key === 'ArrowRight' && canGoNext) {
			goToNextChapter();
		}
	}

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === modalElement) {
			close();
		}
	}

	onMount(() => {
		const unsubscribe = scriptureModal.subscribe((state) => {
			if (state.isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		});

		return () => {
			unsubscribe();
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $scriptureModal.isOpen}
	<div
		bind:this={modalElement}
		class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[5em]"
		onclick={handleOverlayClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="scripture-modal-title"
	>
		<div
			class="relative flex max-h-[90vh] w-full max-w-180 flex-col rounded-lg bg-neutral-100 font-serif shadow-2xl dark:bg-gray-800"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div
				class="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700"
			>
				<div class="flex items-center gap-2">
					{#if canGoPrev}
						<button
							type="button"
							onclick={goToPrevChapter}
							class="flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
							aria-label="Previous chapter"
						>
							&#8592;
						</button>
					{/if}
					<h2
						id="scripture-modal-title"
						class="text-xl font-semibold text-gray-900 dark:text-gray-100"
					>
						{currentReference || 'Scripture Reading'}
					</h2>
					{#if canGoNext}
						<button
							type="button"
							onclick={goToNextChapter}
							class="flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
							aria-label="Next chapter"
						>
							&#8594;
						</button>
					{/if}
				</div>

				<button
					type="button"
					onclick={close}
					class="flex h-8 w-8 items-center justify-center rounded-full text-2xl font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
					aria-label="Close modal"
				>
					&times;
				</button>
			</div>

			<!-- Content -->
			<div
				bind:this={contentElement}
				class="flex-1 overflow-y-auto overscroll-contain scroll-smooth p-6 dark:text-gray-100"
			>
				{#if passage}
					<div class="prose prose-lg max-w-none dark:prose-invert">
						<!-- Render verses with paragraph breaks preserved -->
						{#each passage.verses as verse, i}
							<span class="verse">
								<sup class="mr-1 text-xs text-gray-500 dark:text-gray-400">{verse.verse}</sup
								>{@html formatVerseText(verse.text)}
							</span>
						{/each}
					</div>
				{:else if currentReference}
					<div class="py-8 text-center text-gray-500 dark:text-gray-400">
						Unable to load: {currentReference}
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div
				class="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-neutral-100 p-4 dark:border-gray-700 dark:bg-gray-800"
			>
				<div>
					{#if $scriptureModal.altReference}
						<button
							type="button"
							onclick={() => scriptureModal.toggleAlt()}
							class="text-blue-600 underline hover:text-blue-800"
						>
							{#if $scriptureModal.showingAlt}
								Show: {$scriptureModal.reference}
							{:else}
								Or {$scriptureModal.altReference}
							{/if}
						</button>
					{/if}
				</div>

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
