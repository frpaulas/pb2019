<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
</script>

<ShowPsalm ps={51} from={2} to={17} />

<PageNumber page={334} text="the psalter" />
