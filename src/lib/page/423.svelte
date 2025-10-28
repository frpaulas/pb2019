<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm116 = getPsalmMeta(116);
</script>

<ShowPsalm ps={115} from={7} />

<SectionTitle text="day 24 : morning prayer" />
<PsalmNumber n={psalm116.number} />
<SectionTitle fancy text={psalm116.name} latin_size />
<ShowPsalm ps={116} to={1} />

<PageNumber page={423} text="Day 24: Morning Prayer | Psalm 116 |" />
