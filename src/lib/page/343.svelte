<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm60 = getPsalmMeta(60);
</script>

<ShowPsalm ps={59} from={10} />

<PsalmNumber n={psalm60.number} />
<SectionTitle fancy latin_size>{psalm60.name}</SectionTitle>
<ShowPsalm ps={60} to={3} />

<PageNumber page={343} text="Day 11: Evening Prayer | Psalm 60 |" />
