<script>
	import { onMount, tick } from 'svelte';
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import morningPrayerData from '$lib/data/services/11-32_morning_prayer.json';
	import middayPrayerData from '$lib/data/services/33-40_midday_prayer.json';
	import eveningPrayerData from '$lib/data/services/41-56_evening_prayer.json';
	import complineData from '$lib/data/services/57-65_compline.json';
	import familyPrayerData from '$lib/data/services/66-78_family_prayer.json';

	// Service order for Daily Office
	const serviceOrder = ['morning', 'midday', 'evening', 'compline', 'family'];

	const serviceData = {
		morning: morningPrayerData.morning_prayer,
		midday: middayPrayerData.midday_prayer,
		evening: eveningPrayerData.evening_prayer,
		compline: complineData.compline,
		family: familyPrayerData.family_prayer
	};

	// Determine starting service based on time of day
	function getServiceForTime() {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const totalMinutes = hours * 60 + minutes;

		// 00:00 - 11:30 morning prayer
		if (totalMinutes >= 0 && totalMinutes < 691) return 'morning';
		// 11:31 - 15:00 midday prayer
		if (totalMinutes >= 691 && totalMinutes < 901) return 'midday';
		// 15:01 - 20:00 evening prayer
		if (totalMinutes >= 901 && totalMinutes < 1201) return 'evening';
		// 20:01 - 23:59 compline
		return 'compline';
	}

	let loadedServices = $state([]);
	let scrollContainer = $state(null);
	let isLoading = $state(false);

	onMount(() => {
		// Load initial service based on time
		const initialService = getServiceForTime();
		loadedServices = [initialService];

		// Use window scroll instead of container scroll
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	async function handleScroll() {
		if (isLoading || !scrollContainer) return;

		const scrollTop = window.scrollY;
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = window.innerHeight;

		const scrollProgress = (scrollTop + clientHeight) / scrollHeight;
		const scrollTopProgress = scrollTop / scrollHeight;

		// Load next service when 80% scrolled down
		if (scrollProgress > 0.8) {
			await loadNextService();
		}

		// Load previous service when near top
		if (scrollTopProgress < 0.2) {
			await loadPrevService();
		}
	}

	async function loadNextService() {
		if (isLoading) return;

		const lastService = loadedServices[loadedServices.length - 1];
		const currentIndex = serviceOrder.indexOf(lastService);

		// Check if there's a next service
		if (currentIndex >= serviceOrder.length - 1) return;

		const nextService = serviceOrder[currentIndex + 1];

		// Check if already loaded
		if (loadedServices.includes(nextService)) return;

		console.log('[LAZY] Loading next service:', nextService);
		isLoading = true;

		const oldScrollTop = window.scrollY;

		// Add the next service
		loadedServices = [...loadedServices, nextService];

		await tick();

		// Restore scroll position if it changed
		if (window.scrollY !== oldScrollTop) {
			window.scrollTo(0, oldScrollTop);
		}

		isLoading = false;
	}

	async function loadPrevService() {
		if (isLoading) return;

		const firstService = loadedServices[0];
		const currentIndex = serviceOrder.indexOf(firstService);

		// Check if there's a previous service
		if (currentIndex <= 0) return;

		const prevService = serviceOrder[currentIndex - 1];

		// Check if already loaded
		if (loadedServices.includes(prevService)) return;

		console.log('[LAZY] Loading previous service:', prevService);
		isLoading = true;

		const oldScrollTop = window.scrollY;
		const oldScrollHeight = document.documentElement.scrollHeight;

		// Add the previous service at the beginning
		loadedServices = [prevService, ...loadedServices];

		await tick();

		// Adjust scroll position to maintain user's view
		const newScrollHeight = document.documentElement.scrollHeight;
		const addedHeight = newScrollHeight - oldScrollHeight;
		window.scrollTo(0, oldScrollTop + addedHeight);

		isLoading = false;
	}
</script>

<svelte:head>
	<title>Daily Office - Prayer Book 2019</title>
</svelte:head>

<div bind:this={scrollContainer}>
	{#each loadedServices as service (service)}
		<div data-service={service} id={service}>
			<ServiceRenderer serviceData={serviceData[service]} />
			{#if service !== loadedServices[loadedServices.length - 1]}
				<div class="service-divider my-8 border-t-2 border-gray-300"></div>
			{/if}
		</div>
	{/each}
</div>
