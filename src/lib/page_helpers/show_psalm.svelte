<script lang="ts">
	import Psalm from './psalm.svelte';
	import SectionTitle from './section_title.svelte';
	import { psalm, getPsalm } from '$lib/db/psalms';

	interface Props {
		ps: number | string;
		from?: number;
		to?: number;
		fromLine?: number;
		toLine?: number;
		bold?: boolean;
	}

	let { ps, from = 1, to = 999, fromLine = 1, toLine = 2, bold = false }: Props = $props();

	// Get the psalm data
	let verses = $derived.by(() => {
		try {
			const psalmData = getPsalm(ps);

			// If no 'to' specified, use the last verse number
			const endVerse = to ?? psalmData.verses[psalmData.verses.length - 1].vs;

			// Get verses in range with line selection
			return psalm(ps, from, endVerse, fromLine, toLine);
		} catch (error) {
			// If psalm not found, return empty array (fail silently)
			console.warn(`Psalm ${ps} not found in database`);
			return [];
		}
	});
</script>

{#each verses as verse, i}
	<!-- Show Latin section title if it changed from previous verse -->
	{#if verse.latin && (i === 0 || verse.latin !== verses[i - 1]?.latin)}
		<SectionTitle fancy text={verse.latin} latin_size />
	{/if}

	<!-- Show Hebrew section marker if it changed from previous verse -->
	{#if verse.hebrew && (i === 0 || verse.hebrew !== verses[i - 1]?.hebrew)}
		<SectionTitle text={verse.hebrew} />
	{/if}

	<Psalm vs={verse.vs.toString()} ln1={verse.ln1} ln2={verse.ln2} {bold} />
{/each}
