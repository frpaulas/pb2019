<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm128 = getPsalmMeta(128);
	const psalm129 = getPsalmMeta(129);
</script>

<ShowPsalm ps={127} from={5} />

<PsalmNumber n={psalm128.number} />
<SectionTitle fancy text={psalm128.name} latin_size />
<ShowPsalm ps={128} />

<PsalmNumber n={psalm129.number} />
<SectionTitle fancy text={psalm129.name} latin_size />
<ShowPsalm ps={129} to={3} />

<PageNumber page={445} text="Day 27: Evening Prayer | Psalm 129 |" />
