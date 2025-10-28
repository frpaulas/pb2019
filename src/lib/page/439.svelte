<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={158} to={160} />

<Psalm119Section vs={161} />
<ShowPsalm ps={119} from={161} to={168} />

<Psalm119Section vs={169} />
<ShowPsalm ps={119} from={169} to={171} />

<PageNumber page={439} text="Day 26: Evening Prayer | Psalm 119 |" />
