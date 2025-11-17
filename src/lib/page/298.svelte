<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm26 = getPsalmMeta(26);
</script>

<ShowPsalm ps={25} from={14} />

<PsalmNumber n={psalm26.number} />
<SectionTitle fancy latin_size>{psalm26.name}</SectionTitle>
<ShowPsalm ps={26} to={6} />

<PageNumber page={298} text="the psalter" />
