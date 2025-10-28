<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
</script>

<ShowPsalm ps={68} from={8} to={20} />

<PageNumber page={352} text="the psalter" />
