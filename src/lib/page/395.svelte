<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm96 = getPsalmMeta(96);
</script>

<ShowPsalm ps={95} from={11} />

<PsalmNumber n={psalm96.number} />
<SectionTitle fancy latin_size>{psalm96.name}</SectionTitle>
<ShowPsalm ps={96} to={12} />

<PageNumber page={395} text="Day 19: Morning Prayer | Psalm 96 |" />
