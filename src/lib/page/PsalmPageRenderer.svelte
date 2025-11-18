<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	let { pageData } = $props();
</script>

{#if pageData.dayHeader}
	<SectionTitle size="text-base">{pageData.dayHeader}</SectionTitle>
{/if}

{#each pageData.psalms as psalmData, index}
	{#if index > 0}
		<br />
	{/if}

	{@const psalmMeta = getPsalmMeta(psalmData.number)}

	<PsalmNumber n={psalmMeta.number} />
	<SectionTitle fancy latin_size>{psalmMeta.name}</SectionTitle>

	<ShowPsalm
		ps={psalmData.number}
		{...psalmData.from !== null ? { from: psalmData.from } : {}}
		{...psalmData.to !== null ? { to: psalmData.to } : {}}
	/>
{/each}

<PageNumber page={pageData.pageNumber} text={pageData.headerText} />
