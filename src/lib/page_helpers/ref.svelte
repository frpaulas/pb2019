<script lang="ts">
	let { text, t = false, nr = false, continued = false } = $props();
</script>

{#if nr || continued}
	<span class="text-s capitalize [font-variant:small-caps]"
		>{#if continued};&nbsp;
		{/if}{text}{#if t}<span class="relative-top-1 text-xs">T</span>{/if}</span
	>
{:else}
	<p class="text-s mr-10 text-right capitalize [font-variant:small-caps]">
		{text}{#if t}<span class="relative-top-1 text-xs">T</span>{/if}
	</p>
{/if}
