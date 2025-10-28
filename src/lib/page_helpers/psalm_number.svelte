<script lang="ts">
	interface Props {
		n?: number | string;
	}

	let { n = '' }: Props = $props();
</script>

{#if n !== ''}
	<p class="text-center text-4xl">
		{n}
	</p>
{/if}
