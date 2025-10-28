<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm85 = getPsalmMeta(85);
</script>

<ShowPsalm ps={84} from={10} />

<PsalmNumber n={psalm85.number} />
<SectionTitle fancy text={psalm85.name} latin_size />
<ShowPsalm ps={85} to={9} />

<PageNumber page={380} text="the psalter" />
