<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm97 = getPsalmMeta(97);
</script>

<ShowPsalm ps={96} from={13} />

<PsalmNumber n={psalm97.number} />
<SectionTitle fancy latin_size>{psalm97.name}</SectionTitle>
<ShowPsalm ps={97} to={11} />

<PageNumber page={396} text="the psalter" />
