<script>
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';

	let { text, amen = false, bold = false, optional = false, indent = false } = $props();
	let this_class =
		'mb-4 ' + (indent ? ' pl-4 ' : optional ? 'border-l-2 border-gray-900 pl-4' : '');

	let parsedText = $derived(parseMarkdown(text));
</script>

{#snippet this_block()}
	<p class={this_class}>
		{@html parsedText}
		{#if amen}
			<span class="font-bold"> Amen.</span>
		{/if}
	</p>
{/snippet}

{@render this_block()}
