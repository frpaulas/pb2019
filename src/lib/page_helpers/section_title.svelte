<script>
	import 'tailwindcss';
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';

	let {
		text,
		size = 'text-l',
		fancy = false,
		latin_size = false,
		hebrew = false,
		children
	} = $props();
	let this_class =
		'text-center tracking-[.3em] uppercase ' +
		size +
		(fancy ? ' italic' : '') +
		(latin_size ? ' text-xs' : '') +
		(hebrew ? ' uppercase' : '');

	let parsedTextProp = $derived(text ? parseMarkdown(text) : null);

	// For slot content, we need to extract and parse it
	let slotContentElement;
	let parsedSlotContent = $derived.by(() => {
		if (!slotContentElement) return null;
		const textContent = slotContentElement.textContent || '';
		return parseMarkdown(textContent);
	});
</script>

<p class={this_class}>
	{#if parsedTextProp}
		{@html parsedTextProp}
	{:else if parsedSlotContent}
		{@html parsedSlotContent}
	{:else}
		<span bind:this={slotContentElement} style="display: none;">
			{@render children()}
		</span>
	{/if}
</p>
