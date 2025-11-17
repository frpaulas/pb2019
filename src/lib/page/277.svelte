<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm9 = getPsalmMeta(9);
</script>

<SectionTitle>day 2 : morning prayer</SectionTitle>
<PsalmNumber n={psalm9.number} />
<SectionTitle fancy latin_size>{psalm9.name}</SectionTitle>

<ShowPsalm ps={9} />

<PageNumber page={277} text="Day 2: Morning Prayer | Psalm 7 |" />
