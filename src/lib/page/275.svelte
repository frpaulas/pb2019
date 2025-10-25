<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm7 = getPsalmMeta(7);
</script>

<PsalmNumber n={psalm7.number} />
<SectionTitle fancy text={psalm7.name} latin_size />

<ShowPsalm ps={7} to={14} />

<PageNumber page={275} text="Day 1: Morning Prayer | Psalm 7 |" />
