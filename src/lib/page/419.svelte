<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm111 = getPsalmMeta(111);
</script>

<ShowPsalm ps={110} from={2} />

<PsalmNumber n={psalm111.number} />
<SectionTitle fancy text={psalm111.name} latin_size />
<ShowPsalm ps={111} to={6} />

<PageNumber page={419} text="Day 23: Morning Prayer | Psalm 111 |" />
