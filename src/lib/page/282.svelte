<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm14 = getPsalmMeta(14);
	const psalm15 = getPsalm(15);
</script>

<PsalmNumber n={psalm14.number} />
<SectionTitle fancy text={psalm14.name} latin_size />
<ShowPsalm ps={14} />

<SectionTitle text="day 3 : Morning Prayer" />
<PsalmNumber n={psalm15.number} />
<SectionTitle fancy text={psalm15.name} latin_size />
<ShowPsalm ps={15} to={2} />

<PageNumber page={282} text="the psalter" />
