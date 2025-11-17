<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm29 = getPsalmMeta(29);
</script>

<PsalmNumber n={psalm29.number} />
<SectionTitle fancy latin_size>{psalm29.name}</SectionTitle>
<ShowPsalm ps={29} />

<PageNumber page={302} text="the psalter" />
