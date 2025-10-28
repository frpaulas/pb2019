<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm27 = getPsalmMeta(27);
</script>

<ShowPsalm ps={26} from={7} />

<SectionTitle text="day 5 : evening prayer" />
<PsalmNumber n={psalm27.number} />
<SectionTitle fancy text={psalm27.name} latin_size />
<ShowPsalm ps={27} to={5} />

<PageNumber page={299} text="Day 5: Evening Prayer | Psalm 27 |" />
