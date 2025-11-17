<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm72 = getPsalmMeta(72);
</script>

<ShowPsalm ps={71} from={19} />

<SectionTitle>day 2 : morning prayer</SectionTitle>
<PsalmNumber n={psalm72.number} />
<SectionTitle fancy latin_size>{psalm72.name}</SectionTitle>
<ShowPsalm ps={72} to={7} />

<PageNumber page={359} text="Day 14: Morning Prayer | Psalm 72 |" />
