<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm25 = getPsalmMeta(25);
</script>

<PsalmNumber n={psalm25.number} />
<SectionTitle fancy latin_size>{psalm25.name}</SectionTitle>
<ShowPsalm ps={25} to={13} />

<PageNumber page={297} text="Day 5: Morning Prayer | Psalm 25 |" />
