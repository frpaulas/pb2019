<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm102 = getPsalmMeta(102);
</script>

<SectionTitle text="day 20 : morning prayer" />
<PsalmNumber n={psalm102.number} />
<SectionTitle fancy text={psalm102.name} latin_size />
<ShowPsalm ps={102} to={13} />

<PageNumber page={400} text="the psalter" />
