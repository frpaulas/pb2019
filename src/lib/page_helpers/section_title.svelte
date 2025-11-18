<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';
	import { onMount } from 'svelte';

	let { size = 'text-l', fancy = false, latin_size = false, hebrew = false, children } = $props();
	let this_class =
		'text-center tracking-[.3em] uppercase ' +
		size +
		(fancy ? ' italic' : '') +
		(latin_size ? ' text-xs' : '') +
		(hebrew ? ' uppercase' : '');

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
	{:else if children}
		<span bind:this={slotContentElement} style="display: none;">
			{@render children()}
		</span>
	{/if}
</p>
