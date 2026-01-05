<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown';
	import { liturgicalContext } from '$lib/stores/liturgical';
	import { onMount } from 'svelte';
	import PageLink from './page_link.svelte';

	let { optional = false, indent = false, bold = false, children, content = null } = $props();
	let this_class =
		'mb-4 ' +
		(bold ? 'font-bold ' : '') +
		(indent ? ' pl-4 ' : optional ? 'border-l-2 border-gray-900 pl-4' : '');

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

{#snippet this_block()}
	<p class={this_class}>
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
		{:else}
			<span bind:this={slotContentElement} style="display: none;">
				{@render children()}
			</span>
		{/if}
	</p>
{/snippet}

{@render this_block()}
