<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm143 = getPsalmMeta(143);
</script>

<ShowPsalm ps={142} from={6} />

<PsalmNumber n={psalm143.number} />
<SectionTitle fancy latin_size>{psalm143.name}</SectionTitle>
<ShowPsalm ps={143} to={7} />

<PageNumber page={459} text="Day 29: Evening Prayer | Psalm 143 |" />
