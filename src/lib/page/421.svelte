<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm113 = getPsalmMeta(113);
	const psalm114 = getPsalmMeta(114);
</script>

<ShowPsalm ps={112} from={10} />

<PsalmNumber n={psalm113.number} />
<SectionTitle fancy latin_size>{psalm113.name}</SectionTitle>
<ShowPsalm ps={113} />

<SectionTitle>day 23 : evening prayer</SectionTitle>
<PsalmNumber n={psalm114.number} />
<SectionTitle fancy latin_size>{psalm114.name}</SectionTitle>
<ShowPsalm ps={114} to={1} />

<PageNumber page={421} text="Day 23: Evening Prayer | Psalm 114 |" />
