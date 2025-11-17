<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm22 = getPsalmMeta(22);
</script>

<ShowPsalm ps={21} from={9} />

<SectionTitle>day 4 : evening prayer</SectionTitle>
<PsalmNumber n={psalm22.number} />
<SectionTitle fancy latin_size>{psalm22.name}</SectionTitle>
<ShowPsalm ps={22} to={7} />

<PageNumber page={292} text="the psalter" />
