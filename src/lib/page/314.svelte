<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm37 = getPsalmMeta(37);
</script>

<SectionTitle text="day 7 : evening prayer" />
<PsalmNumber n={psalm37.number} />
<SectionTitle fancy text={psalm37.name} latin_size />
<ShowPsalm ps={37} to={13} />

<PageNumber page={314} text="the psalter" />
