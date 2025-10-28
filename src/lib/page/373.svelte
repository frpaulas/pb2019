<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm79 = getPsalmMeta(79);
</script>

<ShowPsalm ps={78} from={69} />

<SectionTitle text="day 16 : morning prayer" />
<PsalmNumber n={psalm79.number} />
<SectionTitle fancy text={psalm79.name} latin_size />
<ShowPsalm ps={79} to={5} />

<PageNumber page={373} text="Day 16: Morning Prayer | Psalm 79 |" />
