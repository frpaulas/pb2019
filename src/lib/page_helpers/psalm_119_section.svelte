<script lang="ts">
	import SectionTitle from './section_title.svelte';

	interface Props {
		latin?: string;
		hebrew?: string;
	}

	let { latin = '', hebrew = '' }: Props = $props();
</script>

{#if latin}
	<div class="text-xs">
		<SectionTitle fancy text={latin} latin_size />
	</div>
{/if}

{#if hebrew}
	<div class="text-xs">
		<SectionTitle text={hebrew} />
	</div>
{/if}
