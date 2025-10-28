<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm126 = getPsalmMeta(126);
	const psalm127 = getPsalmMeta(127);
</script>

<SectionTitle text="day 27 : evening prayer" />
<PsalmNumber n={psalm126.number} />
<SectionTitle fancy text={psalm126.name} latin_size />
<ShowPsalm ps={126} />

<PsalmNumber n={psalm127.number} />
<SectionTitle fancy text={psalm127.name} latin_size />
<ShowPsalm ps={127} to={4} />

<PageNumber page={444} text="the psalter" />
