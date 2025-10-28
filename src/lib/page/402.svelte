<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm103 = getPsalmMeta(103);
</script>

<PsalmNumber n={psalm103.number} />
<SectionTitle fancy text={psalm103.name} latin_size />
<ShowPsalm ps={103} to={15} />

<PageNumber page={402} text="the psalter" />
