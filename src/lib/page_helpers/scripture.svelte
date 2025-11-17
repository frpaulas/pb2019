<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';
	import Ref from './ref.svelte';

	let { text, ref, t = false, children } = $props();

	let parsedText = $derived(text ? parseMarkdown(text) : null);

	// For slot content, we need to extract and parse it
	let slotContentElement;
	let parsedSlotContent = $derived.by(() => {
		if (!slotContentElement) return null;
		const textContent = slotContentElement.textContent || '';
		return parseMarkdown(textContent);
	});
</script>

<div class="text-normal relative">
	{#if parsedText}
		{@html parsedText}
	{:else if parsedSlotContent}
		{@html parsedSlotContent}
	{:else}
		<span bind:this={slotContentElement} style="display: none;">
			{@render children()}
		</span>
	{/if}
	<Ref text={ref} {t} />
</div>
