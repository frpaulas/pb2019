<script lang="ts">
	let { n = '' } = $props();
</script>

{#if n != ''}
	<p class="text-center text-4xl">
		{n}
	</p>
{/if}
