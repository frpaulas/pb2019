<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm123 = getPsalmMeta(123);
	const psalm124 = getPsalmMeta(124);
</script>

<ShowPsalm ps={122} from={5} />

<PsalmNumber n={psalm123.number} />
<SectionTitle fancy latin_size>{psalm123.name}</SectionTitle>
<ShowPsalm ps={123} />

<PsalmNumber n={psalm124.number} />
<SectionTitle fancy latin_size>{psalm124.name}</SectionTitle>
<ShowPsalm ps={124} to={1} />

<PageNumber page={442} text="the psalter" />
