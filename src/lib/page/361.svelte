<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm73 = getPsalmMeta(73);
</script>

<SectionTitle>day 14 : evening prayer</SectionTitle>
<PsalmNumber n={psalm73.number} />
<SectionTitle fancy latin_size>{psalm73.name}</SectionTitle>
<ShowPsalm ps={73} to={13} />

<PageNumber page={361} text="Day 14: Evening Prayer | Psalm 73 |" />
