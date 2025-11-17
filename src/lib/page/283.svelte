<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm16 = getPsalmMeta(16);
</script>

<ShowPsalm ps={15} from={3} />

<PsalmNumber n={psalm16.number} />
<SectionTitle fancy latin_size>{psalm16.name}</SectionTitle>
<ShowPsalm ps={16} to={8} />

<PageNumber page={283} text="Day 3: Morning Prayer | Psalm 16 |" />
