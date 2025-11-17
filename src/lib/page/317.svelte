<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm38 = getPsalmMeta(38);
</script>

<SectionTitle>day 8 : morning prayer</SectionTitle>
<PsalmNumber n={psalm38.number} />
<SectionTitle fancy latin_size>{psalm38.name}</SectionTitle>

<ShowPsalm ps={38} to={14} />

<PageNumber page={317} text="Day 8: Morning Prayer | Psalm 38 |" />
