<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm63 = getPsalmMeta(63);
</script>

<ShowPsalm ps={62} from={9} />

<PsalmNumber n={psalm63.number} />
<SectionTitle fancy latin_size>{psalm63.name}</SectionTitle>
<ShowPsalm ps={63} to={9} />

<PageNumber page={346} text="the psalter" />
