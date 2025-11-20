<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import seasonalGreetingsData from '$lib/data/services/seasonal_greetings.json';
</script>

<svelte:head>
	<title>Seasonal Greetings - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={seasonalGreetingsData.seasonal_greetings} />
</div>
