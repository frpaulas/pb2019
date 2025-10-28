<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm67 = getPsalmMeta(67);
</script>

<ShowPsalm ps={66} from={10} />

<PsalmNumber n={psalm67.number} />
<SectionTitle fancy text={psalm67.name} latin_size />
<ShowPsalm ps={67} to={3} />

<PageNumber page={350} text="the psalter" />
