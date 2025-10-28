<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm136 = getPsalmMeta(136);
</script>

<SectionTitle text="day 28 : evening prayer" />
<PsalmNumber n={psalm136.number} />
<SectionTitle fancy text={psalm136.name} latin_size />
<ShowPsalm ps={136} to={14} />

<PageNumber page={451} text="Day 28: Evening Prayer | Psalm 136 |" />
