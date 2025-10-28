<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm113 = getPsalmMeta(113);
	const psalm114 = getPsalmMeta(114);
</script>

<ShowPsalm ps={112} from={10} />

<PsalmNumber n={psalm113.number} />
<SectionTitle fancy text={psalm113.name} latin_size />
<ShowPsalm ps={113} />

<SectionTitle text="day 23 : evening prayer" />
<PsalmNumber n={psalm114.number} />
<SectionTitle fancy text={psalm114.name} latin_size />
<ShowPsalm ps={114} to={1} />

<PageNumber page={421} text="Day 23: Evening Prayer | Psalm 114 |" />
