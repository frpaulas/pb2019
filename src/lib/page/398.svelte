<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm99 = getPsalmMeta(99);
	const psalm100 = getPsalmMeta(100);
</script>

<PsalmNumber n={psalm99.number} />
<SectionTitle fancy latin_size>{psalm99.name}</SectionTitle>
<ShowPsalm ps={99} />

<PsalmNumber n={psalm100.number} />
<SectionTitle fancy latin_size>{psalm100.name}</SectionTitle>
<ShowPsalm ps={100} to={2} />

<PageNumber page={398} text="the psalter" />
