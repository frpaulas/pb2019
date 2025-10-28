<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm82 = getPsalmMeta(82);
</script>

<ShowPsalm ps={81} from={12} />

<SectionTitle text="day 16 : evening prayer" />
<PsalmNumber n={psalm82.number} />
<SectionTitle fancy text={psalm82.name} latin_size />
<ShowPsalm ps={82} />

<PageNumber page={377} text="Day 10: Morning Prayer | Psalm 82 |" />
