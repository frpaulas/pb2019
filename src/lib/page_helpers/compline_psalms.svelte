<script lang="ts">
	import ShowPsalm from './show_psalm.svelte';
	import SectionTitle from './section_title.svelte';

	const psalms = [
		{ number: 4, label: 'Psalm 4', from: 1, to: 8, latin: 'Cum invocarem' },
		{ number: 31, label: 'Psalm 31:1-6', from: 1, to: 6, latin: 'In te, Domine, speravi' },
		{ number: 91, label: 'Psalm 91', from: 1, to: 16, latin: 'Qui habitat' },
		{ number: 134, label: 'Psalm 134', from: 1, to: 4, latin: 'Ecce nunc' }
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

<div class="compline-psalms">
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
	<ShowPsalm ps={selectedPsalm.number} from={selectedPsalm.from} to={selectedPsalm.to} />
</div>
