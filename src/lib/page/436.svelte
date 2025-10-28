<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={118} to={120} />

<Psalm119Section vs={121} />
<ShowPsalm ps={119} from={121} to={128} />

<Psalm119Section vs={129} />
<ShowPsalm ps={119} from={129} to={130} />

<PageNumber page={436} text="the psalter" />
