<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm105 = getPsalmMeta(105);
</script>

<ShowPsalm ps={104} from={34} />

<SectionTitle>day 21 : morning prayer</SectionTitle>
<PsalmNumber n={psalm105.number} />
<SectionTitle fancy latin_size>{psalm105.name}</SectionTitle>
<ShowPsalm ps={105} to={11} />

<PageNumber page={406} text="the psalter" />
