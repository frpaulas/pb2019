<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import prefaceData from '$lib/data/services/preface.json';
</script>

<svelte:head>
	<title>Preface - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={prefaceData.preface} />
</div>
