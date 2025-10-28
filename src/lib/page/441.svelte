<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	const psalm121 = getPsalmMeta(121);
	const psalm122 = getPsalmMeta(122);
</script>

<PsalmNumber n={psalm121.number} />
<SectionTitle fancy text={psalm121.name} latin_size />
<ShowPsalm ps={121} />

<PsalmNumber n={psalm122.number} />
<SectionTitle fancy text={psalm122.name} latin_size />
<ShowPsalm ps={122} to={4} />

<PageNumber page={441} text="Day 27: Morning Prayer | Psalm 122 |" />
