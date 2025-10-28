<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm49 = getPsalmMeta(49);
</script>

<ShowPsalm ps={48} from={10} />

<PsalmNumber n={psalm49.number} />
<SectionTitle fancy text={psalm49.name} latin_size />
<ShowPsalm ps={49} to={8} />

<PageNumber page={330} text="the psalter" />
