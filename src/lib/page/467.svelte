<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm150 = getPsalmMeta(150);
</script>

<ShowPsalm ps={149} from={2} />

<PsalmNumber n={psalm150.number} />
<SectionTitle fancy latin_size>{psalm150.name}</SectionTitle>
<ShowPsalm ps={150} />

<PageNumber page={335} text="Day 30: Evening Prayer | Psalm 150 |" />
