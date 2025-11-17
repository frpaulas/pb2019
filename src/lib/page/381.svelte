<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm86 = getPsalmMeta(86);
</script>

<ShowPsalm ps={85} from={10} />

<SectionTitle>day 17 : morning prayer</SectionTitle>
<PsalmNumber n={psalm86.number} />
<SectionTitle fancy latin_size>{psalm86.name}</SectionTitle>
<ShowPsalm ps={86} to={9} />

<PageNumber page={381} text="Day 17: Morning Prayer | Psalm 86 |" />
