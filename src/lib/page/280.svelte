<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm11 = getPsalmMeta(11);
	const psalm12 = getPsalmMeta(12);
</script>

<PsalmNumber n={psalm11.number} />
<SectionTitle fancy text={psalm11.name} latin_size />
<ShowPsalm ps={11} />

<SectionTitle text="day 2 : morning prayer" />
<PsalmNumber n={psalm12.number} />
<SectionTitle fancy text={psalm12.name} latin_size />
<ShowPsalm ps={12} to={2} />

<PageNumber page={280} text="the psalter" />
