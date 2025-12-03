<script lang="ts">
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';
	import { onMount } from 'svelte';

	let { ref = '', indent = false, bold = false, children } = $props();
	let this_class = indent ? ' pl-4' : '';
	if (bold) {
		this_class += ' font-bold';
	}

	// For slot content, we need to extract and parse it
	let slotContentElement = $state();
	let parsedSlotContent = $state(null);

	onMount(() => {
		if (slotContentElement) {
			const textContent = slotContentElement.textContent || '';
			parsedSlotContent = parseMarkdown(textContent);
		}
	});
</script>

<p class={this_class}>
	{#if parsedSlotContent}
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
