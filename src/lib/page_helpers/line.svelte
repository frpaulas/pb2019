<script lang="ts">
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';

	let { text, ref = '', indent = false, children } = $props();
	let this_class = indent ? ' pl-4' : '';

	let parsedText = $derived(text ? parseMarkdown(text) : null);

	// For slot content, we need to extract and parse it
	let slotContentElement;
	let parsedSlotContent = $derived.by(() => {
		if (!slotContentElement) return null;
		const textContent = slotContentElement.textContent || '';
		return parseMarkdown(textContent);
	});
</script>

<p class={this_class}>
	{#if parsedText}
		{@html parsedText}
	{:else if parsedSlotContent}
		{@html parsedSlotContent}
	{:else}
		<span bind:this={slotContentElement} style="display: none;">
			{@render children()}
		</span>
	{/if}
	{#if ref.length > 0}
		<span class="text-right"> {ref} </span>
	{/if}
</p>
