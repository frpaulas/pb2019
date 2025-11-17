<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm125 = getPsalmMeta(125);
</script>

<ShowPsalm ps={124} from={2} />

<PsalmNumber n={psalm125.number} />
<SectionTitle fancy latin_size>{psalm125.name}</SectionTitle>
<ShowPsalm ps={125} />

<PageNumber page={443} text="Day 27: Morning Prayer | Psalm 125 |" />
