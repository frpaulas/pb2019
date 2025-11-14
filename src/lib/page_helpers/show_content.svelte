<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		text: string;
		getContent: () => Component | string | any;
	}

	let { text, getContent }: Props = $props();

	let isExpanded = $state(false);
	let displayContent = $state<any>(null);

	function handleClick() {
		if (isExpanded) {
			// Second click - collapse and remove content
			isExpanded = false;
			displayContent = null;
		} else {
			// First click - expand and execute function
			isExpanded = true;
			displayContent = getContent();
		}
	}

	// Check if content is a Svelte component
	let isComponent = $derived(displayContent !== null && typeof displayContent === 'function');
</script>

<div class="my-2">
	<button
		onclick={handleClick}
		class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
	>
		{text}
	</button>

	{#if isExpanded && displayContent !== null}
		<div class="mt-2">
			{#if isComponent}
				<svelte:component this={displayContent} />
			{:else}
				{@html displayContent}
			{/if}
		</div>
	{/if}
</div>
