<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
</script>

<ShowPsalm ps={55} from={8} to={21} />

<PageNumber page={338} text="the psalter" />
