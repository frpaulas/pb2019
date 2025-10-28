<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm112 = getPsalmMeta(112);
</script>

<ShowPsalm ps={111} from={7} />

<PsalmNumber n={psalm112.number} />
<SectionTitle fancy text={psalm112.name} latin_size />
<ShowPsalm ps={112} to={9} />

<PageNumber page={420} text="the psalter" />
