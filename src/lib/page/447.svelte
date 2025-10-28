<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm131 = getPsalmMeta(131);
	const psalm132 = getPsalmMeta(132);
</script>

<PsalmNumber n={psalm131.number} />
<SectionTitle fancy text={psalm131.name} latin_size />
<ShowPsalm ps={131} />

<SectionTitle text="day 28 : morning prayer" />
<PsalmNumber n={psalm132.number} />
<SectionTitle fancy text={psalm132.name} latin_size />
<ShowPsalm ps={132} to={8} />

<PageNumber page={447} text="Day 28: Morning Prayer | Psalm 132 |" />
