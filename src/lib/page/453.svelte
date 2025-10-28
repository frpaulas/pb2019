<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm137 = getPsalmMeta(137);
</script>

<PsalmNumber n={psalm137.number} />
<SectionTitle fancy text={psalm137.name} latin_size />
<ShowPsalm ps={137} />

<PageNumber page={453} text="Day 28: Evening Prayer | Psalm 137 |" />
