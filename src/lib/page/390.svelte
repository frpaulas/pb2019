<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm92 = getPsalmMeta(92);
</script>

<ShowPsalm ps={91} from={7} />

<PsalmNumber n={psalm92.number} />
<SectionTitle fancy latin_size>{psalm92.name}</SectionTitle>
<ShowPsalm ps={92} to={2} />

<PageNumber page={390} text="the psalter" />
