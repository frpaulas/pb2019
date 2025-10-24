<script lang="ts">
	let { text, t = false } = $props();
</script>

<p class="text-s mr-10 text-right capitalize [font-variant:small-caps]">
	{text}
	{#if t}
		<span class="relative-top-1 text-xs">T</span>
	{/if}
</p>
