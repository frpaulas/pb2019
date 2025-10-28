<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm130 = getPsalmMeta(130);
</script>

<ShowPsalm ps={129} from={4} />

<PsalmNumber n={psalm130.number} />
<SectionTitle fancy text={psalm130.name} latin_size />
<ShowPsalm ps={130} to={8} />

<PageNumber page={446} text="the psalter" />
