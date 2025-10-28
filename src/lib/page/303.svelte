<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm30 = getPsalmMeta(30);
</script>

<SectionTitle text="day 6 : morning prayer" />
<PsalmNumber n={psalm30.number} />
<SectionTitle fancy text={psalm30.name} latin_size />
<ShowPsalm ps={30} to={13} />

<PageNumber page={303} text="Day 6: Morning Prayer | Psalm 30 |" />
