<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm106 = getPsalmMeta(106);
</script>

<ShowPsalm ps={105} from={43} />

<SectionTitle text="day 21 : evening prayer" />
<PsalmNumber n={psalm106.number} />
<SectionTitle fancy text={psalm106.name} latin_size />
<ShowPsalm ps={106} to={10} />

<PageNumber page={409} text="Day 21: Evening Prayer | Psalm 106 |" />
