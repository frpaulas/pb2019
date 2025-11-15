<script lang="ts">
	let { text, ref = '', indent = false, bold = false, amen = false, italic = false } = $props();
	let this_class = $state('');
	if (indent) {
		this_class += ' pl-4';
	}
	if (bold) {
		this_class += ' font-bold';
	}
	if (italic) {
		this_class += ' italic';
	}
</script>

<p class={this_class}>
	{text}
	{#if amen}
		<span class="font-bold"> Amen.</span>
	{/if}
	{#if ref.length > 0}
		<span class="text-right"> {ref} </span>
	{/if}
</p>
