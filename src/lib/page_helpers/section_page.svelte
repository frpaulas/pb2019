<script>
	import NewPage from './new_page.svelte';

	let { text } = $props();
</script>

<div class="mt-8 mb-8 text-center text-3xl uppercase">
	{text}
</div>
<NewPage />
