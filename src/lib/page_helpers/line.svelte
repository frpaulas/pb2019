<script lang="ts">
	import { parseMarkdown } from '$lib/utils/parseMarkdown';
	import { liturgicalContext } from '$lib/stores/liturgical';
	import { onMount } from 'svelte';
	import FormattedText from './formatted_text.svelte';

	let { ref = '', indent = false, bold = false, text, children } = $props();
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
			parsedSlotContent = parseMarkdown(textContent, $liturgicalContext);
		}
	});
</script>

<p class={this_class}>
	{#if text !== undefined}
		<FormattedText {text} />
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
