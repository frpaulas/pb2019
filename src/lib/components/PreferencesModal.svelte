<script lang="ts">
	import { preferencesModal } from '$lib/stores/preferencesModal';
	import {
		preferences,
		type OfficeTimes,
		type Theme,
		type PsalmVersion
	} from '$lib/stores/preferences';
	import { onMount } from 'svelte';

	let modalElement: HTMLDivElement;

	// Local state bound to inputs
	let psalmCycle = $state<30 | 60>(60);
	let psalmVersion = $state<PsalmVersion>('bcp');
	let fontSize = $state(1.0);
	let useDateOverride = $state(false);
	let dateOverrideValue = $state('');
	let officeTimes = $state<OfficeTimes>({
		morning: 1130,
		midday: 1500,
		evening: 2000
	});
	let theme = $state<Theme>('light');

	// Sync local state with store when modal opens
	$effect(() => {
		if ($preferencesModal.isOpen) {
			psalmCycle = $preferences.psalmCycle;
			psalmVersion = $preferences.psalmVersion;
			fontSize = $preferences.fontSize;
			useDateOverride = $preferences.dateOverride !== null;
			dateOverrideValue = $preferences.dateOverride || getTodayISO();
			officeTimes = { ...$preferences.officeTimes };
			theme = $preferences.theme;
		}
	});

	function getTodayISO(): string {
		const today = new Date();
		return today.toISOString().split('T')[0];
	}

	function close() {
		preferencesModal.close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!$preferencesModal.isOpen) return;
		if (event.key === 'Escape') {
			close();
		}
	}

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === modalElement) {
			close();
		}
	}

	// Save handlers - update store immediately on change
	function handlePsalmCycleChange(cycle: 30 | 60) {
		psalmCycle = cycle;
		preferences.setPsalmCycle(cycle);
	}

	function handlePsalmVersionChange(version: PsalmVersion) {
		psalmVersion = version;
		preferences.setPsalmVersion(version);
	}

	function handleFontSizeChange(event: Event) {
		const target = event.target as HTMLInputElement;
		fontSize = parseFloat(target.value);
		preferences.setFontSize(fontSize);
	}

	function handleDateOverrideToggle() {
		useDateOverride = !useDateOverride;
		if (useDateOverride) {
			preferences.setDateOverride(dateOverrideValue);
		} else {
			preferences.setDateOverride(null);
		}
	}

	function handleDateChange(event: Event) {
		const target = event.target as HTMLInputElement;
		dateOverrideValue = target.value;
		if (useDateOverride) {
			preferences.setDateOverride(dateOverrideValue);
		}
	}

	function handleOfficeTimeChange(office: keyof OfficeTimes, event: Event) {
		const target = event.target as HTMLInputElement;
		const [hours, minutes] = target.value.split(':').map(Number);
		const timeValue = hours * 100 + minutes;
		officeTimes[office] = timeValue;
		preferences.setOfficeTimes({ [office]: timeValue });
	}

	function formatTimeForInput(time: number): string {
		const hours = Math.floor(time / 100);
		const minutes = time % 100;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	function handleThemeChange(newTheme: Theme) {
		theme = newTheme;
		preferences.setTheme(newTheme);
	}

	function handleReset() {
		const defaults = preferences.getDefaults();
		psalmCycle = defaults.psalmCycle;
		psalmVersion = defaults.psalmVersion;
		fontSize = defaults.fontSize;
		useDateOverride = false;
		dateOverrideValue = getTodayISO();
		officeTimes = { ...defaults.officeTimes };
		theme = defaults.theme;
		preferences.reset();
	}

	// Format selected date for display
	let formattedDate = $derived(() => {
		if (!useDateOverride) return "Today's date";
		const date = new Date(dateOverrideValue);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	onMount(() => {
		const unsubscribe = preferencesModal.subscribe((state) => {
			if (state.isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		});

		return () => {
			unsubscribe();
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $preferencesModal.isOpen}
	<div
		bind:this={modalElement}
		class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[5em]"
		onclick={handleOverlayClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="preferences-modal-title"
	>
		<div
			class="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-2xl dark:bg-gray-800"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div
				class="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700"
			>
				<h2
					id="preferences-modal-title"
					class="text-xl font-semibold text-gray-900 dark:text-gray-100"
				>
					Settings
				</h2>
				<button
					type="button"
					onclick={close}
					class="flex h-8 w-8 items-center justify-center rounded-full text-2xl font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
					aria-label="Close modal"
				>
					&times;
				</button>
			</div>

			<!-- Content -->
			<div class="flex-1 space-y-6 overflow-y-auto overscroll-contain p-6">
				<!-- Psalm Cycle -->
				<section>
					<h3
						class="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300"
					>
						Psalm Cycle
					</h3>
					<p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
						Choose how psalms are assigned in the Daily Office.
					</p>
					<div class="flex gap-4">
						<label class="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								name="psalmCycle"
								value={60}
								checked={psalmCycle === 60}
								onchange={() => handlePsalmCycleChange(60)}
								class="h-4 w-4 text-blue-600"
							/>
							<span class="text-gray-700 dark:text-gray-300">60-day cycle</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								name="psalmCycle"
								value={30}
								checked={psalmCycle === 30}
								onchange={() => handlePsalmCycleChange(30)}
								class="h-4 w-4 text-blue-600"
							/>
							<span class="text-gray-700 dark:text-gray-300">30-day cycle</span>
						</label>
					</div>
				</section>

				<!-- Psalm Version -->
				<section>
					<h3
						class="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300"
					>
						Psalm Version
					</h3>
					<p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
						Choose which translation to use when viewing psalms from the Bible page.
					</p>
					<div class="flex gap-4">
						<label class="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								name="psalmVersion"
								value="bcp"
								checked={psalmVersion === 'bcp'}
								onchange={() => handlePsalmVersionChange('bcp')}
								class="h-4 w-4 text-blue-600"
							/>
							<span class="text-gray-700 dark:text-gray-300">BCP Psalter</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								name="psalmVersion"
								value="web"
								checked={psalmVersion === 'web'}
								onchange={() => handlePsalmVersionChange('web')}
								class="h-4 w-4 text-blue-600"
							/>
							<span class="text-gray-700 dark:text-gray-300">WEB Bible</span>
						</label>
					</div>
				</section>

				<!-- Font Size -->
				<section>
					<h3 class="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
						Font Size
					</h3>
					<div class="flex items-center gap-4">
						<span class="text-sm text-gray-500">A</span>
						<input
							type="range"
							min="0.8"
							max="1.4"
							step="0.05"
							value={fontSize}
							oninput={handleFontSizeChange}
							class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
						/>
						<span class="text-lg text-gray-500">A</span>
						<span class="w-12 text-right text-sm text-gray-600">{Math.round(fontSize * 100)}%</span>
					</div>
					<p
						class="mt-3 rounded border border-gray-200 bg-gray-50 p-3 font-serif dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
						style="font-size: calc(1rem * {fontSize});"
					>
						The Lord is my shepherd; I shall not want.
					</p>
				</section>

				<!-- Theme -->
				<section>
					<h3
						class="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300"
					>
						Appearance
					</h3>
					<div class="flex gap-4">
						<label class="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								name="theme"
								value="light"
								checked={theme === 'light'}
								onchange={() => handleThemeChange('light')}
								class="h-4 w-4 text-blue-600"
							/>
							<span class="text-gray-700 dark:text-gray-300">Light</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								name="theme"
								value="dark"
								checked={theme === 'dark'}
								onchange={() => handleThemeChange('dark')}
								class="h-4 w-4 text-blue-600"
							/>
							<span class="text-gray-700 dark:text-gray-300">Dark</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input
								type="radio"
								name="theme"
								value="system"
								checked={theme === 'system'}
								onchange={() => handleThemeChange('system')}
								class="h-4 w-4 text-blue-600"
							/>
							<span class="text-gray-700 dark:text-gray-300">System</span>
						</label>
					</div>
				</section>

				<!-- Date Selection -->
				<section>
					<h3 class="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
						Date for Readings
					</h3>
					<p class="mb-3 text-sm text-gray-500">
						Override today's date to view readings for a different day.
					</p>
					<label class="mb-3 flex cursor-pointer items-center gap-2">
						<input
							type="checkbox"
							checked={useDateOverride}
							onchange={handleDateOverrideToggle}
							class="h-4 w-4 rounded text-blue-600"
						/>
						<span class="text-gray-700">Use specific date</span>
					</label>
					{#if useDateOverride}
						<input
							type="date"
							value={dateOverrideValue}
							onchange={handleDateChange}
							class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						/>
						<p class="mt-2 text-sm text-gray-600">{formattedDate()}</p>
					{/if}
				</section>

				<!-- Office Time Boundaries -->
				<section>
					<h3 class="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
						Daily Office Times
					</h3>
					<p class="mb-3 text-sm text-gray-500">
						Set when each office ends for the auto-redirect feature.
					</p>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<label for="morning-end" class="text-gray-700">Morning Prayer ends</label>
							<input
								id="morning-end"
								type="time"
								value={formatTimeForInput(officeTimes.morning)}
								onchange={(e) => handleOfficeTimeChange('morning', e)}
								class="rounded-lg border border-gray-300 px-3 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
						<div class="flex items-center justify-between">
							<label for="midday-end" class="text-gray-700">Midday Prayer ends</label>
							<input
								id="midday-end"
								type="time"
								value={formatTimeForInput(officeTimes.midday)}
								onchange={(e) => handleOfficeTimeChange('midday', e)}
								class="rounded-lg border border-gray-300 px-3 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
						<div class="flex items-center justify-between">
							<label for="evening-end" class="text-gray-700">Evening Prayer ends</label>
							<input
								id="evening-end"
								type="time"
								value={formatTimeForInput(officeTimes.evening)}
								onchange={(e) => handleOfficeTimeChange('evening', e)}
								class="rounded-lg border border-gray-300 px-3 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
					</div>
					<p class="mt-2 text-xs text-gray-500">
						Compline runs from Evening Prayer end until Morning Prayer.
					</p>
				</section>
			</div>

			<!-- Footer -->
			<div
				class="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
			>
				<button
					type="button"
					onclick={handleReset}
					class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
				>
					Reset to Defaults
				</button>
				<button
					type="button"
					onclick={close}
					class="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Done
				</button>
			</div>
		</div>
	</div>
{/if}
