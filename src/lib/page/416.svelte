<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm109 = getPsalmMeta(109);
</script>

<ShowPsalm ps={108} from={5} />

<PsalmNumber n={psalm109.number} />
<SectionTitle fancy latin_size>{psalm109.name}</SectionTitle>
<ShowPsalm ps={109} to={3} />

<PageNumber page={416} text="the psalter" />
