<script lang="ts">
	import '../../app.css';
	import Header from '$lib/page_helpers/header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<style>
		html,
		body {
			margin: 0;
			padding: 0;
			overflow: hidden;
			height: 100%;
			width: 100%;
			position: fixed;
		}
	</style>
</svelte:head>

<div class="fixed top-0 left-0 z-9999 w-full max-w-180">
	<Header />
</div>
<div class="mt-18 w-full max-w-180">
	{@render children?.()}
</div>
