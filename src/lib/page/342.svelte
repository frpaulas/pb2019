<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm59 = getPsalmMeta(59);
</script>

<ShowPsalm ps={58} from={10} />

<PsalmNumber n={psalm59.number} />
<SectionTitle fancy latin_size>{psalm59.name}</SectionTitle>
<ShowPsalm ps={59} to={9} />
<PageNumber page={342} text="the psalter" />
