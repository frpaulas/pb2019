<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={50} to={56} />

<Psalm119Section vs={57} />
<ShowPsalm ps={119} from={57} to={64} />

<PageNumber page={431} text="Day 25: Morning Prayer | Psalm 119 |" />
