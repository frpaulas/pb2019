<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm56 = getPsalmMeta(56);
</script>

<ShowPsalm ps={55} from={22} />

<SectionTitle>day 11 : morning prayer</SectionTitle>
<PsalmNumber n={psalm56.number} />
<SectionTitle fancy latin_size>{psalm56.name}</SectionTitle>
<ShowPsalm ps={56} to={6} />

<PageNumber page={339} text="Day 11: Morning Prayer | Psalm 56 |" />
