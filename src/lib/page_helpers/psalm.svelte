<script lang="ts">
	let { ln1, ln2, vs = '' } = $props();
</script>

<div class="flex">
	<span class="inline-block w-8 flex-shrink-0 text-xs font-normal">{vs}</span>
	<div class="flex-1">
		<p class="font-bold">
			{ln1}
			<span class="relative -top-1 text-xs">*</span>
		</p>
		<p class="indent-4 font-bold">{ln2}</p>
	</div>
</div>
