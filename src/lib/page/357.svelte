<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm70 = getPsalmMeta(70);
	const psalm71 = getPsalmMeta(71);
</script>

<PsalmNumber n={psalm70.number} />
<SectionTitle fancy latin_size>{psalm70.name}</SectionTitle>

<ShowPsalm ps={70} />

<SectionTitle>day 14 : morning prayer</SectionTitle>
<PsalmNumber n={psalm71.number} />
<SectionTitle fancy latin_size>{psalm71.name}</SectionTitle>
<ShowPsalm ps={71} to={5} />

<PageNumber page={357} text="Day 14: Morning Prayer | Psalm 71 |" />
