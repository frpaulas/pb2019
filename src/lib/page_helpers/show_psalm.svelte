<script lang="ts">
	import Psalm from './psalm.svelte';
	import SectionTitle from './section_title.svelte';
	import PageBreakMarker from './page_break_marker.svelte';
	import { psalm, getPsalm } from '$lib/db/psalms';

	interface Props {
		ps: number | string;
		from?: number;
		to?: number;
		fromLine?: number;
		toLine?: number;
		bold?: boolean;
		showTitle?: boolean;
	}

	let {
		ps,
		from = 1,
		to = 999,
		fromLine = 1,
		toLine = 2,
		bold = false,
		showTitle = false
	}: Props = $props();

	// For Psalm 23, track which version to show (Coverdale or KJV)
	let showCoverdale = $state(true);

	// Determine if this is Psalm 23
	let isPsalm23 = $derived(ps === 23 || ps === '23');

	// Determine which psalm key to use
	let psalmKey = $derived.by(() => {
		if (isPsalm23 && !showCoverdale) {
			return '23kjv';
		}
		return ps;
	});

	// Get the psalm data
	let psalmData = $derived.by(() => {
		try {
			return getPsalm(psalmKey);
		} catch (error) {
			console.warn(`Psalm ${psalmKey} not found in database`);
			return null;
		}
	});

	let verses = $derived.by(() => {
		if (!psalmData) return [];

		try {
			// If no 'to' specified, use the last verse number
			const endVerse = to ?? psalmData.verses[psalmData.verses.length - 1].vs;

			// Get verses in range with line selection
			return psalm(psalmKey, from, endVerse, fromLine, toLine);
		} catch (error) {
			// If psalm not found, return empty array (fail silently)
			console.warn(`Psalm ${psalmKey} not found in database`);
			return [];
		}
	});

	function toggleVersion() {
		showCoverdale = !showCoverdale;
	}
</script>

<!-- Show psalm title if requested -->
{#if showTitle && psalmData}
	{#if psalmData.cycle}
		<div class="mb-4 text-center font-bold uppercase">{psalmData.cycle}</div>
	{/if}
	<SectionTitle size="text-2xl">{psalmData.title}</SectionTitle>
	<SectionTitle fancy latin_size>{psalmData.name}</SectionTitle>
{/if}

<!-- Show toggle button for Psalm 23 -->
{#if isPsalm23}
	<div class="mb-4">
		<button
			onclick={toggleVersion}
			class="rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			{showCoverdale ? 'Show KJV Version' : 'Show Coverdale Version'}
		</button>
	</div>
{/if}

{#each verses as verse, i}
	<!-- Show page break marker if this verse has pb metadata -->
	{#if verse.pb}
		<PageBreakMarker page={verse.pb} />
	{/if}

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
