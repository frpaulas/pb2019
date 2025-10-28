<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm48 = getPsalmMeta(48);
</script>

<ShowPsalm ps={47} from={6} />

<PsalmNumber n={psalm48.number} />
<SectionTitle fancy text={psalm48.name} latin_size />
<ShowPsalm ps={48} to={9} />

<PageNumber page={329} text="Day 9: Evening Prayer | Psalm 48 |" />
