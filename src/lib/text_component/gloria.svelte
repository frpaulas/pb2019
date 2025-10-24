<script>
	let { versical = false } = $props();
	import Line from '$lib/page_helpers/line.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	let lines = [
		'Glory be to the Father, and to the Son, and to the Holy Spirit; *',
		'as it was in the beginning, is now, and ever shall be, world',
		'without end. Amen.'
	];
</script>

{#if versical}
	<Versical officiant text={lines[0]} />
	<Versical people text={lines[1]} />
	<Versical text={lines[2]} />
{:else}
	<div class="mt-1">
		<Line bold indent text={lines[0]} />
		<Line bold indent text={lines[1]} />
		<Line bold indent text={lines[2]} />
	</div>
{/if}
