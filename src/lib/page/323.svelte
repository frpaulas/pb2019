<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm43 = getPsalmMeta(43);
</script>

<ShowPsalm ps={42} from={7} />

<PsalmNumber n={psalm43.number} />
<SectionTitle fancy text={psalm43.name} latin_size />
<ShowPsalm ps={43} to={2} />

<PageNumber page={423} text="Day 8: Evening Prayer | Psalm 43 |" />
