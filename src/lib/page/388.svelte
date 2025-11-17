<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm90 = getPsalmMeta(90);
</script>

<ShowPsalm ps={89} from={50} />

<SectionTitle>day 18 : morning prayer</SectionTitle>
<PsalmNumber n={psalm90.number} />
<SectionTitle fancy latin_size>{psalm90.name}</SectionTitle>
<ShowPsalm ps={90} to={10} />

<PageNumber page={388} text="the psalter" />
