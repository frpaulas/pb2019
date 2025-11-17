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
<SectionTitle fancy latin_size>{psalm11.name}</SectionTitle>
<ShowPsalm ps={11} />

<SectionTitle>day 2 : morning prayer</SectionTitle>
<PsalmNumber n={psalm12.number} />
<SectionTitle fancy latin_size>{psalm12.name}</SectionTitle>
<ShowPsalm ps={12} to={2} />

<PageNumber page={280} text="the psalter" />
