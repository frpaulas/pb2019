<script lang="ts">
	import { selectedDate } from '$lib/stores/liturgical';
	import { scriptureModal } from '$lib/stores/scriptureModal';
	import dailyLectionary from '$lib/calendar/daily_lectionary.json';

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

	// Get lectionary key (month-day format)
	let lectionaryKey = $derived(
		`${currentDate.getMonth() + 1}-${currentDate.getDate()}`
	);

	// Get readings for this day
	type DayEntry = {
		morning?: {
			ot?: { req: string; alt?: string };
			nt?: { req: string; alt?: string };
			psalm60?: string[];
		};
		evening?: {
			ot?: { req: string; alt?: string };
			nt?: { req: string; alt?: string };
			psalm60?: string[];
		};
	};

	let dayReadings = $derived(
		(dailyLectionary as Record<string, DayEntry>)[lectionaryKey]
	);

	let readings = $derived(
		dayReadings ? dayReadings[office] : null
	);

	function openReading(req: string, alt?: string) {
		scriptureModal.open(req, alt || null);
	}
</script>

{#if readings}
	<div class="my-4">
		<p class="mb-2 text-sm italic text-gray-600">Readings appointed for {dateStr}:</p>

		<div class="space-y-2">
			<!-- Old Testament / First Reading -->
			{#if readings.ot}
				<div>
					<span class="text-gray-700">First Reading: </span>
					<button
						type="button"
						onclick={() => openReading(readings.ot!.req, readings.ot!.alt)}
						class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						{readings.ot.req}{#if readings.ot.alt} Or {readings.ot.alt}{/if}
					</button>
				</div>
			{/if}

			<!-- New Testament / Second Reading -->
			{#if readings.nt}
				<div>
					<span class="text-gray-700">Second Reading: </span>
					<button
						type="button"
						onclick={() => openReading(readings.nt!.req, readings.nt!.alt)}
						class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						{readings.nt.req}{#if readings.nt.alt} Or {readings.nt.alt}{/if}
					</button>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="my-4 text-sm italic text-gray-500">
		No readings found for {dateStr}
	</div>
{/if}
