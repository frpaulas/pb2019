<script lang="ts">
	import { base } from '$app/paths';
	import { getFeastDay, isRedLetterDay } from '$lib/calendar/rlds';
	import { getSundayLectionaryKey, calculateEaster } from '$lib/calendar/sunday_key_mapping';
	import { getSundayReadings } from '$lib/calendar/sunday_lectionary';

	// Get current date and navigate between months
	let currentDate = $state(new Date());
	let currentYear = $derived(currentDate.getFullYear());
	let currentMonth = $derived(currentDate.getMonth());

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// Calendar grid generation
	interface CalendarDay {
		date: Date;
		dayOfMonth: number;
		isCurrentMonth: boolean;
		isPrevMonth: boolean;
		isNextMonth: boolean;
		isToday: boolean;
		isSunday: boolean;
		isRLD: boolean;
		feastDay: string | null;
		sundayName: string | null;
		liturgicalColor: 'red' | 'purple' | 'white' | 'green';
	}

	let calendarDays = $derived.by(() => {
		const days: CalendarDay[] = [];

		// First day of current month
		const firstDay = new Date(currentYear, currentMonth, 1);
		const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

		// Last day of current month
		const lastDay = new Date(currentYear, currentMonth + 1, 0);
		const daysInMonth = lastDay.getDate();

		// Previous month days to fill the beginning
		const prevMonthLastDay = new Date(currentYear, currentMonth, 0);
		const daysInPrevMonth = prevMonthLastDay.getDate();

		// Add previous month's overflow days
		for (let i = startingDayOfWeek - 1; i >= 0; i--) {
			const dayNum = daysInPrevMonth - i;
			const date = new Date(currentYear, currentMonth - 1, dayNum);
			const month = currentMonth === 0 ? 12 : currentMonth;
			const year = currentMonth === 0 ? currentYear - 1 : currentYear;
			const feastDay = getFeastDay(month, dayNum);
			const isSunday = date.getDay() === 0;
			const sundayKey = isSunday ? getSundayLectionaryKey(year, month, dayNum) : null;
			const sundayName = sundayKey ? formatSundayName(sundayKey) : null;

			days.push({
				date,
				dayOfMonth: dayNum,
				isCurrentMonth: false,
				isPrevMonth: true,
				isNextMonth: false,
				isToday: isToday(date),
				isSunday,
				isRLD: isRedLetterDay(month, dayNum),
				feastDay: feastDay?.name || null,
				sundayName,
				liturgicalColor: getLiturgicalColor(year, month, dayNum, sundayKey)
			});
		}

		// Add current month's days
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(currentYear, currentMonth, day);
			const month = currentMonth + 1;
			const feastDay = getFeastDay(month, day);
			const isSunday = date.getDay() === 0;
			const sundayKey = isSunday ? getSundayLectionaryKey(currentYear, month, day) : null;
			const sundayName = sundayKey ? formatSundayName(sundayKey) : null;

			days.push({
				date,
				dayOfMonth: day,
				isCurrentMonth: true,
				isPrevMonth: false,
				isNextMonth: false,
				isToday: isToday(date),
				isSunday,
				isRLD: isRedLetterDay(month, day),
				feastDay: feastDay?.name || null,
				sundayName,
				liturgicalColor: getLiturgicalColor(currentYear, month, day, sundayKey)
			});
		}

		// Add next month's overflow days to complete the grid
		const totalDaysShown = days.length;
		const remainingDays = 7 - (totalDaysShown % 7);

		if (remainingDays < 7) {
			for (let day = 1; day <= remainingDays; day++) {
				const date = new Date(currentYear, currentMonth + 1, day);
				const month = currentMonth === 11 ? 1 : currentMonth + 2;
				const year = currentMonth === 11 ? currentYear + 1 : currentYear;
				const feastDay = getFeastDay(month, day);
				const isSunday = date.getDay() === 0;
				const sundayKey = isSunday ? getSundayLectionaryKey(year, month, day) : null;
				const sundayName = sundayKey ? formatSundayName(sundayKey) : null;

				days.push({
					date,
					dayOfMonth: day,
					isCurrentMonth: false,
					isPrevMonth: false,
					isNextMonth: true,
					isToday: isToday(date),
					isSunday,
					isRLD: isRedLetterDay(month, day),
					feastDay: feastDay?.name || null,
					sundayName,
					liturgicalColor: getLiturgicalColor(year, month, day, sundayKey)
				});
			}
		}

		return days;
	});

	function isToday(date: Date): boolean {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	function formatSundayName(sundayKey: string): string {
		// Format Sunday names for display
		if (sundayKey.startsWith('proper-')) {
			const properNum = sundayKey.split('-')[1];
			return `Proper ${properNum}`;
		}

		// Get full name from Sunday lectionary
		const sundayData = getSundayReadings(sundayKey);
		if (sundayData) {
			return sundayData.name;
		}

		// Fallback: capitalize and format the key
		return sundayKey
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	function getLiturgicalColor(
		year: number,
		month: number,
		day: number,
		sundayKey: string | null
	): 'red' | 'purple' | 'white' | 'green' {
		// 1. Check if this is a feast day with its own color
		const feastDay = getFeastDay(month, day);
		if (feastDay?.color) {
			return feastDay.color;
		}

		// 2. Check if this is a Sunday with its own color
		if (sundayKey) {
			const sundayLectionary = getSundayReadings(sundayKey);
			if (sundayLectionary?.color) {
				return sundayLectionary.color;
			}
		}

		// 3. For weekdays, inherit color from previous Sunday
		const date = new Date(year, month - 1, day);
		const currentDayOfWeek = date.getDay(); // 0 = Sunday

		if (currentDayOfWeek !== 0) {
			// Go back to find the most recent Sunday
			const daysBack = currentDayOfWeek;
			const previousSunday = new Date(date);
			previousSunday.setDate(date.getDate() - daysBack);

			const sundayMonth = previousSunday.getMonth() + 1;
			const sundayDay = previousSunday.getDate();
			const sundayYear = previousSunday.getFullYear();

			// Get the Sunday lectionary key for the previous Sunday
			const prevSundayKey = getSundayLectionaryKey(sundayYear, sundayMonth, sundayDay);
			if (prevSundayKey) {
				const prevSundayLectionary = getSundayReadings(prevSundayKey);
				if (prevSundayLectionary?.color) {
					return prevSundayLectionary.color;
				}
			}
		}

		// 4. Default fallback
		return 'green';
	}

	function previousMonth() {
		currentDate = new Date(currentYear, currentMonth - 1, 1);
	}

	function nextMonth() {
		currentDate = new Date(currentYear, currentMonth + 1, 1);
	}

	function goToToday() {
		currentDate = new Date();
	}

	function goToNextEaster() {
		const today = new Date();
		const currentYearEaster = calculateEaster(today.getFullYear());

		// If Easter hasn't happened yet this year, go to this year's Easter
		// Otherwise, go to next year's Easter
		let easterDate: Date;
		if (today < currentYearEaster) {
			easterDate = currentYearEaster;
		} else {
			easterDate = calculateEaster(today.getFullYear() + 1);
		}

		// Navigate to the month containing Easter
		currentDate = new Date(easterDate.getFullYear(), easterDate.getMonth(), 1);
	}

	function getDayLink(day: CalendarDay): string {
		const month = day.date.getMonth() + 1;
		const dayNum = day.date.getDate();
		return `${base}/readings/${month}/${dayNum}`;
	}
</script>

<div class="mx-auto max-w-5xl px-4 py-6">
	<!-- Calendar Header -->
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-gray-900">
			{monthNames[currentMonth]}
			{currentYear}
		</h1>
		<div class="flex gap-2">
			<button
				onclick={previousMonth}
				class="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
			>
				Previous
			</button>
			<button
				onclick={goToToday}
				class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
			>
				Today
			</button>
			<button
				onclick={goToNextEaster}
				class="rounded-md border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 shadow hover:bg-purple-100"
			>
				Next Easter
			</button>
			<button
				onclick={nextMonth}
				class="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
			>
				Next
			</button>
		</div>
	</div>

	<!-- Calendar Grid -->
	<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
		<!-- Day Headers -->
		<div class="grid grid-cols-7 border-b bg-gray-50">
			{#each dayNames as day}
				<div
					class="border-r px-2 py-3 text-center text-sm font-semibold text-gray-900 last:border-r-0"
				>
					{day}
				</div>
			{/each}
		</div>

		<!-- Calendar Days -->
		<div class="grid grid-cols-7">
			{#each calendarDays as day}
				<a
					href={getDayLink(day)}
					class="min-h-24 border-r border-b p-2 transition-colors last:border-r-0
						{day.liturgicalColor === 'red'
						? 'bg-red-50 hover:bg-red-100'
						: day.liturgicalColor === 'purple'
							? 'bg-purple-50 hover:bg-purple-100'
							: day.liturgicalColor === 'white'
								? 'bg-white hover:bg-gray-50'
								: 'bg-green-50 hover:bg-green-100'}
						{day.isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}"
				>
					<div class="flex h-full flex-col">
						<div class="mb-1 flex items-center justify-between">
							<span
								class="text-sm font-medium text-gray-900
								{day.isToday ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white' : ''}
								{day.isRLD ? 'font-bold text-red-600' : ''}"
							>
								{day.dayOfMonth}
							</span>
						</div>
						{#if day.sundayName}
							<div class="mt-1 text-xs font-medium text-blue-700">
								{day.sundayName}
							</div>
						{/if}
						{#if day.feastDay}
							<div
								class="mt-1 text-xs {day.isRLD ? 'font-semibold text-red-700' : 'text-gray-600'}"
							>
								{day.feastDay}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Legend -->
	<div class="mt-4 flex gap-6 text-sm text-gray-600">
		<div class="flex items-center gap-2">
			<div class="h-4 w-4 rounded border border-gray-300 bg-white"></div>
			<span>Regular Day</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="h-4 w-4 rounded border border-gray-300 bg-red-50"></div>
			<span>Red Letter Day</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="h-4 w-4 rounded border-2 border-blue-500 bg-white"></div>
			<span>Today</span>
		</div>
	</div>
</div>
