<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm9 = getPsalmMeta(9);
</script>

<SectionTitle text="day 2 : morning prayer" />
<PsalmNumber n={psalm9.number} />
<SectionTitle fancy text={psalm9.name} latin_size />

<ShowPsalm ps={9} />

<PageNumber page={275} text="Day 1: Morning Prayer | Psalm 7 |" />
