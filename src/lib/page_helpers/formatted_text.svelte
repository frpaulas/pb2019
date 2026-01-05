<script lang="ts">
	import { parseMarkdown } from '$lib/utils/parseMarkdown';
	import { liturgicalContext } from '$lib/stores/liturgical';

	/**
	 * Renders text that may contain formatting wrappers
	 * Handles both plain strings and arrays of text segments with formatting
	 */

	type TextSegment = {
		type: string;
		value: string;
	};

	let { text }: { text: string | TextSegment[] } = $props();
</script>

{#if typeof text === 'string'}
	{@html parseMarkdown(text, $liturgicalContext)}
{:else if Array.isArray(text)}
	{#each text as segment}
		{#if segment.type === 'text'}
			{@html parseMarkdown(segment.value, $liturgicalContext)}
		{:else if segment.type === 'u'}
			<span class="uppercase">{@html parseMarkdown(segment.value, $liturgicalContext)}</span>
		{:else if segment.type === 'blank'}
			<span class="inline-block min-w-24 border-b border-gray-400"></span>
		{:else}
			<!-- Unknown wrapper type, render as plain text with markdown -->
			{@html parseMarkdown(segment.value, $liturgicalContext)}
		{/if}
	{/each}
{/if}
