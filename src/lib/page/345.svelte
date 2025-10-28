<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm62 = getPsalmMeta(62);
</script>

<ShowPsalm ps={61} from={5} />

<SectionTitle text="day 12 : morning prayer" />
<PsalmNumber n={psalm62.number} />
<SectionTitle fancy text={psalm62.name} latin_size />
<ShowPsalm ps={62} to={8} />

<PageNumber page={345} text="Day 12: Morning Prayer | Psalm 62 |" />
