<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Psalm119Section from '$lib/page_helpers/psalm_119_section.svelte';
</script>

<ShowPsalm ps={119} from={36} to={40} />

<Psalm119Section vs={41} />
<ShowPsalm ps={119} from={41} to={48} />

<Psalm119Section vs={49} />
<ShowPsalm ps={119} from={49} to={49} />

<PageNumber page={430} text="the psalter" />
