<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm69 = getPsalmMeta(69);
</script>

<ShowPsalm ps={68} from={35} />

<SectionTitle text="day 13 : evening prayer" />
<PsalmNumber n={psalm69.number} />
<SectionTitle fancy text={psalm69.name} latin_size />
<ShowPsalm ps={69} to={8} />

<PageNumber page={354} text="the psalter" />
