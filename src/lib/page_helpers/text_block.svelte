<script>
	let { text, amen = false, bold = false } = $props();
</script>

{#snippet this_block()}
	<p class="mb-4">
		{text}
		{#if amen}
			<span class="font-bold"> Amen.</span>
		{/if}
	</p>
{/snippet}

{@render this_block()}
