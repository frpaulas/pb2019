<script>
	import rldsData from '$lib/calendar/rlds.json';

	let { month } = $props();

	// Get current date
	const today = new Date();
	const currentMonth = today.getMonth(); // 0-11
	const currentYear = today.getFullYear();
	const currentDay = today.getDate();

	// Determine which month to display
	// If the specified month matches current month, show current month
	// Otherwise show next month
	const monthNames = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december'
	];

	const specifiedMonthIndex = monthNames.indexOf(month.toLowerCase());

	// Determine which month to display
	let displayMonth, displayYear;
	if (specifiedMonthIndex === currentMonth) {
		// Show current month
		displayMonth = currentMonth;
		displayYear = currentYear;
	} else {
		// Show next month
		displayMonth = (currentMonth + 1) % 12;
		displayYear = displayMonth === 0 ? currentYear + 1 : currentYear;
	}

	const displayMonthName = monthNames[displayMonth];

	// Get the first day of the month (0 = Sunday, 6 = Saturday)
	const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();

	// Get the number of days in the month
	const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

	// Get liturgical data for this month from rlds.json
	// Convert rlds data to a map by day for the current display month
	const liturgicalDays = {};
	for (const [dateKey, dayInfo] of Object.entries(rldsData)) {
		const [monthNum, dayNum] = dateKey.split('-').map(Number);
		// monthNum is 1-based, displayMonth is 0-based
		if (monthNum === displayMonth + 1) {
			liturgicalDays[dayNum] = dayInfo;
		}
	}

	// Create calendar grid (6 rows x 7 days)
	const calendarGrid = [];
	let dayCounter = 1;

	for (let week = 0; week < 6; week++) {
		const weekDays = [];
		for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
			if ((week === 0 && dayOfWeek < firstDayOfMonth) || dayCounter > daysInMonth) {
				weekDays.push(null); // Empty cell
			} else {
				weekDays.push(dayCounter);
				dayCounter++;
			}
		}
		calendarGrid.push(weekDays);
		if (dayCounter > daysInMonth) break; // Stop if we've filled all days
	}

	// Check if a day is today
	function isToday(day) {
		return day === currentDay && displayMonth === currentMonth && displayYear === currentYear;
	}

	// Get liturgical info for a day
	function getLiturgicalInfo(day) {
		return liturgicalDays[day] || null;
	}

	// Get color class for liturgical day
	function getColorClass(liturgicalInfo) {
		if (!liturgicalInfo || !liturgicalInfo.color) return '';
		switch (liturgicalInfo.color.toLowerCase()) {
			case 'white':
				return 'bg-white text-gray-900 border border-gray-300';
			case 'red':
				return 'bg-red-100 text-red-900';
			case 'purple':
				return 'bg-purple-100 text-purple-900';
			case 'green':
				return 'bg-green-100 text-green-900';
			case 'blue':
				return 'bg-blue-100 text-blue-900';
			case 'rose':
				return 'bg-pink-100 text-pink-900';
			case 'black':
				return 'bg-gray-800 text-white';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	}

	// Format liturgical day name for display
	function formatDayName(liturgicalInfo) {
		if (!liturgicalInfo) return '';

		// For RLD (Red Letter Days) - major feasts, show full name
		if (liturgicalInfo.type === 'RLD') {
			return liturgicalInfo.name;
		}

		// For saints and other commemorations, show abbreviated
		// E.g., "William Laud, Bp" instead of full subtitle
		if (liturgicalInfo.subtitle) {
			return `${liturgicalInfo.name}`;
		}

		return liturgicalInfo.name || '';
	}
</script>

<div class="calendar-container my-6">
	<h3 class="mb-4 text-center text-2xl font-bold capitalize">
		{displayMonthName}
		{displayYear}
	</h3>

	<div class="calendar-grid border border-gray-300">
		<!-- Day headers -->
		<div class="calendar-header grid grid-cols-7 bg-gray-100 font-semibold">
			<div class="border-r border-gray-300 py-2 text-center">Sun</div>
			<div class="border-r border-gray-300 py-2 text-center">Mon</div>
			<div class="border-r border-gray-300 py-2 text-center">Tue</div>
			<div class="border-r border-gray-300 py-2 text-center">Wed</div>
			<div class="border-r border-gray-300 py-2 text-center">Thu</div>
			<div class="border-r border-gray-300 py-2 text-center">Fri</div>
			<div class="py-2 text-center">Sat</div>
		</div>

		<!-- Calendar days -->
		{#each calendarGrid as week}
			<div class="calendar-week grid grid-cols-7 border-t border-gray-300">
				{#each week as day, i}
					<div
						class="calendar-day min-h-24 border-r border-gray-300 p-2 {i === 6
							? 'border-r-0'
							: ''} {isToday(day) ? 'border-2 border-blue-500 bg-blue-50' : ''}"
					>
						{#if day}
							{@const liturgicalInfo = getLiturgicalInfo(day)}
							<div class="flex h-full flex-col">
								<div class="text-right font-semibold {isToday(day) ? 'text-blue-600' : ''}">
									{day}
								</div>
								{#if liturgicalInfo}
									<div
										class="mt-1 rounded p-1 text-xs {getColorClass(liturgicalInfo)}"
										title={liturgicalInfo.subtitle
											? `${liturgicalInfo.name} - ${liturgicalInfo.subtitle}`
											: liturgicalInfo.name}
									>
										{formatDayName(liturgicalInfo)}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<div class="mt-4 text-center text-sm text-gray-600 italic">
		{#if displayMonth === currentMonth}
			Showing current month
		{:else}
			Showing next month
		{/if}
	</div>
</div>

<style>
	.calendar-day {
		background-color: #fff;
	}
	.calendar-day:hover {
		background-color: #f9fafb;
	}
</style>
