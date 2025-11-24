<script lang="ts">
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';
	import { onMount } from 'svelte';

	let { who = '', bold = false, children } = $props();

	let textClass = who == 'people' || bold ? 'font-bold' : '';

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

<div class="flex break-after-all gap-4 leading-normal">
	<div class="w-[70px] flex-shrink-0 text-right capitalize italic">{who}</div>
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
