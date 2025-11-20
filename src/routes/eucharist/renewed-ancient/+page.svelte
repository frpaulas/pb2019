<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import renewedAncientData from '$lib/data/services/renewed_ancient.json';
</script>

<svelte:head>
	<title>Holy Eucharist: Renewed Ancient Text - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={renewedAncientData.renewed_ancient} />
</div>
