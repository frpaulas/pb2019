<script>
	import { page } from '$app/stores';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	let currentPage = $state($page.params.page_number);
</script>

<div class="mb-8 min-w-180 text-center text-xs" data-intentionally-blank="true">
	<PageNumber page={currentPage} text="Intentionally Blank" />
</div>
