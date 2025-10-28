<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm104 = getPsalmMeta(104);
</script>

<ShowPsalm ps={103} from={16} />

<SectionTitle text="day 20 : evening prayer" />
<PsalmNumber n={psalm104.number} />
<SectionTitle fancy text={psalm104.name} latin_size />
<ShowPsalm ps={104} to={4} />

<PageNumber page={403} text="Day 20: Evening Prayer | Psalm 104 |" />
