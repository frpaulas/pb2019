<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm144 = getPsalmMeta(144);
</script>

<ShowPsalm ps={143} from={8} />

<SectionTitle text="day 30 : morning prayer" />
<PsalmNumber n={psalm144.number} />
<SectionTitle fancy text={psalm144.name} latin_size />
<ShowPsalm ps={144} to={6} />

<PageNumber page={460} text="the psalter" />
