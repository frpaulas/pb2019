<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown';
	import { liturgicalContext } from '$lib/stores/liturgical';
	import { onMount } from 'svelte';

	let {
		size = 'text-sm',
		fancy = false,
		latin_size = false,
		hebrew = false,
		lowercase = false,
		children
	} = $props();

	// Use modest letter-spacing for small/base sizes, wider for large titles
	const isSmallSize = size === 'text-base' || size === 'text-sm';
	// Allow lowercase override for certain titles
	const caseClass = lowercase ? 'capitalize' : 'uppercase';

	const tracking =
		caseClass == 'capitalize' ? '' : isSmallSize ? 'tracking-[.2em]' : 'tracking-[.3em]';

	let this_class =
		'text-center ' +
		caseClass +
		' ' +
		tracking +
		' ' +
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
			parsedSlotContent = parseMarkdown(textContent, $liturgicalContext);
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
