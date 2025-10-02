<script lang="ts">
	let { text, indent = false, bold = false, amen = false } = $props();
	let this_class = $state('');
	if (indent) {
		this_class += ' indent-4';
	}
	if (bold) {
		this_class += ' font-bold';
	}
</script>

<p class={this_class}>
	{text}
	{#if amen}
		<span class="font-bold"> Amen.</span>
	{/if}
</p>
