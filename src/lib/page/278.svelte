<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm10 = getPsalmMeta(10);
</script>

<ShowPsalm ps={9} from={14} to={20} />

<PsalmNumber n={psalm10.number} />
<SectionTitle fancy text={psalm10.name} latin_size />

<ShowPsalm ps={10} to={6} />

<PageNumber page={278} text="the psalter" />
