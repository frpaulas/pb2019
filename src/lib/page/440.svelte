<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm120 = getPsalmMeta(120);
</script>

<ShowPsalm ps={119} from={172} to={176} />

<SectionTitle>day 27 : morning prayer</SectionTitle>
<PsalmNumber n={psalm120.number} />
<SectionTitle fancy latin_size>{psalm120.name}</SectionTitle>
<ShowPsalm ps={120} />

<PageNumber page={440} text="the psalter" />
