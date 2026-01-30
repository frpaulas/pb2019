<script lang="ts">
	import ShowPsalm from './show_psalm.svelte';
	import SectionTitle from './section_title.svelte';

	const psalms = [
		{ number: 119, label: 'Psalm 119:105-112', from: 105, to: 112, latin: 'Lucerna pedibus meis' },
		{ number: 121, label: 'Psalm 121', from: 1, to: 8, latin: 'Levavi oculos' },
		{ number: 124, label: 'Psalm 124', from: 1, to: 6, latin: 'Nisi quia Dominus' },
		{ number: 126, label: 'Psalm 126', from: 1, to: 7, latin: 'In convertendo' }
	];

	// Day of year mod 4 for default selection
	function getDayOfYear(): number {
		const now = new Date();
		const start = new Date(now.getFullYear(), 0, 0);
		const diff = now.getTime() - start.getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		return Math.floor(diff / oneDay);
	}

	let selectedIndex = $state(getDayOfYear() % 4);
	let selectedPsalm = $derived(psalms[selectedIndex]);
</script>

<div class="midday-psalms">
	<div class="flex flex-wrap gap-2 mb-4 justify-center">
		{#each psalms as psalm, i}
			<button
				class="px-3 py-1.5 rounded text-sm font-medium transition-colors
					{selectedIndex === i
					? 'bg-stone-700 text-white'
					: 'bg-stone-200 text-stone-700 hover:bg-stone-300'}"
				onclick={() => (selectedIndex = i)}
			>
				{psalm.label}
			</button>
		{/each}
	</div>

	<SectionTitle>
		{selectedPsalm.label}{#if selectedPsalm.latin}<br /><span class="text-base italic">{selectedPsalm.latin}</span>{/if}
	</SectionTitle>
	<ShowPsalm ps={selectedPsalm.number} from={selectedPsalm.from} to={selectedPsalm.to} bold={true} />
</div>
