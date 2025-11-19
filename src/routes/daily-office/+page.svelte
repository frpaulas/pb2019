<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import morningPrayerData from '$lib/data/services/morning_prayer.json';
	import middayPrayerData from '$lib/data/services/midday_prayer.json';
</script>

<svelte:head>
	<title>Daily Office - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={morningPrayerData.morning_prayer} />
	<div class="service-divider">
		<hr />
	</div>
	<ServiceRenderer serviceData={middayPrayerData.midday_prayer} />
</div>

<style>
	.container {
		min-height: 100vh;
	}

	.service-divider {
		margin: 4rem 0;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.service-divider hr {
		border: none;
		border-top: 2px solid #ccc;
		margin: 2rem 0;
	}
</style>
