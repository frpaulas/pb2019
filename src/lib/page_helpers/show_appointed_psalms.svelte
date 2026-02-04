<script lang="ts">
	import {
		getMorningPsalms60,
		getEveningPsalms60,
		getCycleDay60,
		getMorningPsalms30,
		getEveningPsalms30,
		getCycleDay30
	} from '$lib/calendar/psalm_cycle';
	import { selectedDate } from '$lib/stores/liturgical';
	import { psalmModal, parsePsalmRef, type PsalmReference } from '$lib/stores/psalmModal';
	import { psalmCycle } from '$lib/stores/preferences';

	interface Props {
		office: 'morning' | 'evening';
	}

	let { office }: Props = $props();

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

	/**
	 * Calculate day of year (1-366)
	 */
	function getDayOfYear(date: Date): number {
		const start = new Date(date.getFullYear(), 0, 0);
		const diff = date.getTime() - start.getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		return Math.floor(diff / oneDay);
	}

	// Get the day in the psalm cycle based on preference
	let cycleDay = $derived(
		$psalmCycle === 60
			? getCycleDay60(getDayOfYear(currentDate)) // 60-day uses day of year
			: getCycleDay30(currentDate.getDate()) // 30-day uses day of month
	);

	// Get the psalms for this day and office based on cycle preference
	let psalmRefs = $derived(
		$psalmCycle === 60
			? office === 'morning'
				? getMorningPsalms60(cycleDay)
				: getEveningPsalms60(cycleDay)
			: office === 'morning'
				? getMorningPsalms30(cycleDay)
				: getEveningPsalms30(cycleDay)
	);

	// Parse all psalm references
	let parsedPsalms = $derived(psalmRefs ? psalmRefs.map((ref) => parsePsalmRef(ref)) : []);

	// Build display label (e.g., "Psalm 23, 24" or "Psalm 119:33-72")
	let displayLabel = $derived(() => {
		if (parsedPsalms.length === 0) return '';
		if (parsedPsalms.length === 1) return parsedPsalms[0].label;

		// Multiple psalms - show as "Psalms 23, 24, 25"
		const nums = parsedPsalms.map((p) => {
			if (p.from && p.to) {
				return `${p.ps}:${p.from}-${p.to}`;
			}
			return p.ps.toString();
		});
		return `Psalms ${nums.join(', ')}`;
	});

	function openPsalms() {
		psalmModal.open(parsedPsalms);
	}
</script>

{#if parsedPsalms.length > 0}
	<div class="my-4">
		<p class="mb-2 text-sm text-gray-600 italic">Psalms appointed for {dateStr}:</p>

		<div>
			<button
				type="button"
				onclick={openPsalms}
				class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				{displayLabel()}
			</button>
		</div>
	</div>
{:else}
	<div class="my-4 text-sm text-gray-500 italic">
		No psalms found for {dateStr}
	</div>
{/if}
