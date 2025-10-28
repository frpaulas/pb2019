<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm23 = getPsalmMeta(23);
</script>

SectionTitle text="day 2 : morning prayer" />
<PsalmNumber n={psalm23.number} />
<SectionTitle fancy text={psalm23.name} latin_size />
<ShowPsalm ps={23} />

<PageNumber page={295} text="Day 4: Evening Prayer | Psalm 7 |" />
