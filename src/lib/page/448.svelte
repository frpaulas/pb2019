<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm133 = getPsalmMeta(133);
</script>

<ShowPsalm ps={132} from={9} />

<PsalmNumber n={psalm133.number} />
<SectionTitle fancy text={psalm133.name} latin_size />
<ShowPsalm ps={133} to={2} />

<PageNumber page={448} text="the psalter" />
