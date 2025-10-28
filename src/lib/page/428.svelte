<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<Psalm119Section vs={9} />
<ShowPsalm ps={119} from={9} to={16} />

<Psalm119Section vs={17} />
<ShowPsalm ps={119} from={17} to={22} />

<PageNumber page={428} text="the psalter" />
