<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm75 = getPsalmMeta(75);
</script>

<ShowPsalm ps={74} from={13} />

<SectionTitle text="day 15 : morning prayer" />
<PsalmNumber n={psalm75.number} />
<SectionTitle fancy text={psalm75.name} latin_size />
<ShowPsalm ps={75} to={2} />

<PageNumber page={364} text="the psalter" />
