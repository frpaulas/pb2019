<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm108 = getPsalmMeta(108);
</script>

<ShowPsalm ps={107} from={34} />

<SectionTitle text="day 22 : evening prayer" />
<PsalmNumber n={psalm108.number} />
<SectionTitle fancy text={psalm108.name} latin_size />
<ShowPsalm ps={108} to={5} />

<PageNumber page={415} text="Day 22: Evbening Prayer | Psalm 108 |" />
