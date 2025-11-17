<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm77 = getPsalmMeta(77);
</script>

<ShowPsalm ps={76} from={4} />

<PsalmNumber n={psalm77.number} />
<SectionTitle fancy latin_size>{psalm77.name}</SectionTitle>
<ShowPsalm ps={77} to={3} />

<PageNumber page={366} text="the psalter" />
