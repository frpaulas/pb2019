<script>
	import Ref from './ref.svelte';

	let { text, ref, amen = false, t = false } = $props();
</script>

<div class="text-normal relative">
	{text}
	{#if amen}
		<span class="font-black"> Amen.</span>
	{/if}
	<Ref text={ref} {t} />
</div>
