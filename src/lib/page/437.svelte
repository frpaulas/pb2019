<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={131} to={136} />

<Psalm119Section vs={137} />
<ShowPsalm ps={119} from={137} to={144} />

<PageNumber page={437} text="Day 26: Morning Prayer | Psalm 119 |" />
