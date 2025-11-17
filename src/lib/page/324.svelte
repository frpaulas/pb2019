<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm44 = getPsalmMeta(44);
</script>

<ShowPsalm ps={43} from={3} />

<SectionTitle>day 9 : morning prayer</SectionTitle>
<PsalmNumber n={psalm44.number} />
<SectionTitle fancy latin_size>{psalm44.name}</SectionTitle>
<ShowPsalm ps={44} to={7} />

<PageNumber page={324} text="the psalter" />
