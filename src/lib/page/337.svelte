<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm55 = getPsalmMeta(55);
</script>

<ShowPsalm ps={54} from={2} />

<PsalmNumber n={psalm55.number} />
<SectionTitle fancy latin_size>{psalm55.name}</SectionTitle>
<ShowPsalm ps={55} to={7} />

<PageNumber page={337} text="Day 10: Evening Prayer | Psalm 55 |" />
