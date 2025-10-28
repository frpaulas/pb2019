<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm89 = getPsalmMeta(89);
</script>

<ShowPsalm ps={88} from={10} />

<SectionTitle text="day 17 : evening prayer" />
<PsalmNumber n={psalm89.number} />
<SectionTitle fancy text={psalm89.name} latin_size />
<ShowPsalm ps={89} to={3} />

<PageNumber page={384} text="the psalter" />
