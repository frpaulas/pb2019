<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm146 = getPsalmMeta(146);
</script>

<ShowPsalm ps={145} from={18} />

<PsalmNumber n={psalm146.number} />
<SectionTitle fancy latin_size>{psalm146.name}</SectionTitle>
<ShowPsalm ps={146} to={9} />

<PageNumber page={463} text="Day 30: Morning Prayer | Psalm 146 |" />
