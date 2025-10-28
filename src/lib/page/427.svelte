<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm119 = getPsalmMeta(119);
</script>

<ShowPsalm ps={118} from={24} />

<SectionTitle text="day 24 : evening prayer" />
<PsalmNumber n={psalm119.number} />
<SectionTitle fancy text={psalm119.name} latin_size />
<SectionTitle fancy text={psalm119.hebrew} latin_size hebrew />
<ShowPsalm ps={119} to={8} />

<PageNumber page={427} text="Day 24: Evening Prayer | Psalm 119 |" />
