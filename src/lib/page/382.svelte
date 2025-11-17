<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm87 = getPsalmMeta(87);
</script>

<ShowPsalm ps={86} from={10} />

<PsalmNumber n={psalm87.number} />
<SectionTitle fancy latin_size>{psalm87.name}</SectionTitle>
<ShowPsalm ps={87} to={4} />

<PageNumber page={382} text="the psalter" />
