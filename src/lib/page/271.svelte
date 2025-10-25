<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm2 = getPsalmMeta(2);
	const psalm3 = getPsalmMeta(3);
</script>

<ShowPsalm ps={2} from={4} to={12} />

<br />
<PsalmNumber n={psalm3.number} />
<SectionTitle fancy text={psalm3.name} latin_size />

<ShowPsalm ps={3} to={4} />

<PageNumber page={271} text="Day 1: Morning Prayer | Psalm 3 |" />
