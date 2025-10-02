<script>
	let { text, ref, amen = false, t = false } = $props();
</script>

<div class="text-normal relative">
	{text}
	{#if amen}
		<span class="font-black"> Amen.</span>
	{/if}
	<div class="float-right mt-1 align-baseline text-sm uppercase">
		{ref}
		{#if t}
			<span class="relative -top-1 text-xs">T</span>
		{/if}
	</div>
</div>
