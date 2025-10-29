<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/page_helpers/header.svelte';
	import DragNav from '$lib/page_helpers/drag_nav.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<DragNav />

<div class="relative">
	<div class="fixed top-0 left-0 z-9999 w-full max-w-180">
		<Header />
	</div>
	<div
		class="scrollbar-hidden mt-18 w-full max-w-180 rounded-md border-t-3 border-r-3 border-red-800 bg-neutral-100 font-serif"
	>
		<div
			class="border-r-double scrollbar-hidden w-full max-w-178 border-r-3 border-double border-r-green-900"
		>
			<div class="scrollbar-hidden p-4 sm:p-8">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>

<style>
	@layer utilities {
		/* Hide scrollbar for Chrome, Safari and Opera */
		.scrollbar-hidden::-webkit-scrollbar {
			display: none;
		}

		/* Hide scrollbar for IE, Edge and Firefox */
		.scrollbar-hidden {
			-ms-overflow-style: none; /* IE and Edge */
			scrollbar-width: none; /* Firefox */
		}
	}
</style>
