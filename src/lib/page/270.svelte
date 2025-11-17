<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm1 = getPsalmMeta(1);
	const psalm2 = getPsalmMeta(2);
</script>

<SectionTitle size="text-base">day 1 : morning prayer</SectionTitle>
<PsalmNumber n={psalm1.number} />
<SectionTitle fancy latin_size>{psalm1.name}</SectionTitle>

<ShowPsalm ps={1} to={7} />

<br />
<PsalmNumber n={psalm2.number} />
<SectionTitle fancy latin_size>{psalm2.name}</SectionTitle>

<ShowPsalm ps={2} to={3} />

<PageNumber page={270} text="The Psalter" />
