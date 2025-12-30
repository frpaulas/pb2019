<script lang="ts">
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
	{text}
{:else if Array.isArray(text)}
	{#each text as segment}
		{#if segment.type === 'text'}
			{segment.value}
		{:else if segment.type === 'u'}
			<span class="uppercase">{segment.value}</span>
		{:else if segment.type === 'blank'}
			<span class="inline-block min-w-24 border-b border-gray-400"></span>
		{:else}
			<!-- Unknown wrapper type, render as plain text -->
			{segment.value}
		{/if}
	{/each}
{/if}
