<script lang="ts">
	import { parseMarkdown } from '$lib/utils/parseMarkdown';
	import { liturgicalContext } from '$lib/stores/liturgical';
	import { onMount } from 'svelte';

	let { bold = false, indent = false, optional = false, children } = $props();

	let textClass = bold ? 'font-bold' : '';
	if (indent) textClass += ' ml-4';
	if (optional) textClass += ' italic';

	// For slot content, we need to extract and parse it
	let slotContentElement = $state();
	let parsedSlotContent = $state(null);

	onMount(() => {
		if (slotContentElement) {
			const textContent = slotContentElement.textContent || '';
			parsedSlotContent = parseMarkdown(textContent, $liturgicalContext);
		}
	});
</script>

<div class="flex gap-3 leading-normal">
	<div class="w-8 flex-shrink-0 text-right">•</div>
	<div class="flex-1 {textClass}">
		{#if parsedSlotContent}
			{@html parsedSlotContent}
		{:else}
			<span bind:this={slotContentElement} style="display: none;">
				{@render children()}
			</span>
		{/if}
	</div>
</div>
