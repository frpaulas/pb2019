<script>
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<SectionTitle>day 26 : evening prayer</SectionTitle>

<Psalm119Section vs={145} />
<ShowPsalm ps={119} from={145} to={152} />

<Psalm119Section vs={153} />
<ShowPsalm ps={119} from={153} to={157} />

<PageNumber page={276} text="the psalter" />
