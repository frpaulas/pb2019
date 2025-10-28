<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm47 = getPsalmMeta(47);
</script>

<ShowPsalm ps={46} from={4} />

<SectionTitle text="day 9 : evening prayer" />
<PsalmNumber n={psalm47.number} />
<SectionTitle fancy text={psalm47.name} latin_size />
<ShowPsalm ps={47} to={5} />

<PageNumber page={328} text="the psalter" />
