<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm93 = getPsalmMeta(93);
	const psalm94 = getPsalmMeta(94);
</script>

<SectionTitle>day 18 : evening prayer</SectionTitle>
<PsalmNumber n={psalm93.name} />
<SectionTitle fancy latin_size>{psalm93.name}</SectionTitle>
<ShowPsalm ps={93} />

<PsalmNumber n={psalm94.number} />
<SectionTitle fancy latin_size>{psalm94.name}</SectionTitle>
<ShowPsalm ps={94} to={5} />

<PageNumber page={392} text="the psalter" />
