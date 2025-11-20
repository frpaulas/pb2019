<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import familyPrayerData from '$lib/data/services/family_prayer.json';
</script>

<svelte:head>
	<title>Family Prayer - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={familyPrayerData.family_prayer} />
</div>
