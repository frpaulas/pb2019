<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import middayPrayerData from '$lib/data/services/midday_prayer.json';
</script>

<svelte:head>
	<title>Midday Prayer - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={middayPrayerData.midday_prayer} />
</div>

<style>
	.container {
		min-height: 100vh;
	}
</style>
