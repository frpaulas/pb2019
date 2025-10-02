<script>
	import 'tailwindcss';
	import { page } from '$app/stores';
	import InfiniteScroll from '$lib/page/InfiniteScroll.svelte';
	import { browser } from '$app/environment';
	// Check if user prefers infinite scroll (you can add a setting for this)
	let useInfiniteScroll = $state(true);
	let page_number = $page.params.page_number;
</script>

{#if useInfiniteScroll && browser}
	<InfiniteScroll />
{:else}
	<!-- Fallback to original single-page loading -->
	{#await import(`../../../lib/page/${page_number}.svelte`).catch(() => null) then Component}
		{#if Component}
			<Component.default />
		{:else}
			<div class="flex h-screen items-center justify-center">
				<div class="text-lg">Page {page_number} not found</div>
			</div>
		{/if}
	{:catch}
		<h1>Error loading page {page_number}</h1>
	{/await}
{/if}
