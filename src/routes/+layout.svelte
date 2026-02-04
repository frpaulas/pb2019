<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/page_helpers/header.svelte';
	import DragNav from '$lib/page_helpers/drag_nav.svelte';
	import PageLinkModal from '$lib/components/PageLinkModal.svelte';
	import ScriptureModal from '$lib/components/ScriptureModal.svelte';
	import PsalmModal from '$lib/components/PsalmModal.svelte';
	import PreferencesModal from '$lib/components/PreferencesModal.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';
	import { fontSize, officeTimes, theme } from '$lib/stores/preferences';

	let { children } = $props();

	const LAST_ACTIVE_KEY = 'pb2019_lastActive';
	const INACTIVITY_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes

	function getOfficePageByTime(): string {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const timeValue = hours * 100 + minutes;
		const times = get(officeTimes);

		if (timeValue < times.morning) {
			return '11'; // Morning Prayer
		} else if (timeValue < times.midday) {
			return '33'; // Midday Prayer
		} else if (timeValue < times.evening) {
			return '41'; // Evening Prayer
		} else {
			return '57'; // Compline
		}
	}

	function updateLastActive() {
		localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
	}

	function handleVisibilityChange() {
		if (document.visibilityState === 'visible') {
			const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
			if (lastActive) {
				const elapsed = Date.now() - parseInt(lastActive, 10);
				if (elapsed >= INACTIVITY_THRESHOLD_MS) {
					// Only redirect if we're on a /pg/ route (not on special pages like /bible, /calendar, etc.)
					const currentPath = window.location.pathname;
					const isPageRoute =
						currentPath.includes('/pg/') || currentPath === base || currentPath === base + '/';
					if (isPageRoute) {
						const page = getOfficePageByTime();
						goto(`${base}/pg/${page}`);
					}
				}
			}
			updateLastActive();
		} else {
			// Tab hidden - save timestamp
			updateLastActive();
		}
	}

	// Apply font size preference to document root
	$effect(() => {
		document.documentElement.style.setProperty('--user-font-scale', $fontSize.toString());
	});

	// Apply theme preference
	$effect(() => {
		const applyTheme = (isDark: boolean) => {
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		};

		if ($theme === 'system') {
			// Use system preference
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			applyTheme(mediaQuery.matches);

			// Listen for system theme changes
			const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
			mediaQuery.addEventListener('change', handler);

			return () => mediaQuery.removeEventListener('change', handler);
		} else {
			applyTheme($theme === 'dark');
		}
	});

	onMount(() => {
		updateLastActive();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<DragNav />

<div class="relative">
	<div class="fixed top-0 left-0 z-9999 w-full max-w-180">
		<Header />
	</div>
	<div
		class="scrollbar-hidden mt-18 w-full max-w-180 rounded-md border-t-3 border-r-3 border-red-800 bg-neutral-100 font-serif"
	>
		<div
			class="border-r-double scrollbar-hidden w-full max-w-178 border-r-3 border-double border-r-green-900"
		>
			<div class="scrollbar-hidden p-4 sm:p-8">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>

<!-- Page Link Modal - Global overlay for page references -->
<PageLinkModal />

<!-- Scripture Modal - Global overlay for scripture readings -->
<ScriptureModal />

<!-- Psalm Modal - Global overlay for BCP psalter -->
<PsalmModal />

<!-- Preferences Modal - Global overlay for settings -->
<PreferencesModal />

<style>
	@layer utilities {
		/* Hide scrollbar for Chrome, Safari and Opera */
		.scrollbar-hidden::-webkit-scrollbar {
			display: none;
		}

		/* Hide scrollbar for IE, Edge and Firefox */
		.scrollbar-hidden {
			-ms-overflow-style: none; /* IE and Edge */
			scrollbar-width: none; /* Firefox */
		}
	}
</style>
