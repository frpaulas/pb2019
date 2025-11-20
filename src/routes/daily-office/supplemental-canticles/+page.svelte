<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import supplementalCanticlesData from '$lib/data/services/supplemental_canticles.json';
</script>

<svelte:head>
	<title>Supplemental Canticles - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={supplementalCanticlesData.supplemental_canticles} />
</div>
