<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';
	import Ref from './ref.svelte';
	import { onMount } from 'svelte';

	let { ref, t = false, children } = $props();

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

<p class="mt-2 mb-2 text-red-900 italic">
	{#if parsedSlotContent}
		{@html parsedSlotContent}
	{:else if children}
		<span bind:this={slotContentElement} style="display: none;">
			{@render children()}
		</span>
	{/if}
	<Ref text={ref} {t} />
</p>
