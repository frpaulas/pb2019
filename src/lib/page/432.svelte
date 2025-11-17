<script>
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<Psalm119Section vs={65} />
<ShowPsalm ps={119} from={65} to={72} />

<SectionTitle>day 25 : evening prayer</SectionTitle>
<Psalm119Section vs={73} />
<ShowPsalm ps={119} from={73} to={76} />

<PageNumber page={432} text="the psalter" />
