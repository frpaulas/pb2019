<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm52 = getPsalmMeta(52);
</script>

<ShowPsalm ps={51} from={18} />

<PsalmNumber n={psalm52.number} />
<SectionTitle fancy latin_size>{psalm52.name}</SectionTitle>
<ShowPsalm ps={52} />

<PageNumber page={335} text="Day 10: Morning Prayer | Psalm 52 |" />
