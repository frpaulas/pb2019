<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm119 = getPsalmMeta(119);
</script>

<SectionTitle fancy text={psalm119.name} latin_size />
<SectionTitle fancy text={psalm119.hebrew} latin_size hebrew />
<ShowPsalm ps={119} from={9} to={16} />

<SectionTitle fancy text={psalm119.name} latin_size />
<SectionTitle fancy text={psalm119.hebrew} latin_size hebrew />
<ShowPsalm ps={119} from={17} to={22} />

<PageNumber page={428} text="the psalter" />
