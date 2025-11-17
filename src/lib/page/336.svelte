<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm53 = getPsalmMeta(53);
	const psalm54 = getPsalmMeta(54);
</script>

<SectionTitle>day 10 : evening prayer</SectionTitle>
<PsalmNumber n={psalm53.number} />
<SectionTitle fancy latin_size>{psalm53.name}</SectionTitle>
<ShowPsalm ps={53} />

<PsalmNumber n={psalm54.number} />
<SectionTitle fancy latin_size>{psalm54.name}</SectionTitle>
<ShowPsalm ps={53} to={1} />

<PageNumber page={336} text="the psalter" />
