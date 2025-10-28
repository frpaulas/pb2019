<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm83 = getPsalmMeta(83);
</script>

<PsalmNumber n={psalm83.number} />
<SectionTitle fancy text={psalm83.name} latin_size />
<ShowPsalm ps={83} to={14} />

<PageNumber page={378} text="the psalter" />
