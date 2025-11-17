<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm50 = getPsalmMeta(50);
</script>

<SectionTitle>day 10 : morning prayer</SectionTitle>
<PsalmNumber n={psalm50.number} />
<SectionTitle fancy latin_size>{psalm50.name}</SectionTitle>
<ShowPsalm ps={50} to={12} />

<PageNumber page={332} text="the psalter" />
