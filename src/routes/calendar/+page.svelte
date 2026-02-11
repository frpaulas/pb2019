<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getFeastDay, isRedLetterDay, getOriginalFeastDateKey } from '$lib/calendar/rlds';
	import rldEucharistData from '$lib/calendar/rld_eucharist.json';
	import {
		getSundayLectionaryKey,
		getSundayLectionaryKeyForAnyDate,
		calculateEaster,
		calculateLiturgicalDates,
		getHolyWeekLectionaryKey
	} from '$lib/calendar/sunday_key_mapping';
	import {
		getSundayReadings,
		getReadings,
		getLiturgicalYearCycle,
		type Reading
	} from '$lib/calendar/sunday_lectionary';
	import { scriptureModal } from '$lib/stores/scriptureModal';
	import { psalmModal, parsePsalmRef } from '$lib/stores/psalmModal';

	interface RLDEucharist {
		name: string;
		ot: string;
		psalm: string;
		epistle: string;
		gospel: string;
		color?: string;
	}

	type RLDEucharistDatabase = Record<string, RLDEucharist>;
	const rldEucharist: RLDEucharistDatabase = rldEucharistData as RLDEucharistDatabase;

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
		sundayName: string | null; // Short name for calendar cells
		sundayFullName: string | null; // Full name for header display
		liturgicalColor: 'red' | 'purple' | 'white' | 'green' | 'black';
		holyWeekName: string | null; // Name for Holy Week days (e.g., "Maundy Thursday")
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
			const feastDay = getFeastDay(month, dayNum, year);
			const isSunday = date.getDay() === 0;
			const holyWeekKey = getHolyWeekLectionaryKey(year, month, dayNum);
			const sundayKey = isSunday
				? holyWeekKey || getSundayLectionaryKey(year, month, dayNum)
				: null;
			const sundayName = sundayKey ? formatSundayName(sundayKey) : null;
			const sundayFullName = sundayKey ? formatSundayFullName(sundayKey) : null;
			const holyWeekName = holyWeekKey ? getHolyWeekName(year, month, dayNum) : null;

			days.push({
				date,
				dayOfMonth: dayNum,
				isCurrentMonth: false,
				isPrevMonth: true,
				isNextMonth: false,
				isToday: isToday(date),
				isSunday,
				isRLD: isRedLetterDay(month, dayNum, year),
				feastDay: holyWeekKey ? null : feastDay?.name || null, // Hide saints during Holy Week
				sundayName,
				sundayFullName,
				liturgicalColor: getLiturgicalColor(year, month, dayNum, sundayKey),
				holyWeekName
			});
		}

		// Add current month's days
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(currentYear, currentMonth, day);
			const month = currentMonth + 1;
			const feastDay = getFeastDay(month, day, currentYear);
			const isSunday = date.getDay() === 0;
			const holyWeekKey = getHolyWeekLectionaryKey(currentYear, month, day);
			const sundayKey = isSunday
				? holyWeekKey || getSundayLectionaryKey(currentYear, month, day)
				: null;
			const sundayName = sundayKey ? formatSundayName(sundayKey) : null;
			const sundayFullName = sundayKey ? formatSundayFullName(sundayKey) : null;
			const holyWeekName = holyWeekKey ? getHolyWeekName(currentYear, month, day) : null;

			days.push({
				date,
				dayOfMonth: day,
				isCurrentMonth: true,
				isPrevMonth: false,
				isNextMonth: false,
				isToday: isToday(date),
				isSunday,
				isRLD: isRedLetterDay(month, day, currentYear),
				feastDay: holyWeekKey ? null : feastDay?.name || null, // Hide saints during Holy Week
				sundayName,
				sundayFullName,
				liturgicalColor: getLiturgicalColor(currentYear, month, day, sundayKey),
				holyWeekName
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
				const feastDay = getFeastDay(month, day, year);
				const isSunday = date.getDay() === 0;
				const holyWeekKey = getHolyWeekLectionaryKey(year, month, day);
				const sundayKey = isSunday ? holyWeekKey || getSundayLectionaryKey(year, month, day) : null;
				const sundayName = sundayKey ? formatSundayName(sundayKey) : null;
				const sundayFullName = sundayKey ? formatSundayFullName(sundayKey) : null;
				const holyWeekName = holyWeekKey ? getHolyWeekName(year, month, day) : null;

				days.push({
					date,
					dayOfMonth: day,
					isCurrentMonth: false,
					isPrevMonth: false,
					isNextMonth: true,
					isToday: isToday(date),
					isSunday,
					isRLD: isRedLetterDay(month, day, year),
					feastDay: holyWeekKey ? null : feastDay?.name || null, // Hide saints during Holy Week
					sundayName,
					sundayFullName,
					liturgicalColor: getLiturgicalColor(year, month, day, sundayKey),
					holyWeekName
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
		// Get short name from Sunday lectionary
		const sundayData = getSundayReadings(sundayKey);
		if (sundayData?.altName) {
			return sundayData.altName;
		}

		// Fallback: capitalize and format the key
		return sundayKey
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	function formatSundayFullName(sundayKey: string): string {
		// Get full name from Sunday lectionary
		const sundayData = getSundayReadings(sundayKey);
		if (sundayData?.name) {
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
	): 'red' | 'purple' | 'white' | 'green' | 'black' {
		// 1. Check if this is a feast day with its own color
		const feastDay = getFeastDay(month, day, year);
		if (feastDay?.color) {
			return feastDay.color;
		}

		// 2. Check Holy Week days (they have their own colors)
		const holyWeekKey = getHolyWeekLectionaryKey(year, month, day);
		if (holyWeekKey) {
			const holyWeekLectionary = getSundayReadings(holyWeekKey);
			if (holyWeekLectionary?.color) {
				return holyWeekLectionary.color as 'red' | 'purple' | 'white' | 'green' | 'black';
			}
		}

		// 3. Check if this is a Sunday with its own color
		if (sundayKey) {
			const sundayLectionary = getSundayReadings(sundayKey);
			if (sundayLectionary?.color) {
				return sundayLectionary.color as 'red' | 'purple' | 'white' | 'green' | 'black';
			}
		}

		// 4. Special case: Ash Wednesday through Saturday before Lent 1
		// These days are in Lent but the previous Sunday is still Last Epiphany (green)
		const date = new Date(year, month - 1, day);
		const dates = calculateLiturgicalDates(year);
		if (date >= dates.ashWednesday && date < dates.lent1) {
			return 'purple';
		}

		// 5. For weekdays, inherit color from previous Sunday
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
					return prevSundayLectionary.color as 'red' | 'purple' | 'white' | 'green' | 'black';
				}
			}
		}

		// 6. Default fallback
		return 'green';
	}

	function getHolyWeekName(year: number, month: number, day: number): string | null {
		const holyWeekKey = getHolyWeekLectionaryKey(year, month, day);
		if (holyWeekKey) {
			const lectionary = getSundayReadings(holyWeekKey);
			return lectionary?.altName || lectionary?.name || null;
		}
		return null;
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

	// Touch/hover state for mobile
	let hoveredDay = $state<CalendarDay | null>(null);
	let selectedDay = $state<CalendarDay | null>(null);
	let isFingerOverGrid = $state(true);

	function handleDayHover(day: CalendarDay) {
		hoveredDay = day;
	}

	function handleDayLeave() {
		hoveredDay = null;
	}

	let touchStartDay = $state<CalendarDay | null>(null);

	function handleTouchStart(event: TouchEvent, day: CalendarDay) {
		event.preventDefault();
		touchStartDay = day;
		handleDayHover(day);
		isFingerOverGrid = true;
	}

	function handleTouchMove(event: TouchEvent) {
		event.preventDefault();
		const touch = event.touches[0];
		const element = document.elementFromPoint(touch.clientX, touch.clientY);
		if (element) {
			// Find the closest calendar day link
			const dayLink = element.closest('a[href*="/readings/"]');
			if (dayLink) {
				// Extract the date from the href to find the matching day
				const href = dayLink.getAttribute('href');
				if (href) {
					const match = href.match(/\/readings\/(\d+)\/(\d+)/);
					if (match) {
						const month = parseInt(match[1]);
						const dayNum = parseInt(match[2]);
						// Find the matching day in calendarDays
						const day = calendarDays.find(
							(d) => d.date.getMonth() + 1 === month && d.date.getDate() === dayNum
						);
						if (day) {
							handleDayHover(day);
							isFingerOverGrid = true;
						}
					}
				}
			} else {
				// Finger moved outside the grid
				isFingerOverGrid = false;
			}
		} else {
			// Finger moved outside the grid
			isFingerOverGrid = false;
		}
	}

	function handleTouchEnd(event: TouchEvent, day: CalendarDay) {
		event.preventDefault();
		// Navigate to the day where finger lifted - only if still over grid
		if (isFingerOverGrid) {
			goto(getDayLink(day));
		}
		// Reset state
		isFingerOverGrid = true;
	}

	// Get display info - prioritize hovered, then selected, then today
	let displayDay = $derived(
		hoveredDay || selectedDay || calendarDays.find((d) => d.isToday) || null
	);

	// Update selected day when display day changes (for persistence)
	$effect(() => {
		if (displayDay && !hoveredDay) {
			selectedDay = displayDay;
		}
	});

	// Calculate the next Sunday from a given date
	function getNextSunday(date: Date): Date {
		const result = new Date(date);
		const dayOfWeek = result.getDay();
		// If it's Sunday (0), go to next Sunday (7 days); otherwise days until Sunday
		const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
		result.setDate(result.getDate() + daysUntilSunday);
		return result;
	}

	// Get eucharist readings for the NEXT Sunday from the display day
	let displayReadings = $derived.by(() => {
		if (!displayDay) return null;

		const nextSunday = getNextSunday(displayDay.date);
		const year = nextSunday.getFullYear();
		const month = nextSunday.getMonth() + 1;
		const day = nextSunday.getDate();

		// Check if next Sunday is an RLD with readings
		const originalFeastKey = getOriginalFeastDateKey(month, day, year);
		const rldReadings = originalFeastKey ? rldEucharist[originalFeastKey] : null;

		if (rldReadings) {
			// Use RLD readings for next Sunday
			return {
				isRLD: true,
				rldName: rldReadings.name,
				readings: {
					ot: rldReadings.ot,
					psalm: rldReadings.psalm,
					epistle: rldReadings.epistle,
					gospel: rldReadings.gospel
				}
			};
		}

		// Get next Sunday's lectionary readings
		const sundayKey = getSundayLectionaryKeyForAnyDate(year, month, day);
		if (!sundayKey) return null;

		// Get liturgical year cycle
		const liturgicalYear = getLiturgicalYearCycle(year);

		// Get the readings
		const readings = getReadings(sundayKey, liturgicalYear);
		if (!readings) return null;

		// Get the Sunday name
		const sundayInfo = getSundayReadings(sundayKey);

		return {
			isRLD: false,
			sundayKey,
			sundayName: sundayInfo?.name || sundayKey,
			liturgicalYear,
			readings
		};
	});

	// Open scripture modal
	function openScripture(reference: string) {
		scriptureModal.open(reference, null);
	}

	// Open psalm modal
	function openPsalm(psalmRef: string) {
		// Handle formats like "Ps 122", "Ps 80 or 80:1-7"
		let ref = psalmRef.replace(/^(Ps|Psalm)\s*/i, '');

		// Take the first option if there's an "or"
		if (ref.includes(' or ')) {
			ref = ref.split(' or ')[0].trim();
		}

		// Strip optional verses in parentheses
		ref = ref.replace(/\([^)]+\)/g, '').trim();

		const parsed = parsePsalmRef(ref);
		psalmModal.open([parsed]);
	}
</script>

<div class="mx-auto max-w-5xl px-2 py-4 md:px-4 md:py-6" style="overscroll-behavior: contain;">
	<!-- Calendar Header -->
	<div class="mb-4 md:mb-6">
		<!-- Month/Year - Centered -->
		<h1 class="text-center text-2xl font-bold text-gray-900 md:text-3xl">
			{monthNames[currentMonth]}
			{currentYear}
		</h1>

		<!-- Selected Date Display -->
		<div class="mt-3 rounded-lg border-2 border-blue-500 bg-blue-50 px-3 py-2 md:mt-4">
			{#if displayDay}
				<div class="text-center text-sm font-semibold text-blue-900">
					{displayDay.date.toLocaleDateString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				</div>
				{#if displayDay.sundayFullName || displayDay.holyWeekName}
					<div class="mt-0.5 text-center text-xs font-medium text-blue-700">
						{displayDay.sundayFullName || displayDay.holyWeekName}
					</div>
				{/if}
				{#if displayDay.feastDay}
					<div
						class="mt-0.5 text-center text-xs {displayDay.isRLD
							? 'font-semibold text-red-700'
							: 'text-gray-700'}"
					>
						{displayDay.feastDay}
					</div>
				{/if}

				<!-- Eucharist Readings -->
				{#if displayReadings}
					<div class="mt-3 border-t border-blue-200 pt-2">
						<div class="mb-1 text-center text-xs text-gray-600">
							{#if displayReadings.isRLD}
								Eucharistic readings for next Sunday: {displayReadings.rldName}
							{:else}
								Eucharistic readings for next Sunday: {displayReadings.sundayName} (Year {displayReadings.liturgicalYear})
							{/if}
						</div>
						<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:grid-cols-4">
							<div>
								<span class="text-gray-500">OT:</span>
								<button
									type="button"
									onclick={() => openScripture(displayReadings.readings.ot)}
									class="ml-1 text-blue-600 underline hover:text-blue-800"
								>
									{displayReadings.readings.ot}
								</button>
							</div>
							<div>
								<span class="text-gray-500">Psalm:</span>
								<button
									type="button"
									onclick={() => openPsalm(displayReadings.readings.psalm)}
									class="ml-1 text-blue-600 underline hover:text-blue-800"
								>
									{displayReadings.readings.psalm}
								</button>
							</div>
							<div>
								<span class="text-gray-500">Epistle:</span>
								<button
									type="button"
									onclick={() => openScripture(displayReadings.readings.epistle)}
									class="ml-1 text-blue-600 underline hover:text-blue-800"
								>
									{displayReadings.readings.epistle}
								</button>
							</div>
							<div>
								<span class="text-gray-500">Gospel:</span>
								<button
									type="button"
									onclick={() => openScripture(displayReadings.readings.gospel)}
									class="ml-1 text-blue-600 underline hover:text-blue-800"
								>
									{displayReadings.readings.gospel}
								</button>
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>

		<!-- Navigation Buttons - Stack on mobile, row on desktop -->
		<div class="mt-3 flex flex-col gap-2 md:mt-4 md:flex-row md:justify-center">
			<button
				onclick={previousMonth}
				class="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
			>
				← Previous Month
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
				Next Month →
			</button>
		</div>
	</div>

	<!-- Calendar Grid -->
	<div class="rounded-lg border border-gray-300 bg-white shadow" style="touch-action: none;">
		<!-- Day Headers - More compact on mobile -->
		<div class="grid grid-cols-7 gap-0 border-b border-gray-300 bg-gray-50">
			{#each dayNames as day}
				<div
					class="overflow-hidden px-1 py-2 text-center text-xs font-semibold text-gray-900 md:px-2 md:py-3 md:text-sm"
				>
					{day}
				</div>
			{/each}
		</div>

		<!-- Calendar Days -->
		<div class="grid grid-cols-7 gap-0">
			{#each calendarDays as day, index}
				{@const isFirstInRow = index % 7 === 0}
				{@const isLastInRow = index % 7 === 6}
				<a
					href={getDayLink(day)}
					onmouseenter={() => handleDayHover(day)}
					onmouseleave={handleDayLeave}
					ontouchstart={(e) => handleTouchStart(e, day)}
					ontouchmove={handleTouchMove}
					ontouchend={(e) => handleTouchEnd(e, day)}
					class="relative block p-1 transition-colors md:h-24 md:p-1.5
						{day.liturgicalColor === 'red'
						? 'bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900'
						: day.liturgicalColor === 'purple'
							? 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900'
							: day.liturgicalColor === 'white'
								? 'hover:bg-gray-50 dark:hover:bg-amber-200'
								: day.liturgicalColor === 'black'
									? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'
									: 'bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900'}
						{day.isToday ? 'z-10' : ''}
						{hoveredDay === day ? 'z-10' : ''}"
					style="border: 1px solid rgb(209 213 219); {day.liturgicalColor === 'white'
						? 'background-color: #fef3c7;'
						: ''} {day.isToday
						? 'box-shadow: inset 0 0 0 3px rgb(59 130 246); background-color: rgba(59, 130, 246, 0.2);'
						: hoveredDay === day
							? 'box-shadow: inset 0 0 0 3px rgb(37, 99, 235); background-color: rgba(37, 99, 235, 0.3);'
							: ''}"
				>
					<!-- Mobile: Just day number and color -->
					<div class="flex h-full flex-col md:hidden">
						<span
							class="text-xs font-semibold {day.isRLD
								? 'font-bold text-red-700'
								: day.liturgicalColor === 'black'
									? 'text-gray-100 dark:text-gray-100'
									: 'text-gray-800'} {day.liturgicalColor === 'white'
								? ''
								: day.liturgicalColor === 'black'
									? ''
									: day.isRLD
										? 'dark:text-red-300'
										: 'dark:text-gray-50'}
							{day.isToday
								? 'flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 !text-white'
								: ''}"
						>
							{day.dayOfMonth}
						</span>
					</div>

					<!-- Desktop: Full details -->
					<div class="hidden h-full flex-col overflow-hidden md:flex">
						<div class="mb-1 flex items-center justify-between">
							<span
								class="text-sm font-semibold {day.isRLD
									? 'font-bold text-red-700'
									: day.liturgicalColor === 'black'
										? 'text-gray-100 dark:text-gray-100'
										: 'text-gray-800'} {day.liturgicalColor === 'white'
									? ''
									: day.liturgicalColor === 'black'
										? ''
										: day.isRLD
											? 'dark:text-red-300'
											: 'dark:text-gray-50'}
								{day.isToday
									? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 !text-white'
									: ''}"
							>
								{day.dayOfMonth}
							</span>
						</div>
						{#if day.sundayName || day.holyWeekName}
							<div
								class="mt-0 overflow-hidden text-xs leading-tight font-semibold {day.liturgicalColor ===
								'black'
									? 'text-gray-100 dark:text-gray-100'
									: 'text-blue-800'} {day.liturgicalColor === 'white' ||
								day.liturgicalColor === 'black'
									? ''
									: 'dark:text-blue-200'}"
								style="word-break: break-word; overflow-wrap: break-word;"
							>
								{day.sundayName || day.holyWeekName}
							</div>
						{/if}
						{#if day.feastDay}
							<div
								class="mt-1 overflow-hidden text-xs leading-tight font-semibold {day.isRLD
									? 'text-red-700'
									: 'text-gray-800'} {day.liturgicalColor === 'white'
									? ''
									: day.isRLD
										? 'dark:text-red-300'
										: 'dark:text-gray-200'}"
								style="word-break: break-word; overflow-wrap: break-word;"
							>
								{day.feastDay}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
