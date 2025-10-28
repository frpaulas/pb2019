<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	const psalm110 = getPsalmMeta(110);
</script>

<ShowPsalm ps={109} from={19} />

<SectionTitle text="day 23 : morning prayer" />
<PsalmNumber n={psalm110.number} />
<SectionTitle fancy text={psalm110.name} latin_size />
<ShowPsalm ps={110} to={1} />

<PageNumber page={418} text="the psalter" />
