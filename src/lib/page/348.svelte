<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm65 = getPsalmMeta(65);
</script>

<SectionTitle text="day 12 : evening prayer" />
<PsalmNumber n={psalm65.number} />
<SectionTitle fancy text={psalm65.name} latin_size />
<ShowPsalm ps={65} to={11} />

<PageNumber page={348} text="the psalter" />
