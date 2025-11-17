<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm102 = getPsalmMeta(102);
</script>

<SectionTitle>day 20 : morning prayer</SectionTitle>
<PsalmNumber n={psalm102.number} />
<SectionTitle fancy latin_size>{psalm102.name}</SectionTitle>
<ShowPsalm ps={102} to={13} />

<PageNumber page={400} text="the psalter" />
