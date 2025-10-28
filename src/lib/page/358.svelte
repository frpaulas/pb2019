<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
</script>

<ShowPsalm ps={71} from={6} to={18} />

<PageNumber page={358} text="the psalter" />
