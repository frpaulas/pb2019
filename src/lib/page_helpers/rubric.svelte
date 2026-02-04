<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown';
	import { liturgicalContext } from '$lib/stores/liturgical';
	import { onMount } from 'svelte';
	import PageLink from './page_link.svelte';

	let { add_on = '', children, content = null } = $props();

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

<p class="rubric mt-2 mb-2 italic">
	{#if content && Array.isArray(content)}
		<!-- Render content array with mixed text and page_link segments -->
		{#each content as segment}
			{#if segment.type === 'text'}
				{@html parseMarkdown(segment.value, $liturgicalContext)}
			{:else if segment.type === 'page_link'}
				<PageLink page={segment.page} text={segment.text} />
			{/if}
		{/each}
	{:else if parsedSlotContent}
		{@html parsedSlotContent}
	{:else if children}
		<span bind:this={slotContentElement} style="display: none;">
			{@render children()}
		</span>
	{/if}
	{#if add_on.length > 0}
		<span class="font-bold">{add_on}</span>
	{/if}
</p>

<style>
	.rubric {
		color: #7f1d1d; /* red-900 */
	}

	:global(.dark) .rubric {
		color: #fef9c3; /* yellow-100 */
	}
</style>
