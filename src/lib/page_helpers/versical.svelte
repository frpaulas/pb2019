<script lang="ts">
	import { parseMarkdown } from '$lib/utils/parseMarkdown';
	import { liturgicalContext } from '$lib/stores/liturgical';
	import { onMount } from 'svelte';
	import FormattedText from './formatted_text.svelte';

	let { who = '', officiant = false, people = false, bold = false, text, children } = $props();

	// Determine who is speaking from boolean props or direct who prop
	let speaker = who;
	if (!speaker) {
		if (officiant) speaker = 'officiant';
		else if (people) speaker = 'people';
	}

	let textClass = speaker == 'people' || bold ? 'font-bold' : '';

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

<div class="flex break-after-all gap-4 leading-normal">
	<div class="w-[70px] flex-shrink-0 text-right capitalize italic">{speaker}</div>
	<div class="flex-1 {textClass}">
		{#if text !== undefined}
			<FormattedText {text} />
		{:else if parsedSlotContent}
			{@html parsedSlotContent}
		{:else}
			<span bind:this={slotContentElement} style="display: none;">
				{@render children()}
			</span>
		{/if}
	</div>
</div>
