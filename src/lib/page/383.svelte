<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm88 = getPsalmMeta(88);
</script>

<ShowPsalm ps={87} from={5} />

<PsalmNumber n={psalm88.number} />
<SectionTitle fancy latin_size>{psalm88.name}</SectionTitle>
<ShowPsalm ps={88} to={9} />

<PageNumber page={383} text="Day 17: Morning Prayer | Psalm 88 |" />
