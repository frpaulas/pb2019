<script lang="ts">
	import { season } from '$lib/stores/liturgical';
	import openingSentencesData from '$lib/data/opening_sentences/opening_sentences.json';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';

	interface Props {
		office: 'mp' | 'ep';
	}

	let { office }: Props = $props();

	// Map liturgical seasons to opening sentence keys
	const seasonKeyMap: Record<string, string> = {
		advent: 'advent',
		christmas: 'christmas',
		epiphany: 'epiphany',
		lent: 'lent',
		easter: 'easter',
		ascension: 'ascension',
		pentecost: 'pentecost',
		trinity: 'trinity_sunday',
		proper: 'any_time'
	};

	let currentSeason = $derived($season || 'proper');

	let sentenceKey = $derived(() => {
		const seasonSuffix = seasonKeyMap[currentSeason] || 'any_time';
		return `${office}_${seasonSuffix}`;
	});

	let blocks = $derived(
		(openingSentencesData as Record<string, any[]>)[sentenceKey()] || []
	);
</script>

{#if blocks.length > 0}
	{#each blocks as block}
		{#if block.type === 'section_title'}
			<SectionTitle fancy={block.fancy || false} latin_size={block.latin_size || false}>
				{block.text}
			</SectionTitle>
		{:else if block.type === 'scripture'}
			<Scripture ref={block.ref}>{block.text}</Scripture>
		{:else if block.type === 'rubric'}
			<Rubric>{block.text}</Rubric>
		{:else if block.type === 'line'}
			<Line bold={block.bold || false} indent={block.indent || false} text={block.text} />
		{:else if block.type === 'ref'}
			<Ref text={block.text} />
		{/if}
	{/each}
{/if}
