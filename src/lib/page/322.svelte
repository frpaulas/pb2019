<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm42 = getPsalmMeta(42);
</script>

<ShowPsalm ps={41} from={7} />

<PsalmNumber n={psalm42.number} />
<SectionTitle fancy latin_size>{psalm42.name}</SectionTitle>
<ShowPsalm ps={42} to={6} />

<PageNumber page={322} text="the psalter" />
