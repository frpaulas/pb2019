<script lang="ts">
	import Psalm from './psalm.svelte';
	import SectionTitle from './section_title.svelte';
	import { getVerse, type Verse } from '$lib/db/psalms';

	interface Props {
		ps: number | string;
		verses: number[];
		bold?: boolean;
	}

	let { ps, verses: verseNumbers, bold = false }: Props = $props();

	// Get the verses data
	let verses = $derived.by(() => {
		try {
			const verseList: Verse[] = [];

			// Fetch each verse individually
			for (const verseNum of verseNumbers) {
				try {
					const verse = getVerse(ps, verseNum);
					verseList.push(verse);
				} catch (error) {
					// If specific verse not found, skip it
					console.warn(`Psalm ${ps}:${verseNum} not found in database`);
				}
			}

			return verseList;
		} catch (error) {
			// If psalm not found, return empty array (fail silently)
			console.warn(`Psalm ${ps} not found in database`);
			return [];
		}
	});

	// Track previous Latin and Hebrew sections to detect changes
	let prevLatin = $state('');
	let prevHebrew = $state('');
</script>

{#each verses as verse, i}
	<!-- Show Latin section title if it changed -->
	{#if verse.latin && verse.latin !== prevLatin}
		{@const _ = prevLatin = verse.latin}
		<SectionTitle fancy text={verse.latin} latin_size />
	{/if}

	<!-- Show Hebrew section marker if it changed -->
	{#if verse.hebrew && verse.hebrew !== prevHebrew}
		{@const _ = prevHebrew = verse.hebrew}
		<SectionTitle text={verse.hebrew} />
	{/if}

	{#if i === verses.length - 1 && verses.length > 0}
		<!-- Last verse - add reference inline -->
		<div class="flex">
			<span class="inline-block w-8 flex-shrink-0 text-xs font-normal">{verse.vs.toString()}</span>
			<div class="flex-1">
				<p>
					{verse.ln1}
					<span class="relative -top-1 text-xs">*</span>
				</p>
				<p class="pl-4">
					{verse.ln2}
					<span class="float-right text-xs">PSALM {ps}:{verseNumbers.join(',')}</span>
				</p>
			</div>
		</div>
	{:else}
		<Psalm vs={verse.vs.toString()} ln1={verse.ln1} ln2={verse.ln2} />
	{/if}
{/each}
