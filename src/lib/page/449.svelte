<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm134 = getPsalmMeta(134);
	const psalm135 = getPsalmMeta(135);
</script>

<ShowPsalm ps={133} from={3} />

<PsalmNumber n={psalm134.number} />
<SectionTitle fancy text={psalm134.name} latin_size />
<ShowPsalm ps={134} />

<PsalmNumber n={psalm135.number} />
<SectionTitle fancy text={psalm135.name} latin_size />
<ShowPsalm ps={135} to={6} />

<PageNumber page={449} text="Day 28: Morning Prayer | Psalm 135 |" />
