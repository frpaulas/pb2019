<script>
	let { latin = false } = $props();
	import Line from '$lib/page_helpers/line.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
</script>

<div class="flex break-after-all flex-col gap-3 sm:flex-row sm:gap-6">
	<div>
		<Line>Lord, have mercy [upon us].</Line>
		<Line bold>Christ, have mercy [upon us].</Line>
		<Line>Lord, have mercy [upon us].</Line>
	</div>
	{#if latin}
		<div>
			<Rubric>or</Rubric>
			<Line>Kyrie eleison.</Line>
			<Line bold>Christe eleison.</Line>
			<Line>Kyrie eleison.</Line>
		</div>
	{/if}
</div>
