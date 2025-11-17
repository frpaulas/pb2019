<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm36 = getPsalmMeta(36);
</script>

<PsalmNumber n={psalm36.number} />
<SectionTitle fancy latin_size>{psalm36.name}</SectionTitle>
<ShowPsalm ps={36} />

<PageNumber page={313} text="Day 7: Morning Prayer | Psalm 36 |" />
