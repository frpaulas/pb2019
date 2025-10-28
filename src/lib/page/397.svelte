<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm98 = getPsalmMeta(98);
</script>

<ShowPsalm ps={97} from={12} />

<SectionTitle text="day 19 : morning prayer" />
<PsalmNumber n={psalm98.number} />
<SectionTitle fancy text={psalm98.name} latin_size />
<ShowPsalm ps={98} to={10} />

<PageNumber page={397} text="Day 19: Evening Prayer | Psalm 98 |" />
