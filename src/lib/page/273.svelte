<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm5 = getPsalmMeta(5);
</script>

<PsalmNumber n={psalm5.number} />
<SectionTitle fancy>{psalm5.name}</SectionTitle>

<ShowPsalm ps={5} to={12} />

<PageNumber page={273} text="Day 1: Morning Prayer | Psalm 5 |" />
