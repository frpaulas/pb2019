<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm142 = getPsalmMeta(142);
</script>

<ShowPsalm ps={141} from={4} />

<PsalmNumber n={psalm142.number} />
<SectionTitle fancy latin_size>{psalm142.name}</SectionTitle>
<ShowPsalm ps={142} to={5} />

<PageNumber page={458} text="the psalter" />
