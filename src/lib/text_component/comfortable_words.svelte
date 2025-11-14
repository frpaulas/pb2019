<script lang="ts">
	import Line from '$lib/page_helpers/line.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';

	let { from = 1, to = 99 } = $props();

	const lines: { id: number; s: string; r: string; t: boolean }[] = [
		{
			id: 1,
			s: 'Come to me, all who labor and are heavy laden, and I will give you rest.',
			r: 'matthew 11:28',
			t: false
		},
		{
			id: 2,
			s: 'God so loved the world, that he gave his only-begotten Son, that whoever believes in him should not perish but have eternal life.',
			r: 'john 3:16',
			t: true
		},
		{
			id: 3,
			s: 'The saying is trustworthy and deserving of full acceptance, that Christ Jesus came into the world to save sinners.',
			r: '1 timothy 1:15',
			t: false
		},
		{
			id: 4,
			s: 'If anyone sins, we have an advocate with the Father, Jesus Christ the righteous. He is the propitiation for our sins, and not for ours only, but also for the sins of the whole world.',
			r: '1 john 2:1-2',
			t: true
		}
	];
</script>

{#if from === 1}
	<SectionTitle text="the comfortable words" />
	<Rubric text="The Celebrant may then say one or more of the following sentences, first saying" />
	<Line text="Hear the Word of God to all who truly turn to him." />
{/if}

{#each lines as ln (ln.id)}
	{#if ln.id >= from && ln.id <= to}
		{#if ln.t}
			<Scripture text={ln.s} ref={ln.r} t />
		{:else}
			<Scripture text={ln.s} ref={ln.r} />
		{/if}
	{/if}
{/each}
