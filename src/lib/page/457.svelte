<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm141 = getPsalmMeta(141);
</script>

<ShowPsalm ps={140} from={5} />

<SectionTitle>day 29 : evening prayer</SectionTitle>
<PsalmNumber n={psalm141.number} />
<SectionTitle fancy latin_size>{psalm141.name}</SectionTitle>
<ShowPsalm ps={141} to={3} />

<PageNumber page={457} text="Day 29: Evening Prayer | Psalm 141 |" />
