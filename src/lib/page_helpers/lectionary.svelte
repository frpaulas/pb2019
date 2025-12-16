<script>
	import sundayLectionaryData from '$lib/calendar/sunday_lectionary.json';
	import { onMount } from 'svelte';

	// Convert lectionary data to array and group by season
	const lectionaryKeys = Object.keys(sundayLectionaryData);
	const seasonOrder = ['advent', 'christmas', 'epiphany', 'lent', 'easter', 'pentecost', 'trinity'];

	// Group Sundays by season
	const groupedSundays = {};
	for (const key of lectionaryKeys) {
		const sunday = sundayLectionaryData[key];
		const season = sunday.season || 'other';
		if (!groupedSundays[season]) {
			groupedSundays[season] = [];
		}
		groupedSundays[season].push({ key, ...sunday });
	}

	// State
	let selectedSunday = $state(lectionaryKeys[0]); // Default to first Sunday
	let selectedYear = $state('A'); // Default to Year A
	let isMobile = $state(false);

	// Get current Sunday data
	$derived {
		currentSundayData = sundayLectionaryData[selectedSunday];
		currentReadings = currentSundayData ? currentSundayData[`year${selectedYear}`] : null;
	}

	let currentSundayData;
	let currentReadings;

	// Detect mobile on mount
	onMount(() => {
		isMobile = window.innerWidth < 768;
		const handleResize = () => {
			isMobile = window.innerWidth < 768;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	// Get the index of current Sunday
	function getCurrentIndex() {
		return lectionaryKeys.indexOf(selectedSunday);
	}

	// Navigate to previous Sunday
	function previousSunday() {
		const currentIndex = getCurrentIndex();
		if (currentIndex > 0) {
			selectedSunday = lectionaryKeys[currentIndex - 1];
		}
	}

	// Navigate to next Sunday
	function nextSunday() {
		const currentIndex = getCurrentIndex();
		if (currentIndex < lectionaryKeys.length - 1) {
			selectedSunday = lectionaryKeys[currentIndex + 1];
		}
	}

	// Capitalize season names
	function capitalizeSeason(season) {
		return season.charAt(0).toUpperCase() + season.slice(1);
	}

	// Get color swatch based on liturgical color
	function getColorClass(color) {
		switch (color?.toLowerCase()) {
			case 'white':
				return 'bg-white border-2 border-gray-400';
			case 'red':
				return 'bg-red-500';
			case 'purple':
				return 'bg-purple-600';
			case 'green':
				return 'bg-green-600';
			case 'blue':
				return 'bg-blue-600';
			case 'rose':
				return 'bg-pink-400';
			case 'black':
				return 'bg-gray-900';
			default:
				return 'bg-gray-400';
		}
	}
</script>

<div class="lectionary-container my-8 mx-auto max-w-4xl">
	<h3 class="text-2xl font-bold text-center mb-6">Sunday Lectionary</h3>

	<!-- Sunday Selector -->
	<div class="controls mb-6">
		<label for="sunday-select" class="block text-lg font-semibold mb-2">
			Select Sunday:
		</label>
		<div class="flex gap-2 items-center">
			<button
				onclick={previousSunday}
				disabled={getCurrentIndex() === 0}
				class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				title="Previous Sunday"
			>
				←
			</button>

			<select
				id="sunday-select"
				bind:value={selectedSunday}
				class="flex-1 p-3 text-base border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
			>
				{#each seasonOrder as season}
					{#if groupedSundays[season]}
						<optgroup label={capitalizeSeason(season)}>
							{#each groupedSundays[season] as sunday}
								<option value={sunday.key}>{sunday.name}</option>
							{/each}
						</optgroup>
					{/if}
				{/each}
			</select>

			<button
				onclick={nextSunday}
				disabled={getCurrentIndex() === lectionaryKeys.length - 1}
				class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				title="Next Sunday"
			>
				→
			</button>
		</div>
	</div>

	<!-- Year Tabs -->
	<div class="year-tabs mb-6">
		<div class="flex gap-1 border-b-2 border-gray-300">
			<button
				onclick={() => (selectedYear = 'A')}
				class="flex-1 px-6 py-3 font-semibold transition-colors {selectedYear === 'A'
					? 'bg-blue-500 text-white border-b-2 border-blue-500 -mb-0.5'
					: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
			>
				Year A
			</button>
			<button
				onclick={() => (selectedYear = 'B')}
				class="flex-1 px-6 py-3 font-semibold transition-colors {selectedYear === 'B'
					? 'bg-blue-500 text-white border-b-2 border-blue-500 -mb-0.5'
					: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
			>
				Year B
			</button>
			<button
				onclick={() => (selectedYear = 'C')}
				class="flex-1 px-6 py-3 font-semibold transition-colors {selectedYear === 'C'
					? 'bg-blue-500 text-white border-b-2 border-blue-500 -mb-0.5'
					: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
			>
				Year C
			</button>
		</div>
	</div>

	<!-- Readings Display -->
	{#if currentSundayData && currentReadings}
		<div class="readings-display bg-white border-2 border-gray-300 rounded-lg p-6">
			<!-- Title with liturgical color -->
			<div class="flex items-center justify-between mb-4">
				<h4 class="text-xl font-bold">{currentSundayData.name}</h4>
				<div class="flex items-center gap-2">
					<span class="text-sm text-gray-600">Color:</span>
					<div
						class="w-8 h-8 rounded {getColorClass(currentSundayData.color)}"
						title={currentSundayData.color}
					></div>
				</div>
			</div>

			<div class="space-y-4">
				<!-- Old Testament -->
				{#if currentReadings.ot}
					<div class="reading-row">
						<div class="font-semibold text-purple-800">Old Testament:</div>
						<div class="text-gray-700 ml-4">{currentReadings.ot}</div>
					</div>
				{/if}

				<!-- Psalm -->
				{#if currentReadings.psalm}
					<div class="reading-row">
						<div class="font-semibold text-blue-800">Psalm:</div>
						<div class="text-gray-700 ml-4">{currentReadings.psalm}</div>
					</div>
				{/if}

				<!-- Epistle -->
				{#if currentReadings.epistle}
					<div class="reading-row">
						<div class="font-semibold text-green-800">Epistle:</div>
						<div class="text-gray-700 ml-4">{currentReadings.epistle}</div>
					</div>
				{/if}

				<!-- Gospel -->
				{#if currentReadings.gospel}
					<div class="reading-row">
						<div class="font-semibold text-red-800">Gospel:</div>
						<div class="text-gray-700 ml-4">{currentReadings.gospel}</div>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="text-center text-gray-500 italic">No readings available for this selection</div>
	{/if}

	<!-- Show All Years Toggle (desktop only) -->
	{#if !isMobile}
		<details class="mt-6">
			<summary class="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold">
				Show All Years for Comparison
			</summary>
			<div class="mt-4 grid grid-cols-3 gap-4">
				{#each ['A', 'B', 'C'] as year}
					{@const readings = currentSundayData?.[`year${year}`]}
					{#if readings}
						<div class="border-2 border-gray-300 rounded p-4">
							<h5 class="font-bold text-center mb-3 bg-gray-100 py-2">Year {year}</h5>
							<div class="space-y-2 text-sm">
								{#if readings.ot}
									<div>
										<div class="font-semibold text-purple-700">OT:</div>
										<div class="text-gray-700">{readings.ot}</div>
									</div>
								{/if}
								{#if readings.psalm}
									<div>
										<div class="font-semibold text-blue-700">Psalm:</div>
										<div class="text-gray-700">{readings.psalm}</div>
									</div>
								{/if}
								{#if readings.epistle}
									<div>
										<div class="font-semibold text-green-700">Epistle:</div>
										<div class="text-gray-700">{readings.epistle}</div>
									</div>
								{/if}
								{#if readings.gospel}
									<div>
										<div class="font-semibold text-red-700">Gospel:</div>
										<div class="text-gray-700">{readings.gospel}</div>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</details>
	{/if}
</div>

<style>
	.reading-row {
		padding: 0.75rem;
		background-color: #f9fafb;
		border-radius: 0.375rem;
	}

	details summary::-webkit-details-marker {
		display: none;
	}

	details summary::marker {
		content: '';
	}

	details summary::before {
		content: '▶ ';
		display: inline-block;
		transition: transform 0.2s;
	}

	details[open] summary::before {
		transform: rotate(90deg);
	}
</style>
