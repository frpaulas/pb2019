<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm61 = getPsalmMeta(61);
</script>

<ShowPsalm ps={60} from={4} />

<PsalmNumber n={psalm61.number} />
<SectionTitle fancy latin_size>{psalm61.name}</SectionTitle>
<ShowPsalm ps={61} to={4} />

<PageNumber page={344} text="the psalter" />
