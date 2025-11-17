<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';

	let { text, add_on = '', children } = $props();

	let parsedText = $derived(text ? parseMarkdown(text) : null);

	// For slot content, we need to extract and parse it
	let slotContentElement;
	let parsedSlotContent = $derived.by(() => {
		if (!slotContentElement) return null;
		const textContent = slotContentElement.textContent || '';
		return parseMarkdown(textContent);
	});
</script>

<p class="mt-2 mb-2 text-red-900 italic">
	{#if parsedText}
		{@html parsedText}
	{:else if parsedSlotContent}
		{@html parsedSlotContent}
	{:else}
		<span bind:this={slotContentElement} style="display: none;">
			{@render children()}
		</span>
	{/if}
	{#if add_on.length > 0}
		<span class="font-bold">{add_on}</span>
	{/if}
</p>
