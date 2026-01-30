<script lang="ts">
	let navElement: HTMLElement;

	const canticles = [
		{ id: 'canticle-1', label: '1' },
		{ id: 'canticle-2', label: '2' },
		{ id: 'canticle-3', label: '3' },
		{ id: 'canticle-4', label: '4' },
		{ id: 'canticle-5', label: '5' },
		{ id: 'canticle-6', label: '6' },
		{ id: 'canticle-7', label: '7' },
		{ id: 'canticle-8', label: '8' },
		{ id: 'canticle-9', label: '9' },
		{ id: 'canticle-10', label: '10' }
	];

	function scrollToCanticle(id: string) {
		const element = document.getElementById(id);
		if (element && navElement) {
			// Get the bottom of the nav buttons
			const navRect = navElement.getBoundingClientRect();
			const elementRect = element.getBoundingClientRect();

			// Find the scroll container
			const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
			if (scrollContainer) {
				const currentScroll = scrollContainer.scrollTop;
				const targetScroll = currentScroll + elementRect.top - navRect.bottom - 8;
				scrollContainer.scrollTo({ top: targetScroll, behavior: 'smooth' });
			}
		}
	}
</script>

<div class="supplemental-canticles-nav" bind:this={navElement}>
	<div class="mb-4 flex flex-wrap justify-center gap-2">
		{#each canticles as canticle}
			<button
				class="h-10 w-10 rounded bg-stone-200 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-500 hover:text-white"
				onclick={() => scrollToCanticle(canticle.id)}
			>
				{canticle.label}
			</button>
		{/each}
	</div>
</div>
