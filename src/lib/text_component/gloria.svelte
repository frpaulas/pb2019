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
	<Versical who="officiant">{lines[0]}</Versical>
	<Versical who="people">{lines[1]}</Versical>
	<Versical>{lines[2]}</Versical>
{:else}
	<div class="mt-1">
		<Line bold>{lines[0]}</Line>
		<Line bold indent>{lines[1]}</Line>
		<Line bold indent>{lines[2]}</Line>
	</div>
{/if}
