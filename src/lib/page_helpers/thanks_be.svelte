<script>
	let { easter = false, no_speaker = false } = $props();
	import Versical from './versical.svelte';
	let response = 'Thanks be to God. ' + easter ? 'Alleluia, Alleluia' : '';
</script>

{#if no_speaker}
	<Versical text={response} />
{:else}
	<Versical people text={response} />
{/if}
