<script>
	let { children } = $props();
</script>

<p class="mt-2 mb-2 text-red-900 italic">
	{#if children}
		{@render children()}
	{:else}
		Then follows
	{/if}
</p>
