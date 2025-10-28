<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm68 = getPsalmMeta(68);
</script>

<ShowPsalm ps={67} from={4} />

<SectionTitle text="day 13 : morning prayer" />
<PsalmNumber n={psalm68.number} />
<SectionTitle fancy text={psalm68.name} latin_size />
<ShowPsalm ps={68} to={7} />

<PageNumber page={351} text="Day 13: Morning Prayer | Psalm 68 |" />
