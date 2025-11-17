<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm21 = getPsalmMeta(21);
</script>

<ShowPsalm ps={20} from={5} />

<PsalmNumber n={psalm21.number} />
<SectionTitle fancy latin_size>{psalm21.name}</SectionTitle>
<ShowPsalm ps={21} to={8} />

<PageNumber page={291} text="Day 4: Morning Prayer | Psalm 21 |" />
