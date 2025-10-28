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
<SectionTitle fancy text={psalm70.name} latin_size />

<ShowPsalm ps={70} />

<SectionTitle text="day 14 : morning prayer" />
<PsalmNumber n={psalm71.number} />
<SectionTitle fancy text={psalm71.name} latin_size />
<ShowPsalm ps={71} to={5} />

<PageNumber page={357} text="Day 14: Morning Prayer | Psalm 71 |" />
