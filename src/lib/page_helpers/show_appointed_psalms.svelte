<script lang="ts">
	import { getMorningPsalms60, getEveningPsalms60, getCycleDay60 } from '$lib/calendar/psalm_cycle';
	import { selectedDate } from '$lib/stores/liturgical';
	import ShowPsalm from './show_psalm.svelte';

	interface Props {
		office: 'morning' | 'evening';
	}

	let { office }: Props = $props();

	let expanded = $state(false);

	// Get the current date from liturgical store
	let currentDate = $derived($selectedDate || new Date());

	// Format date for display
	let dateStr = $derived(
		currentDate.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		})
	);

	// Get the day in the 60-day cycle
	let cycleDay = $derived(getCycleDay60(currentDate.getDate()));

	// Get the psalms for this day and office
	let psalms = $derived(
		office === 'morning' ? getMorningPsalms60(cycleDay) : getEveningPsalms60(cycleDay)
	);

	// Parse psalm references like "119:33-72" into components for ShowPsalm
	function parsePsalmRef(ref: string): { ps: number; from?: number; to?: number } {
		// Handle formats: "23", "119:33-72", "78:1-40"
		const match = ref.match(/^(\d+)(?::(\d+)-(\d+))?$/);
		if (match) {
			const ps = parseInt(match[1]);
			if (match[2] && match[3]) {
				return { ps, from: parseInt(match[2]), to: parseInt(match[3]) };
			}
			return { ps };
		}
		// Fallback: just the psalm number
		return { ps: parseInt(ref) || 1 };
	}

	function toggle() {
		expanded = !expanded;
	}
</script>

<div class="my-4">
	<button
		onclick={toggle}
		class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
	>
		{expanded ? '▼' : '▶'} Show Psalm(s) appointed for {dateStr}
	</button>

	{#if expanded && psalms}
		<div class="mt-4 border-l-4 border-blue-300 pl-4">
			{#each psalms as psalmRef}
				{@const parsed = parsePsalmRef(psalmRef)}
				<ShowPsalm ps={parsed.ps} from={parsed.from} to={parsed.to} showTitle={true} />
			{/each}
		</div>
	{/if}
</div>
