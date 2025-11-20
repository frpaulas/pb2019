<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import concerningEucharistData from '$lib/data/services/concerning_eucharist.json';
</script>

<svelte:head>
	<title>Concerning the Holy Eucharist - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={concerningEucharistData.concerning_eucharist} />
</div>
