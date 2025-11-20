<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import greatLitanyData from '$lib/data/services/great_litany.json';
</script>

<svelte:head>
	<title>The Great Litany - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={greatLitanyData.great_litany} />
</div>
