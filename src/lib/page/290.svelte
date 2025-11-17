<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm20 = getPsalmMeta(20);
</script>

<ShowPsalm ps={19} from={7} />

<PsalmNumber n={psalm20.number} />
<SectionTitle fancy latin_size>{psalm20.name}</SectionTitle>
<ShowPsalm ps={20} to={4} />

<PageNumber page={276} text="the psalter" />
