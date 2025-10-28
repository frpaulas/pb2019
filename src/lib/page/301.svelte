<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm28 = getPsalmMeta(28);
</script>

<PsalmNumber n={psalm28.number} />
<SectionTitle fancy text={psalm28.name} latin_size />
<ShowPsalm ps={28} />

<PageNumber page={301} text="Day 5: Evening Prayer | Psalm 28 |" />
