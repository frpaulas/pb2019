<script lang="ts">
	import { psalmModal, type PsalmReference } from '$lib/stores/psalmModal';
	import { psalm, getPsalm } from '$lib/db/psalms';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import { onMount } from 'svelte';

	let modalElement: HTMLDivElement;

	function close() {
		psalmModal.close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!$psalmModal.isOpen) return;

		if (event.key === 'Escape') {
			close();
		}
	}

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === modalElement) {
			close();
		}
	}

	// Get psalm data for a reference
	function getPsalmData(ref: PsalmReference) {
		try {
			const psalmData = getPsalm(ref.ps);
			const endVerse = ref.to ?? psalmData.verses[psalmData.verses.length - 1].vs;
			const verses = psalm(ref.ps, ref.from ?? 1, endVerse);
			return { psalmData, verses };
		} catch (error) {
			console.warn(`Psalm ${ref.ps} not found`);
			return null;
		}
	}

	// Build modal title from psalms
	let modalTitle = $derived(() => {
		if ($psalmModal.psalms.length === 0) return 'Psalms';
		if ($psalmModal.psalms.length === 1) return $psalmModal.psalms[0].label;
		return $psalmModal.psalms.map((p) => p.label).join(', ');
	});

	onMount(() => {
		const unsubscribe = psalmModal.subscribe((state) => {
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

{#if $psalmModal.isOpen}
	<div
		bind:this={modalElement}
		class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[5em]"
		onclick={handleOverlayClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="psalm-modal-title"
	>
		<div
			class="relative flex max-h-[90vh] w-full max-w-180 flex-col rounded-lg bg-neutral-100 font-serif shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-gray-200 p-4">
				<h2 id="psalm-modal-title" class="text-xl font-semibold text-gray-900">
					{modalTitle()}
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
				{#each $psalmModal.psalms as ref, psalmIndex}
					{@const data = getPsalmData(ref)}
					{#if data}
						<!-- Psalm header -->
						<div class="mb-4">
							<SectionTitle size="text-2xl">{data.psalmData.title}</SectionTitle>
							<SectionTitle fancy latin_size>{data.psalmData.name}</SectionTitle>
						</div>

						<!-- Verses -->
						{#each data.verses as verse, i}
							<!-- Show Latin section title if it changed -->
							{#if verse.latin && (i === 0 || verse.latin !== data.verses[i - 1]?.latin)}
								<div class="mt-4 mb-2 text-center text-sm text-gray-600 italic">
									{verse.latin}
								</div>
							{/if}

							<!-- Show Hebrew section marker if it changed -->
							{#if verse.hebrew && (i === 0 || verse.hebrew !== data.verses[i - 1]?.hebrew)}
								<div class="mt-4 mb-2 text-center font-bold">
									{verse.hebrew}
								</div>
							{/if}

							<!-- Verse with antiphonal structure -->
							<div class="flex">
								<span class="inline-block w-8 flex-shrink-0 text-xs font-normal text-gray-500">
									{verse.vs}
								</span>
								<div class="flex-1">
									{#if verse.ln1}
										<p>
											{verse.ln1}
											<span class="relative -top-1 text-xs">*</span>
										</p>
									{/if}
									{#if verse.ln2}
										<p class="pl-4">{verse.ln2}</p>
									{/if}
								</div>
							</div>
						{/each}

						<!-- Separator between multiple psalms -->
						{#if psalmIndex < $psalmModal.psalms.length - 1}
							<hr class="my-6 border-gray-300" />
						{/if}
					{:else}
						<div class="py-4 text-center text-gray-500">
							Psalm {ref.ps} not found
						</div>
					{/if}
				{/each}
			</div>

			<!-- Footer -->
			<div
				class="flex items-center justify-end rounded-b-lg border-t border-gray-200 bg-neutral-100 p-4"
			>
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
