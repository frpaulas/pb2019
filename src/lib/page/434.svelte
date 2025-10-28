<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={90} to={96} />

<Psalm119Section vs={97} />
<ShowPsalm ps={119} from={97} to={104} />

<PageNumber page={434} text="the psalter" />
