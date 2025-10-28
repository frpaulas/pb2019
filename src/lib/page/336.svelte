<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm53 = getPsalmMeta(53);
	const psalm54 = getPsalmMeta(54);
</script>

<SectionTitle text="day 10 : evening prayer" />
<PsalmNumber n={psalm53.number} />
<SectionTitle fancy text={psalm53.name} latin_size />
<ShowPsalm ps={53} />

<PsalmNumber n={psalm54.number} />
<SectionTitle fancy text={psalm54.name} latin_size />
<ShowPsalm ps={53} to={1} />

<PageNumber page={336} text="the psalter" />
