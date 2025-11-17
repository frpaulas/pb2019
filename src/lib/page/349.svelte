<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm66 = getPsalmMeta(66);
</script>

<ShowPsalm ps={65} from={12} />

<PsalmNumber n={psalm66.number} />
<SectionTitle fancy latin_size>{psalm66.name}</SectionTitle>
<ShowPsalm ps={66} to={9} />

<PageNumber page={349} text="Day 12: Evening Prayer | Psalm 66 |" />
