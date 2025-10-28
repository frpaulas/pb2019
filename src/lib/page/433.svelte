<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={77} to={80} />

<Psalm119Section vs={81} />
<ShowPsalm ps={119} from={81} to={88} />

<Psalm119Section vs={89} />
<ShowPsalm ps={119} from={89} to={89} />

<PageNumber page={433} text="Day 25: Evening Prayer | Psalm 119 |" />
