<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm119 = getPsalmMeta(119);
</script>

<ShowPsalm ps={118} from={24} />

<SectionTitle>day 24 : evening prayer</SectionTitle>
<PsalmNumber n={psalm119.number} />
<SectionTitle fancy latin_size>{psalm119.name}</SectionTitle>
<Psalm119Section vs={1} />
<ShowPsalm ps={119} to={8} />

<PageNumber page={427} text="Day 24: Evening Prayer | Psalm 119 |" />
