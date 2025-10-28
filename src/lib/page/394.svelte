<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm95 = getPsalmMeta(95);
</script>

<ShowPsalm ps={94} from={22} />

<SectionTitle text="day 19 : morning prayer" />
<PsalmNumber n={psalm95.number} />
<SectionTitle fancy text={psalm95.name} latin_size />
<ShowPsalm ps={95} to={10} />

<PageNumber page={394} text="the psalter" />
