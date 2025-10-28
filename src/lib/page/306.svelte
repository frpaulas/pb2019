<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm32 = getPsalmMeta(32);
</script>

<SectionTitle text="day 6 : evening prayer" />
<PsalmNumber n={psalm32.number} />
<SectionTitle fancy text={psalm32.name} latin_size />
<ShowPsalm ps={32} to={7} />
<PageNumber page={306} text="the psalter" />
