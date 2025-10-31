<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import dailyLectionaryData from '$lib/calendar/daily_lectionary_partial.json';
	import rldEucharistData from '$lib/calendar/rld_eucharist.json';
	import { getFeastDay, isRedLetterDay } from '$lib/calendar/rlds';
	import { calendarDateToLdoy, ldoyToCalendarDate } from '$lib/calendar/date_conversion';
	import {
		getSundayReadings,
		getLiturgicalYearCycle,
		type Reading
	} from '$lib/calendar/sunday_lectionary';
	import { getSundayLectionaryKey } from '$lib/calendar/sunday_key_mapping';

	interface DailyReading {
		req: string;
		alt?: string;
	}

	interface DailyOffice {
		ot: DailyReading;
		nt: DailyReading;
		psalm60?: string[];
		psalm?: string[];
	}

	interface DailyLectionary {
		morning: DailyOffice;
		evening: DailyOffice;
	}

	interface RLDEucharist {
		name: string;
		ot: string;
		psalm: string;
		epistle: string;
		gospel: string;
	}

	type LectionaryDatabase = Record<string, DailyLectionary>;
	type RLDEucharistDatabase = Record<string, RLDEucharist>;

	const db: LectionaryDatabase = dailyLectionaryData as LectionaryDatabase;
	const rldEucharist: RLDEucharistDatabase = rldEucharistData as RLDEucharistDatabase;

	// Get route parameters
	const month = parseInt($page.params.month);
	const day = parseInt($page.params.day);
	const year = new Date().getFullYear();

	// Get feast day information
	const feastDay = getFeastDay(month, day);
	const isRLD = isRedLetterDay(month, day);

	// Get RLD Eucharist readings if this is an RLD
	function getRLDEucharistReadings(): RLDEucharist | null {
		if (!isRLD) return null;

		// Try regular date format first
		const key = `${month}-${day}`;
		if (rldEucharist[key]) {
			return rldEucharist[key];
		}

		// Check for special feast days (kebab-case keys)
		if (feastDay?.name) {
			const specialKeys = ['ash-wednesday', 'ascension', 'pentecost'];
			const kebabName = feastDay.name.toLowerCase().replace(/\s+/g, '-');
			if (specialKeys.includes(kebabName) && rldEucharist[kebabName]) {
				return rldEucharist[kebabName];
			}
		}

		return null;
	}

	const rldEucharistReadings = getRLDEucharistReadings();

	// Get daily lectionary key - check if it's a special feast day first
	function getDailyLectionaryKey(): string | null {
		// Check for special feast days (these use kebab-case keys)
		if (feastDay?.name) {
			const specialKeys = ['ash-wednesday', 'ascension', 'pentecost'];
			const kebabName = feastDay.name.toLowerCase().replace(/\s+/g, '-');
			if (specialKeys.includes(kebabName) && db[kebabName]) {
				return kebabName;
			}
		}
		// Regular date format
		const key = `${month}-${day}`;
		return db[key] ? key : null;
	}

	const lectionaryKey = getDailyLectionaryKey();
	const dailyReadings = lectionaryKey ? db[lectionaryKey] : null;

	// Find the previous Sunday for Eucharist readings
	function getPreviousSundayInfo(): {
		date: Date;
		month: number;
		day: number;
		sundayKey: string | null;
		readings: Reading | null;
	} | null {
		const currentDate = new Date(year, month - 1, day);
		const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday

		// Go back to find the most recent Sunday
		let daysBack = currentDayOfWeek === 0 ? 7 : currentDayOfWeek; // If today is Sunday, go back to last Sunday
		const previousSunday = new Date(currentDate);
		previousSunday.setDate(currentDate.getDate() - daysBack);

		const sundayMonth = previousSunday.getMonth() + 1;
		const sundayDay = previousSunday.getDate();
		const sundayYear = previousSunday.getFullYear();

		// Get the Sunday lectionary key for this Sunday
		const sundayKey = getSundayLectionaryKey(sundayYear, sundayMonth, sundayDay);

		// Get the readings for this Sunday and year cycle
		let readings: Reading | null = null;
		if (sundayKey) {
			const liturgicalYear = getLiturgicalYearCycle(year);
			const sundayLectionary = getSundayReadings(sundayKey);
			if (sundayLectionary) {
				readings = sundayLectionary[`year${liturgicalYear}`];
			}
		}

		return {
			date: previousSunday,
			month: sundayMonth,
			day: sundayDay,
			sundayKey,
			readings
		};
	}

	const previousSundayInfo = !isRLD ? getPreviousSundayInfo() : null;

	// Get Sunday information if this is a Sunday
	const currentDate = new Date(year, month - 1, day);
	const isSunday = currentDate.getDay() === 0;
	const sundayKey = isSunday ? getSundayLectionaryKey(year, month, day) : null;
	const sundayLectionary = sundayKey ? getSundayReadings(sundayKey) : null;

	function formatSundayName(key: string): string {
		if (key.startsWith('proper-')) {
			const properNum = key.split('-')[1];
			return `Proper ${properNum}`;
		}
		return sundayLectionary?.name || key;
	}

	// Format date for display
	const dateStr = new Date(year, month - 1, day).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<svelte:head>
	<title>Daily Readings - {dateStr}</title>
</svelte:head>

<div class="readings-container">
	<header>
		<a href="{base}/calendar" class="back-link">← Back to Calendar</a>
		<h1>{dateStr}</h1>
		{#if sundayKey}
			<h2 class="sunday-name">
				{formatSundayName(sundayKey)}
				<span class="liturgical-year-badge">
					Year {getLiturgicalYearCycle(year)}
				</span>
			</h2>
		{/if}
		{#if feastDay}
			<h2 class="feast-day" class:rld={isRLD}>
				{feastDay.name}
				{#if feastDay.subtitle}
					<span class="subtitle">{feastDay.subtitle}</span>
				{/if}
			</h2>
		{/if}
	</header>

	{#if dailyReadings}
		<section class="daily-office">
			<h2>Morning Prayer</h2>
			<div class="office-readings">
				<div class="reading-section">
					<h3>Old Testament</h3>
					<p class="reading-ref">{dailyReadings.morning.ot.req}</p>
					{#if dailyReadings.morning.ot.alt}
						<p class="alt-reading">Alt: {dailyReadings.morning.ot.alt}</p>
					{/if}
				</div>

				<div class="reading-section">
					<h3>New Testament</h3>
					<p class="reading-ref">{dailyReadings.morning.nt.req}</p>
					{#if dailyReadings.morning.nt.alt}
						<p class="alt-reading">Alt: {dailyReadings.morning.nt.alt}</p>
					{/if}
				</div>

				<div class="reading-section">
					<h3>Psalms</h3>
					<p class="reading-ref">
						{#if dailyReadings.morning.psalm}
							{dailyReadings.morning.psalm.join(', ')}
						{:else if dailyReadings.morning.psalm60}
							{dailyReadings.morning.psalm60.join(', ')}
						{:else}
							Not specified
						{/if}
					</p>
				</div>
			</div>
		</section>

		<section class="daily-office">
			<h2>Evening Prayer</h2>
			<div class="office-readings">
				<div class="reading-section">
					<h3>Old Testament</h3>
					<p class="reading-ref">{dailyReadings.evening.ot.req}</p>
					{#if dailyReadings.evening.ot.alt}
						<p class="alt-reading">Alt: {dailyReadings.evening.ot.alt}</p>
					{/if}
				</div>

				<div class="reading-section">
					<h3>New Testament</h3>
					<p class="reading-ref">{dailyReadings.evening.nt.req}</p>
					{#if dailyReadings.evening.nt.alt}
						<p class="alt-reading">Alt: {dailyReadings.evening.nt.alt}</p>
					{/if}
				</div>

				<div class="reading-section">
					<h3>Psalms</h3>
					<p class="reading-ref">
						{#if dailyReadings.evening.psalm}
							{dailyReadings.evening.psalm.join(', ')}
						{:else if dailyReadings.evening.psalm60}
							{dailyReadings.evening.psalm60.join(', ')}
						{:else}
							Not specified
						{/if}
					</p>
				</div>
			</div>
		</section>

		<section class="eucharist-readings">
			<h2>Holy Eucharist</h2>
			{#if rldEucharistReadings}
				<div class="office-readings">
					<div class="reading-section">
						<h3>Old Testament</h3>
						<p class="reading-ref">{rldEucharistReadings.ot}</p>
					</div>
					<div class="reading-section">
						<h3>Psalm</h3>
						<p class="reading-ref">{rldEucharistReadings.psalm}</p>
					</div>
					<div class="reading-section">
						<h3>Epistle</h3>
						<p class="reading-ref">{rldEucharistReadings.epistle}</p>
					</div>
					<div class="reading-section">
						<h3>Gospel</h3>
						<p class="reading-ref">{rldEucharistReadings.gospel}</p>
					</div>
				</div>
			{:else if previousSundayInfo?.readings}
				<p class="sunday-info">
					Readings from {previousSundayInfo.date.toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
					{#if previousSundayInfo.sundayKey}
						<span class="liturgical-year">
							(Year {getLiturgicalYearCycle(year)})
						</span>
					{/if}
				</p>
				<div class="office-readings">
					<div class="reading-section">
						<h3>Old Testament</h3>
						<p class="reading-ref">{previousSundayInfo.readings.ot}</p>
					</div>
					<div class="reading-section">
						<h3>Psalm</h3>
						<p class="reading-ref">{previousSundayInfo.readings.psalm}</p>
					</div>
					<div class="reading-section">
						<h3>Epistle</h3>
						<p class="reading-ref">{previousSundayInfo.readings.epistle}</p>
					</div>
					<div class="reading-section">
						<h3>Gospel</h3>
						<p class="reading-ref">{previousSundayInfo.readings.gospel}</p>
					</div>
				</div>
			{:else if previousSundayInfo}
				<p class="note">
					Use readings from {previousSundayInfo.date.toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
					<a
						href="{base}/readings/{previousSundayInfo.month}/{previousSundayInfo.day}"
						class="sunday-link"
					>
						(View Sunday readings)
					</a>
				</p>
			{:else}
				<p class="note">Use readings from the previous Sunday</p>
			{/if}
		</section>
	{:else}
		<p class="error">No readings found for this date.</p>
	{/if}
</div>

<style>
	.readings-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	header {
		margin-bottom: 2rem;
		border-bottom: 2px solid #333;
		padding-bottom: 1rem;
	}

	.back-link {
		display: inline-block;
		color: #0066cc;
		text-decoration: none;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	h1 {
		font-size: 1.8rem;
		margin: 0.5rem 0;
		color: #222;
	}

	h2.sunday-name {
		font-size: 1.2rem;
		color: #0066cc;
		margin: 0.5rem 0;
		font-weight: 600;
	}

	.liturgical-year-badge {
		font-size: 0.9rem;
		color: #666;
		font-weight: normal;
		margin-left: 0.5rem;
	}

	h2.feast-day {
		font-size: 1.3rem;
		color: #666;
		margin: 0.5rem 0 0 0;
		font-weight: 500;
	}

	h2.feast-day.rld {
		color: #c00;
		font-weight: 600;
	}

	.subtitle {
		display: block;
		font-size: 0.9rem;
		font-weight: normal;
		color: #888;
		margin-top: 0.25rem;
	}

	section {
		margin: 2rem 0;
		padding: 1.5rem;
		background: #f9f9f9;
		border-radius: 8px;
		border-left: 4px solid #0066cc;
	}

	section.eucharist-readings {
		border-left-color: #8b4513;
	}

	section h2 {
		font-size: 1.4rem;
		margin: 0 0 1rem 0;
		color: #333;
	}

	.office-readings {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.reading-section h3 {
		font-size: 1rem;
		color: #555;
		margin: 0 0 0.5rem 0;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.reading-ref {
		font-size: 1.1rem;
		color: #222;
		margin: 0;
		font-weight: 500;
	}

	.alt-reading {
		font-size: 0.9rem;
		color: #666;
		margin: 0.25rem 0 0 0;
		font-style: italic;
	}

	.note {
		color: #666;
		font-style: italic;
		margin: 0;
	}

	.note.rld-note {
		color: #c00;
		font-weight: 500;
	}

	.sunday-info {
		color: #555;
		font-size: 0.95rem;
		margin: 0 0 1rem 0;
		font-style: italic;
	}

	.liturgical-year {
		color: #888;
		font-weight: normal;
		margin-left: 0.5rem;
	}

	.sunday-link {
		color: #0066cc;
		text-decoration: none;
		font-style: normal;
		margin-left: 0.5rem;
	}

	.sunday-link:hover {
		text-decoration: underline;
	}

	.error {
		color: #c00;
		font-size: 1.1rem;
		text-align: center;
		padding: 2rem;
	}

	@media (max-width: 640px) {
		.readings-container {
			padding: 1rem 0.5rem;
		}

		h1 {
			font-size: 1.4rem;
		}

		section {
			padding: 1rem;
		}
	}
</style>
