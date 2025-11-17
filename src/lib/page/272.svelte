<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm3 = getPsalmMeta(3);
	const psalm4 = getPsalmMeta(4);
</script>

<ShowPsalm ps={3} from={5} to={8} />

<br />
<PsalmNumber n={psalm4.number} />
<SectionTitle fancy latin_size>{psalm4.name}</SectionTitle>

<ShowPsalm ps={4} />

<PageNumber page={272} text="The Psalter" />
