<script>
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={23} to={24} />

<Psalm119Section vs={25} />
<ShowPsalm ps={119} from={25} to={32} />
<SectionTitle>day 25 : morning prayer</SectionTitle>

<Psalm119Section vs{33} />
<ShowPsalm ps={119} from={33} to={35} />

<PageNumber page={429} text="Day 25: Morning Prayer | Psalm 119 |" />
