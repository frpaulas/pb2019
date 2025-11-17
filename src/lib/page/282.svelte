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
<SectionTitle fancy latin_size>{psalm14.name}</SectionTitle>
<ShowPsalm ps={14} />

<SectionTitle>day 3 : Morning Prayer</SectionTitle>
<PsalmNumber n={psalm15.number} />
<SectionTitle fancy latin_size>{psalm15.name}</SectionTitle>
<ShowPsalm ps={15} to={2} />

<PageNumber page={282} text="the psalter" />
