<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm81 = getPsalmMeta(81);
</script>

<ShowPsalm ps={80} from={18} />

<PsalmNumber n={psalm81.number} />
<SectionTitle fancy latin_size>{psalm81.name}</SectionTitle>
<ShowPsalm ps={81} to={11} />

<PageNumber page={376} text="the psalter" />
