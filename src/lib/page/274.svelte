<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm5 = getPsalmMeta(5);
	const psalm6 = getPsalmMeta(6);
</script>

<ShowPsalm ps={5} from={13} to={13} />

<SectionTitle size="text-base">day 1 : evening prayer</SectionTitle>
<PsalmNumber n={psalm6.number} />
<SectionTitle fancy latin_size>{psalm6.name}</SectionTitle>

<ShowPsalm ps={6} />

<PageNumber page={274} text="The Psalter" />
