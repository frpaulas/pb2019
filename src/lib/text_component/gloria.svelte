<script>
	let { versical = false } = $props();
	import Line from '$lib/page_helpers/line.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	let lines = [
		'__Glory be to the Father, and to the Son, and to the Holy Spirit; * __',
		'__as it was in the beginning, is now, and ever shall be, world__',
		'__without end. Amen.__'
	];
</script>

{#if versical}
	<Versical officiant>{lines[0]}</Versical>
	<Versical people>{lines[1]}</Versical>
	<Versical>{lines[2]}</Versical>
{:else}
	<div class="mt-1">
		<Line>{lines[0]}</Line>
		<Line indent>{lines[1]}</Line>
		<Line indent>{lines[2]}</Line>
	</div>
{/if}
