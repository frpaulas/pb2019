<script>
	let { text, no_border = false } = $props();
</script>

{#if !no_border}
	<hr class="my-4 border-t-2 border-gray-300" />
{/if}
<p class="mt-2 mb-2 text-blue-900 italic">
	{text}
</p>
