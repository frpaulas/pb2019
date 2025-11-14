<script>
	let { latin = false } = $props();
	import Line from '$lib/page_helpers/line.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
</script>

<div class="mt-8 flex break-after-all flex-col gap-3 sm:flex-row sm:gap-6">
	<div>
		<Line text="Lord, have mercy [upon us]." />
		<Line bold text="Christ, have mercy [upon us]." />
		<Line text="Lord, have mercy [upon us]." />
	</div>
	{#if latin}
		<div>
			<Rubric text="or" />
			<Line text="Kyrie eleison." />
			<Line bold text="Christe eleison." />
			<Line text="Kyrie eleison." />
		</div>
	{/if}
</div>
