<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm58 = getPsalmMeta(58);
</script>

<ShowPsalm ps={57} from={7} />

<PsalmNumber n={psalm58.number} />
<SectionTitle fancy latin_size>{psalm58.name}</SectionTitle>
<ShowPsalm ps={58} to={9} />

<PageNumber page={341} text="Day 11: Morning Prayer | Psalm 58 |" />
