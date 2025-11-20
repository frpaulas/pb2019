<script>
	import ServiceRenderer from '$lib/components/ServiceRenderer.svelte';
	import anglicanStandardData from '$lib/data/services/anglican_standard.json';
</script>

<svelte:head>
	<title>Holy Eucharist: Anglican Standard Text - Prayer Book 2019</title>
</svelte:head>

<div class="container">
	<ServiceRenderer serviceData={anglicanStandardData.anglican_standard} />
</div>
