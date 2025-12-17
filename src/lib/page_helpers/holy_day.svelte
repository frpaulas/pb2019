<script>
	import rldEucharist from '$lib/calendar/rld_eucharist.json';

	let { name } = $props();

	// Get the holy day data from rld_eucharist.json
	const holyDayData = $derived(rldEucharist[name]);
</script>

{#if holyDayData}
	<div class="holy-day mb-4">
		<h3 class="font-bold text-lg mb-2">{holyDayData.name}</h3>
		<div class="ml-4 space-y-1">
			{#if holyDayData.ot}
				<div>
					<span class="font-semibold">Old Testament:</span>
					<span class="ml-2">{holyDayData.ot}</span>
				</div>
			{/if}
			{#if holyDayData.psalm}
				<div>
					<span class="font-semibold">Psalm:</span>
					<span class="ml-2">{holyDayData.psalm}</span>
				</div>
			{/if}
			{#if holyDayData.epistle}
				<div>
					<span class="font-semibold">Epistle:</span>
					<span class="ml-2">{holyDayData.epistle}</span>
				</div>
			{/if}
			{#if holyDayData.gospel}
				<div>
					<span class="font-semibold">Gospel:</span>
					<span class="ml-2">{holyDayData.gospel}</span>
				</div>
			{/if}
			{#if holyDayData.color}
				<div>
					<span class="font-semibold">Color:</span>
					<span class="ml-2 capitalize">{holyDayData.color}</span>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<p class="text-red-500">Unknown holy day: {name}</p>
{/if}
