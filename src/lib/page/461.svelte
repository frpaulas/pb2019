<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm145 = getPsalmMeta(145);
</script>

<ShowPsalm ps={144} from={7} />

<PsalmNumber n={psalm145.number} />
<SectionTitle fancy text={psalm145.name} latin_size />
<ShowPsalm ps={145} to={2} />

<PageNumber page={461} text="Day 30: Morning Prayer | Psalm 145 |" />
