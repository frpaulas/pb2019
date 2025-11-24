<script>
	import Versical from '$lib/page_helpers/versical.svelte';

	let { easter = false, no_speaker = false } = $props();
	let response = 'Thanks be to God.' + (easter ? ' Alleluia, Alleluia' : '');
</script>

{#if no_speaker}
	<Versical bold={true}>{response}</Versical>
{:else}
	<Versical who="people">{response}</Versical>
{/if}
