<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import exhortationData from '$lib/data/services/exhortation.json';
</script>

<svelte:head>
	<title>The Exhortation - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={exhortationData.exhortation} />
</div>
