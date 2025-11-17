<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm117 = getPsalmMeta(117);
	const psalm118 = getPsalmMeta(118);
</script>

<ShowPsalm ps={116} from={16} />

<PsalmNumber n={psalm117.number} />
<SectionTitle fancy latin_size>{psalm117.name}</SectionTitle>
<ShowPsalm ps={117} />

<PsalmNumber n={psalm118.number} />
<SectionTitle fancy latin_size>{psalm118.name}</SectionTitle>
<ShowPsalm ps={118} to={8} />

<PageNumber page={425} text="Day 24: Morning Prayer | Psalm 118 |" />
