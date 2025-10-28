<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm74 = getPsalmMeta(74);
</script>

<PsalmNumber n={psalm74.number} />
<SectionTitle fancy text={psalm74.name} latin_size />
<ShowPsalm ps={74} to={12} />

<PageNumber page={363} text="Day 14: Evening Prayer | Psalm 74 |" />
