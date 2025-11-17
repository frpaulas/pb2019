<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm138 = getPsalmMeta(138);
	const psalm139 = getPsalmMeta(139);
</script>

<PsalmNumber n={psalm138.number} />
<SectionTitle fancy latin_size>{psalm138.name}</SectionTitle>
<ShowPsalm ps={138} />

<SectionTitle>day 29 : morning prayer</SectionTitle>
<PsalmNumber n={psalm139.number} />
<SectionTitle fancy latin_size>{psalm139.name}</SectionTitle>
<ShowPsalm ps={139} to={1} />

<PageNumber page={454} text="the psalter" />
