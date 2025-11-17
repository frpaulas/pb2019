<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm57 = getPsalmMeta(57);
</script>

<ShowPsalm ps={56} from={9} />

<PsalmNumber n={psalm57.number} />
<SectionTitle fancy latin_size>{psalm57.name}</SectionTitle>
<ShowPsalm ps={57} to={6} />

<PageNumber page={340} text="the psalter" />
