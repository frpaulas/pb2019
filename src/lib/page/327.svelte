<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm46 = getPsalmMeta(46);
</script>

<ShowPsalm ps={45} from={8} />

<PsalmNumber n={psalm46.number} />
<SectionTitle fancy text={psalm46.name} latin_size />
<ShowPsalm ps={46} to={3} />

<PageNumber page={327} text="Day 9: Morning Prayer | Psalm 46 |" />
