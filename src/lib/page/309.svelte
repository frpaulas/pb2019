<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm34 = getPsalmMeta(34);
</script>

<PsalmNumber n={psalm34.number} />
<SectionTitle fancy latin_size>{psalm34.name}</SectionTitle>
<ShowPsalm ps={34} to={14} />

<PageNumber page={309} text="Day 6: Evening Prayer | Psalm 34 |" />
