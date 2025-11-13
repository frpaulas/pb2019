<script>
	let { pg = '' } = $props();
	import PageNumber from '$lib/page_helpers/page_number.svelte';
</script>

<PageNumber page={pg} text="Intentionally Blank" />
