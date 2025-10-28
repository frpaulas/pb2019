<script lang="ts">
	import Psalm from './psalm.svelte';
	import SectionTitle from './section_title.svelte';
	import { psalm, getPsalm } from '$lib/db/psalms';

	interface Props {
		ps: number | string;
		from?: number;
		to?: number;
	}

	let { ps, from = 1, to = 999 }: Props = $props();

	// Get the psalm data
	let verses = $derived.by(() => {
		try {
			const psalmData = getPsalm(ps);

			// If no 'to' specified, use the last verse number
			const endVerse = to ?? psalmData.verses[psalmData.verses.length - 1].vs;

			// Get verses in range, but don't throw error if 'to' exceeds actual verses
			// Just return all available verses up to the requested range
			return psalm(ps, from, endVerse);
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

{#each verses as verse}
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

	<Psalm vs={verse.vs.toString()} ln1={verse.ln1} ln2={verse.ln2} />
{/each}
