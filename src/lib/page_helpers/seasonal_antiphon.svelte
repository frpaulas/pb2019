<script lang="ts">
	import { season } from '$lib/stores/liturgical';
	import antiphonsData from '$lib/data/antiphon/antiphons.json';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';

	// Map liturgical seasons to antiphon keys
	const seasonKeyMap: Record<string, string> = {
		advent: 'advent',
		christmas: 'christmas',
		epiphany: 'epiphany',
		lent: 'lent',
		easter: 'easter',
		ascension: 'ascension',
		pentecost: 'pentecost',
		trinity: 'trinity',
		proper: 'advent' // fallback
	};

	let currentSeason = $derived($season || 'proper');

	let antiphonKey = $derived(() => {
		return seasonKeyMap[currentSeason] || 'advent';
	});

	let blocks = $derived((antiphonsData as Record<string, any[]>)[antiphonKey()] || []);
</script>

{#if blocks.length > 0}
	{#each blocks as block}
		{#if block.type === 'section_title'}
			<p class="seasonal-title">{block.text}</p>
		{:else if block.type === 'line'}
			<Line bold={block.bold || false} indent={block.indent || false} text={block.text} />
		{:else if block.type === 'rubric'}
			<Rubric>{block.text}</Rubric>
		{:else if block.type === 'ref'}
			<Ref text={block.text} />
		{/if}
	{/each}
{/if}

<style>
	.seasonal-title {
		color: rgb(127 29 29); /* text-red-900 */
		font-style: italic;
		text-align: left;
		text-transform: capitalize;
		margin-top: 1rem;
	}
</style>
