<script>
	let { text, add_on = '' } = $props();
</script>

<p class="mt-2 mb-2 text-red-900 italic">
	{text}
	{#if add_on.length > 0}
		<span class="font-bold">{add_on}</span>
	{/if}
</p>
