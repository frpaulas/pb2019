<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm101 = getPsalmMeta(101);
</script>

<ShowPsalm ps={100} from={3} />

<PsalmNumber n={psalm101.number} />
<SectionTitle fancy text={psalm101.name} latin_size />
<ShowPsalm ps={101} to={11} />

<PageNumber page={399} text="Day 19: Evening Prayer | Psalm 101 |" />
