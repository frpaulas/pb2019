<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import concerningData from '$lib/data/services/concerning_divine_service.json';
</script>

<svelte:head>
	<title>Concerning Divine Service - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={concerningData.concerning_divine_service} />
</div>
