<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm40 = getPsalmMeta(40);
</script>

<ShowPsalm ps={39} from={6} />

<PsalmNumber n={psalm40.number} />
<SectionTitle fancy latin_size>{psalm40.name}</SectionTitle>
<ShowPsalm ps={40} to={2} />

<PageNumber page={318} text="Day 8: Morning Prayer | Psalm 40 |" />
