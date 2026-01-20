<script lang="ts">
	import { scriptureModal } from '$lib/stores/scriptureModal';
	import { getPassage, type BiblePassage } from '$lib/db/bible';
	import { onMount } from 'svelte';

	let modalElement: HTMLDivElement;

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

	function close() {
		scriptureModal.close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!$scriptureModal.isOpen) return;

		if (event.key === 'Escape') {
			close();
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
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={handleOverlayClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="scripture-modal-title"
	>
		<div
			class="relative flex max-h-[90vh] w-full max-w-180 flex-col rounded-lg bg-neutral-100 font-serif shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-gray-200 p-4">
				<h2 id="scripture-modal-title" class="text-xl font-semibold text-gray-900">
					{currentReference || 'Scripture Reading'}
				</h2>

				<button
					type="button"
					onclick={close}
					class="flex h-8 w-8 items-center justify-center rounded-full text-2xl font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
					aria-label="Close modal"
				>
					&times;
				</button>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto overscroll-contain scroll-smooth p-6">
				{#if passage}
					<div class="prose prose-lg max-w-none">
						<!-- Render verses with paragraph breaks preserved -->
						{#each passage.verses as verse, i}
							<span class="verse">
								<sup class="mr-1 text-xs text-gray-500">{verse.verse}</sup>{@html formatVerseText(verse.text)}
							</span>
						{/each}
					</div>
				{:else if currentReference}
					<div class="py-8 text-center text-gray-500">
						Unable to load: {currentReference}
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between border-t border-gray-200 bg-neutral-100 p-4">
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
					class="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Close (ESC)
				</button>
			</div>
		</div>
	</div>
{/if}

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
