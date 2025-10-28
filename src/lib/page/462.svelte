<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
</script>

<ShowPsalm ps={145} from={3} to={17} />

<PageNumber page={462} text="the psalter" />
