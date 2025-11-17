<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm7 = getPsalmMeta(7);
	const psalm8 = getPsalmMeta(8);
</script>

<ShowPsalm ps={7} from={15} to={18} />

<PsalmNumber n={psalm8.number} />
<SectionTitle fancy latin_size>{psalm8.name}</SectionTitle>

<ShowPsalm ps={8} />

<PageNumber page={276} text="the psalter" />
