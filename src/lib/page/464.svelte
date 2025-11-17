<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm147 = getPsalmMeta(147);
</script>

<ShowPsalm ps={146} from={10} />

<SectionTitle>day 30 : evening prayer</SectionTitle>
<PsalmNumber n={psalm147.number} />
<SectionTitle fancy latin_size>{psalm147.name}</SectionTitle>
<ShowPsalm ps={147} to={9} />

<PageNumber page={464} text="the psalter" />
