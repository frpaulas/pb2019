<script lang="ts">
	let { ln1, ln2, vs = '' } = $props();
</script>

<p class="font-bold">
	<span class="-top-1 text-xs font-normal">{vs} </span>
	{ln1}
	<span class="relative -top-1 text-xs">*</span>}
</p>
<p class="indent-4">{ln2}</p>
