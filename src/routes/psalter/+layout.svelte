<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<style>
		html, body {
			margin: 0;
			padding: 0;
			overflow: hidden;
			height: 100%;
			width: 100%;
			position: fixed;
		}
	</style>
</svelte:head>

{@render children?.()}
