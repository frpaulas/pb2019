<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm35 = getPsalmMeta(35);
</script>

<ShowPsalm ps={34} from={15} />

<SectionTitle>day 7 : morning prayer</SectionTitle>
<PsalmNumber n={psalm35.number} />
<SectionTitle fancy latin_size>{psalm35.name}</SectionTitle>
<ShowPsalm ps={35} to={4} />

<PageNumber page={310} text="the psalter" />
