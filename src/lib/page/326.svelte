<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm45 = getPsalmMeta(45);
</script>

<ShowPsalm ps={44} from={22} />
<PsalmNumber n={psalm45.number} />
<SectionTitle fancy text={psalm45.name} latin_size />
<ShowPsalm ps={45} to={7} />

<PageNumber page={326} text="the psalter" />
