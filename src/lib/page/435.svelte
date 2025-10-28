<script>
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<SectionTitle text="day 26: morning prayer" />
<Psalm119Section vs={105} />
<ShowPsalm ps={119} from={105} to={112} />

<Psalm119Section vs={113} />
<ShowPsalm ps={119} from={113} to={117} />

<PageNumber page={435} text="Day 26: Morning Prayer | Psalm 7 |" />
