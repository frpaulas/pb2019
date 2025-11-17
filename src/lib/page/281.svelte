<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm13 = getPsalmMeta(13);
</script>

<ShowPsalm ps={12} from={3} />

<PsalmNumber n={psalm13.number} />
<SectionTitle fancy latin_size>{psalm13.name}</SectionTitle>
<ShowPsalm ps={13} to={6} />

<PageNumber page={281} text="Day 2: Evening Prayer | Psalm 13 |" />
