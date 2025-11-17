<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm91 = getPsalmMeta(91);
</script>

<ShowPsalm ps={90} from={11} />

<PsalmNumber n={psalm91.number} />
<SectionTitle fancy latin_size>{psalm91.name}</SectionTitle>
<ShowPsalm ps={91} to={6} />

<PageNumber page={389} text="Day 18: Morning Prayer | Psalm 91 |" />
