<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import morningPrayerData from '$lib/data/services/morning_prayer.json';
</script>

<svelte:head>
	<title>Daily Morning Prayer - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={morningPrayerData.daily_morning_prayer} />
</div>

<style>
	.container {
		min-height: 100vh;
	}
</style>
