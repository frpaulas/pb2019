<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm148 = getPsalmMeta(148);
</script>

<ShowPsalm ps={147} from={10} />

<PsalmNumber n={psalm148.number} />
<SectionTitle fancy text={psalm148.name} latin_size />
<ShowPsalm ps={148} to={3} />

<PageNumber page={465} text="Day 30: Evening Prayer | Psalm 148 |" />
