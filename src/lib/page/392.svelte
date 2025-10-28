<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm93 = getPsalmMeta(93);
	const psalm94 = getPsalmMeta(94);
</script>

<SectionTitle text="day 18 : evening prayer" />
<PsalmNumber n={psalm93.name} />
<SectionTitle fancy text={psalm93.name} latin_size />
<ShowPsalm ps={93} />

<PsalmNumber n={psalm94.number} />
<SectionTitle fancy text={psalm94.name} latin_size />
<ShowPsalm ps={94} to={5} />

<PageNumber page={392} text="the psalter" />
