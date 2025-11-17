<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm115 = getPsalmMeta(115);
</script>

<ShowPsalm ps={114} from={2} />

<PsalmNumber n={psalm115.number} />
<SectionTitle fancy latin_size>{psalm115.name}</SectionTitle>
<ShowPsalm ps={115} to={6} />

<PageNumber page={422} text="the psalter" />
