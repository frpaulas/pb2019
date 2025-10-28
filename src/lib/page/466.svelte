<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm149 = getPsalmMeta(149);
</script>

<ShowPsalm ps={148} from={4} />

<PsalmNumber n={psalm149.number} />
<SectionTitle fancy text={psalm149.name} latin_size />
<ShowPsalm ps={149} to={1} />

<PageNumber page={466} text="the psalter" />
