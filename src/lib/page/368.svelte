<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm78 = getPsalmMeta(78);
</script>

<ShowPsalm ps={77} from={19} />

<SectionTitle>day 15 : evening prayer</SectionTitle>
<PsalmNumber n={psalm78.number} />
<SectionTitle fancy latin_size>{psalm78.name}</SectionTitle>
<ShowPsalm ps={78} to={9} />

<PageNumber page={368} text="the psalter" />
