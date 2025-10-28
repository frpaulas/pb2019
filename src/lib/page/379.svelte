<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm84 = getPsalmMeta(84);
</script>

<ShowPsalm ps={83} from={15} />

<PsalmNumber n={psalm84.number} />
<SectionTitle fancy text={psalm84.name} latin_size />
<ShowPsalm ps={84} to={7} />

<PageNumber page={379} text="Day 16: Evening Prayer | Psalm 84 |" />
