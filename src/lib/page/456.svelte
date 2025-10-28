<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm140 = getPsalmMeta(140);
</script>

<ShowPsalm ps={139} from={16} />

<PsalmNumber n={psalm140.number} />
<SectionTitle fancy text={psalm140.name} latin_size />
<ShowPsalm ps={140} to={4} />

<PageNumber page={456} text="the psalter" />
