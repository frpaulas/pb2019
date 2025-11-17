<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm24 = getPsalmMeta(24);
</script>

<SectionTitle>day 5 : morning prayer</SectionTitle>
<PsalmNumber n={psalm24.number} />
<SectionTitle fancy latin_size>{psalm24.name}</SectionTitle>
<ShowPsalm ps={24} to={10} />

<PageNumber page={296} text="the psalter" />
