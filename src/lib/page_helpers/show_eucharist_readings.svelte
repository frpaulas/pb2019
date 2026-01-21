<script lang="ts">
	import { selectedDate } from '$lib/stores/liturgical';
	import { scriptureModal } from '$lib/stores/scriptureModal';
	import { psalmModal, parsePsalmRef } from '$lib/stores/psalmModal';
	import { getSundayLectionaryKeyForAnyDate } from '$lib/calendar/sunday_key_mapping';
	import {
		getReadings,
		getLiturgicalYearCycle,
		getSundayReadings
	} from '$lib/calendar/sunday_lectionary';

	interface Props {
		type: 'lessons' | 'gospel';
	}

	let { type }: Props = $props();

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

	// Get the liturgical year (A, B, or C)
	let liturgicalYear = $derived(getLiturgicalYearCycle(currentDate.getFullYear()));

	// Get the Sunday lectionary key for this date (uses previous Sunday if not a Sunday)
	let sundayKey = $derived(
		getSundayLectionaryKeyForAnyDate(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			currentDate.getDate()
		)
	);

	// Get the Sunday info (for the name)
	let sundayInfo = $derived(sundayKey ? getSundayReadings(sundayKey) : null);

	// Get the readings for this Sunday and year
	let readings = $derived(sundayKey ? getReadings(sundayKey, liturgicalYear) : null);

	// Parse psalm reference for the psalm modal
	function openPsalm(psalmRef: string) {
		// Handle formats like "Ps 122", "Ps 80 or 80:1-7", "Ps 72:1-15(16-19)"
		// Strip "Ps " or "Psalm " prefix
		let ref = psalmRef.replace(/^(Ps|Psalm)\s*/i, '');

		// For now, take the first option if there's an "or"
		if (ref.includes(' or ')) {
			ref = ref.split(' or ')[0].trim();
		}

		// Handle optional verses in parentheses - strip them for now
		ref = ref.replace(/\([^)]+\)/g, '').trim();

		const parsed = parsePsalmRef(ref);
		psalmModal.open([parsed]);
	}

	function openScripture(reference: string) {
		scriptureModal.open(reference, null);
	}
</script>

{#if readings}
	{#if type === 'lessons'}
		<div class="my-4">
			<p class="mb-2 text-sm text-gray-600 italic">
				Readings for {sundayInfo?.name || dateStr} (Year {liturgicalYear}):
			</p>

			<div class="space-y-2">
				<!-- Old Testament -->
				{#if readings.ot}
					<div>
						<span class="text-gray-700">First Reading: </span>
						<button
							type="button"
							onclick={() => openScripture(readings.ot)}
							class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							{readings.ot}
						</button>
					</div>
				{/if}

				<!-- Psalm -->
				{#if readings.psalm}
					<div>
						<span class="text-gray-700">Psalm: </span>
						<button
							type="button"
							onclick={() => openPsalm(readings.psalm)}
							class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							{readings.psalm}
						</button>
					</div>
				{/if}

				<!-- Epistle -->
				{#if readings.epistle}
					<div>
						<span class="text-gray-700">Second Reading: </span>
						<button
							type="button"
							onclick={() => openScripture(readings.epistle)}
							class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							{readings.epistle}
						</button>
					</div>
				{/if}
			</div>
		</div>
	{:else if type === 'gospel'}
		<div class="my-4">
			<div>
				<span class="text-gray-700">Gospel: </span>
				<button
					type="button"
					onclick={() => openScripture(readings.gospel)}
					class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					{readings.gospel}
				</button>
			</div>
		</div>
	{/if}
{:else}
	<div class="my-4 text-sm text-gray-500 italic">
		No readings found for {dateStr}
	</div>
{/if}
