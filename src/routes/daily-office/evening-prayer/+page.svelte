<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import eveningPrayerData from '$lib/data/services/evening_prayer.json';
</script>

<svelte:head>
	<title>Evening Prayer - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={eveningPrayerData.evening_prayer} />
</div>
