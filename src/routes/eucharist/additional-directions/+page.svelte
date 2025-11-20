<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import additionalDirectionsData from '$lib/data/services/additional_directions_eucharist.json';
</script>

<svelte:head>
	<title>Additional Directions - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={additionalDirectionsData.additional_directions_eucharist} />
</div>
