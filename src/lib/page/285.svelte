<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm18 = getPsalmMeta(18);
</script>

<ShowPsalm ps={17} from={9} />

<SectionTitle text="day 3 : evening prayer" />
<PsalmNumber n={psalm18.number} />
<SectionTitle fancy text={psalm18.name} latin_size />

<ShowPsalm ps={18} to={4} />

<PageNumber page={285} text="Day 3: Morning Prayer | Psalm 18 |" />
