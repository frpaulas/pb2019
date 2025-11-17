<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm41 = getPsalmMeta(41);
</script>

<ShowPsalm ps={40} from={16} />

<SectionTitle>day 8 : evening prayer</SectionTitle>
<PsalmNumber n={psalm41.number} />
<SectionTitle fancy latin_size>{psalm41.name}</SectionTitle>
<ShowPsalm ps={41} to={6} />

<PageNumber page={321} text="Day 8: Evening Prayer | Psalm 41 |" />
