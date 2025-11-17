<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm51 = getPsalmMeta(51);
</script>

<ShowPsalm ps={50} from={13} />

<PsalmNumber n={psalm51.number} />
<SectionTitle fancy latin_size>{psalm51.name}</SectionTitle>
<ShowPsalm ps={51} to={1} />

<PageNumber page={333} text="Day 10: Morning Prayer | Psalm 51 |" />
