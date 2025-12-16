<script>
	import { onMount } from 'svelte';

	let year = $state(new Date().getFullYear());
	let easterDate = $state(null);
	let ashWednesday = $state(null);
	let ascensionDay = $state(null);
	let pentecost = $state(null);
	let trinitySunday = $state(null);
	let properAfterTrinity = $state(null);
	let advent1 = $state(null);

	/**
	 * Calculate Easter Sunday using the Anonymous Gregorian algorithm
	 * Also known as Meeus/Jones/Butcher algorithm
	 */
	function calculateEaster(year) {
		const a = year % 19;
		const b = Math.floor(year / 100);
		const c = year % 100;
		const d = Math.floor(b / 4);
		const e = b % 4;
		const f = Math.floor((b + 8) / 25);
		const g = Math.floor((b - f + 1) / 3);
		const h = (19 * a + b - d - g + 15) % 30;
		const i = Math.floor(c / 4);
		const k = c % 4;
		const l = (32 + 2 * e + 2 * i - h - k) % 7;
		const m = Math.floor((a + 11 * h + 22 * l) / 451);
		const month = Math.floor((h + l - 7 * m + 114) / 31);
		const day = ((h + l - 7 * m + 114) % 31) + 1;

		return new Date(year, month - 1, day);
	}

	/**
	 * Add days to a date
	 */
	function addDays(date, days) {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	/**
	 * Format date as "Month Day, Year"
	 */
	function formatDate(date) {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	/**
	 * Calculate First Sunday of Advent
	 * Advent begins on the 4th Sunday before Christmas (the Sunday closest to Nov 30)
	 */
	function calculateAdvent1(year) {
		const christmas = new Date(year, 11, 25); // Dec 25
		const dayOfWeek = christmas.getDay(); // 0 = Sunday

		// Find the Sunday on or before Nov 30
		// That's 4 Sundays before Christmas
		let daysToSubtract;
		if (dayOfWeek === 0) {
			// Christmas is Sunday - go back 28 days (4 weeks)
			daysToSubtract = 28;
		} else {
			// Go back to previous Sunday, then 3 more weeks
			daysToSubtract = dayOfWeek + 21;
		}

		return addDays(christmas, -daysToSubtract);
	}

	/**
	 * Calculate all liturgical dates for a given year
	 */
	function calculateDates() {
		if (!year || year < 1000 || year > 9999) {
			// Clear results for invalid year
			easterDate = null;
			ashWednesday = null;
			ascensionDay = null;
			pentecost = null;
			trinitySunday = null;
			properAfterTrinity = null;
			advent1 = null;
			return;
		}

		// Calculate Easter
		easterDate = calculateEaster(year);

		// Ash Wednesday is 46 days before Easter
		ashWednesday = addDays(easterDate, -46);

		// Ascension Day is 39 days after Easter (always a Thursday)
		ascensionDay = addDays(easterDate, 39);

		// Pentecost is 49 days after Easter (7 weeks)
		pentecost = addDays(easterDate, 49);

		// Trinity Sunday is 56 days after Easter (the Sunday after Pentecost)
		trinitySunday = addDays(easterDate, 56);

		// Proper following Trinity Sunday starts on the Sunday after Trinity
		const firstProperSunday = addDays(trinitySunday, 7);
		properAfterTrinity = firstProperSunday;

		// First Sunday of Advent
		advent1 = calculateAdvent1(year);
	}

	// Calculate on mount
	onMount(() => {
		calculateDates();
	});

	// Recalculate when year changes
	$effect(() => {
		calculateDates();
	});
</script>

<div class="find-easter-container my-8 mx-auto max-w-2xl">
	<h3 class="text-2xl font-bold text-center mb-6">Calculating the Dates of Moveable Feasts</h3>

	<div class="year-input mb-8">
		<label for="year-input" class="block text-lg font-semibold mb-2"> Enter Year: </label>
		<input
			id="year-input"
			type="number"
			bind:value={year}
			min="1000"
			max="9999"
			class="w-full p-3 text-lg border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
			placeholder="e.g., 2026"
		/>
	</div>

	{#if easterDate}
		<div class="results space-y-4">
			<div class="result-row flex justify-between items-center p-4 bg-white rounded border-l-4 border-yellow-500">
				<span class="font-semibold text-lg">Easter Day:</span>
				<span class="text-gray-700">{formatDate(easterDate)}</span>
			</div>

			<div class="result-row flex justify-between items-center p-4 bg-purple-50 rounded border-l-4 border-purple-600">
				<span class="font-semibold text-lg">Ash Wednesday:</span>
				<span class="text-gray-700">{formatDate(ashWednesday)}</span>
			</div>

			<div class="result-row flex justify-between items-center p-4 bg-white rounded border-l-4 border-blue-500">
				<span class="font-semibold text-lg">Ascension Day:</span>
				<span class="text-gray-700">{formatDate(ascensionDay)}</span>
			</div>

			<div class="result-row flex justify-between items-center p-4 bg-red-50 rounded border-l-4 border-red-600">
				<span class="font-semibold text-lg">Pentecost:</span>
				<span class="text-gray-700">{formatDate(pentecost)}</span>
			</div>

			<div class="result-row flex justify-between items-center p-4 bg-white rounded border-l-4 border-green-500">
				<span class="font-semibold text-lg">Trinity Sunday:</span>
				<span class="text-gray-700">{formatDate(trinitySunday)}</span>
			</div>

			<div class="result-row flex justify-between items-center p-4 bg-green-50 rounded border-l-4 border-green-600">
				<span class="font-semibold text-lg">Proper after Trinity Sunday:</span>
				<span class="text-gray-700">{formatDate(properAfterTrinity)}</span>
			</div>

			<div class="result-row flex justify-between items-center p-4 bg-purple-100 rounded border-l-4 border-purple-700">
				<span class="font-semibold text-lg">First Sunday of Advent:</span>
				<span class="text-gray-700">{formatDate(advent1)}</span>
			</div>
		</div>
	{:else}
		<div class="text-center text-gray-500 italic">
			Enter a valid year (1000-9999) to calculate dates
		</div>
	{/if}
</div>

<style>
	.result-row {
		transition: transform 0.2s;
	}
	.result-row:hover {
		transform: translateX(4px);
	}
</style>
