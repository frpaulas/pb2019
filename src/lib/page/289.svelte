<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm19 = getPsalmMeta(19);
</script>

<ShowPsalm ps={18} from={48} />

<SectionTitle text="day 4 : morning prayer" />
<PsalmNumber n={psalm19.number} />
<SectionTitle fancy text={psalm19.name} latin_size />

<ShowPsalm ps={19} to={6} />

<PageNumber page={289} text="Day 4: Morning Prayer | Psalm 19 |" />
