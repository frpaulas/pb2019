<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm107 = getPsalmMeta(107);
</script>

<ShowPsalm ps={106} from={40} />

<SectionTitle>day 22 : morning prayer</SectionTitle>
<PsalmNumber n={psalm107.number} />
<SectionTitle fancy latin_size>{psalm107.name}</SectionTitle>
<ShowPsalm ps={107} to={4} />

<PageNumber page={412} text="the psalter" />
