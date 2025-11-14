<script>
	let { text, amen = false, bold = false, optional = false } = $props();

	// Parse markdown for bold (**text** or __text__) and italic (*text* or _text_)
	function parseMarkdown(input) {
		if (!input) return '';

		let result = input;

		// Handle bold: **text** or __text__
		result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
		result = result.replace(/__(.+?)__/g, '<strong>$1</strong>');

		// Handle italic: *text* or _text_ (but not already in bold)
		result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
		result = result.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, '<em>$1</em>');

		return result;
	}

	let parsedText = $derived(parseMarkdown(text));
</script>

{#snippet this_block()}
	{#if optional}
		<p class="mb-4 border-l-2 border-gray-900 pl-4">
			{@html parsedText}
			{#if amen}
				<span class="font-bold"> Amen.</span>
			{/if}
		</p>
	{:else}
		<p class="mb-4">
			{@html parsedText}
			{#if amen}
				<span class="font-bold"> Amen.</span>
			{/if}
		</p>
	{/if}
{/snippet}

{@render this_block()}
