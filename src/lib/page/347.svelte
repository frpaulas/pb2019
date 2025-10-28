<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm64 = getPsalmMeta(64);
</script>

<ShowPsalm ps={63} from={10} />

<PsalmNumber n={psalm64.number} />
<SectionTitle fancy text={psalm64.name} latin_size />
<ShowPsalm ps={64} />

<PageNumber page={347} text="Day 12: Morning Prayer | Psalm 64 |" />
