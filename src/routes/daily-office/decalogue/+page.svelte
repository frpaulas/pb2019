<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import decalogueData from '$lib/data/services/decalogue.json';
</script>

<svelte:head>
	<title>The Decalogue - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={decalogueData.decalogue} />
</div>
