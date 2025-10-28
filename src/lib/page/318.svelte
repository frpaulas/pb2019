<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm39 = getPsalmMeta(39);
</script>

<ShowPsalm ps={38} from={15} />

<PsalmNumber n={psalm39.number} />
<SectionTitle fancy text={psalm39.name} latin_size />
<ShowPsalm ps={39} to={5} />

<PageNumber page={318} text="the psalter" />
