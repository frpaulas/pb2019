<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm1 = getPsalmMeta(1);
	const psalm2 = getPsalmMeta(2);
</script>

<SectionTitle text="day 1 : morning prayer" size="text-base" />
<PsalmNumber n={psalm1.number} />
<SectionTitle fancy text={psalm1.name} latin_size />

<ShowPsalm ps={1} to={7} />

<br />
<PsalmNumber n={psalm2.number} />
<SectionTitle fancy text={psalm2.name} latin_size />

<ShowPsalm ps={2} to={3} />

<PageNumber page={270} text="The Psalter" />
