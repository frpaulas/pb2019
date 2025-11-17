<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm108 = getPsalmMeta(108);
</script>

<ShowPsalm ps={107} from={34} />

<SectionTitle>day 22 : evening prayer</SectionTitle>
<PsalmNumber n={psalm108.number} />
<SectionTitle fancy latin_size>{psalm108.name}</SectionTitle>
<ShowPsalm ps={108} to={5} />

<PageNumber page={415} text="Day 22: Evbening Prayer | Psalm 108 |" />
