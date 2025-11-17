<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm80 = getPsalmMeta(80);
</script>

<ShowPsalm ps={79} from={6} />

<PsalmNumber n={psalm80.number} />
<SectionTitle fancy latin_size>{psalm80.name}</SectionTitle>
<ShowPsalm ps={80} to={2} />

<PageNumber page={374} text="the psalter" />
