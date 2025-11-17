<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm33 = getPsalmMeta(33);
</script>

<ShowPsalm ps={32} from={8} />

<PsalmNumber n={psalm33.number} />
<SectionTitle fancy latin_size>{psalm33.name}</SectionTitle>
<ShowPsalm ps={33} to={8} />

<PageNumber page={307} text="Day 6: Evening Prayer | Psalm 33 |" />
