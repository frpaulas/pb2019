<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import complineData from '$lib/data/services/compline.json';
</script>

<svelte:head>
	<title>Compline - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={complineData.compline} />
</div>
