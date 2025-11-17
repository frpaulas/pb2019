<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';

	let { text, optional = false, indent = false, children } = $props();
	let this_class =
		'mb-4 ' + (indent ? ' pl-4 ' : optional ? 'border-l-2 border-gray-900 pl-4' : '');

	let parsedText = $derived(text ? parseMarkdown(text) : null);

	// For slot content, we need to extract and parse it
	let slotContentElement;
	let parsedSlotContent = $derived.by(() => {
		if (!slotContentElement) return null;
		const textContent = slotContentElement.textContent || '';
		return parseMarkdown(textContent);
	});
</script>

{#snippet this_block()}
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
	</p>
{/snippet}

{@render this_block()}
