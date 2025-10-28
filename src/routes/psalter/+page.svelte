<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let hoveredPsalm = $state<number | null>(null);
	let isTouchDevice = $state(false);

	// Simple 10x15 grid (150 psalms)
	const COLS = 10;
	const ROWS = 15;

	function handleCellHover(psalmNumber: number) {
		hoveredPsalm = psalmNumber;
	}

	function handleTouchStart(psalmNumber: number, event: TouchEvent) {
		event.preventDefault(); // Prevent mouse events from firing
		isTouchDevice = true;
		hoveredPsalm = psalmNumber;
	}

	function handleCellClick(psalmNumber: number) {
		// On touch devices, first tap shows the number, second tap navigates
		// On mouse, single click navigates
		if (isTouchDevice && hoveredPsalm !== psalmNumber) {
			hoveredPsalm = psalmNumber;
			return;
		}

		// Navigate to the psalm page - we'll need to determine which page
		// For now, just log it
		console.log('Navigate to Psalm', psalmNumber);
		// TODO: Map psalm number to page number
	}
</script>

<div class="flex h-screen flex-col items-center justify-center gap-8 p-4">
	<!-- Display Area -->
	<div class="text-center">
		{#if hoveredPsalm}
			<div class="text-6xl font-bold text-gray-900">
				{hoveredPsalm}
			</div>
			<div class="text-sm text-gray-500">Psalm {hoveredPsalm}</div>
		{:else}
			<div class="text-2xl text-gray-400">Point to a psalm</div>
		{/if}
	</div>

	<!-- Grid Navigator -->
	<div class="grid gap-1" style="grid-template-columns: repeat({COLS}, minmax(0, 1fr));">
		{#each Array(ROWS * COLS) as _, index}
			{@const psalmNumber = index + 1}
			<button
				class="aspect-square rounded border border-gray-300 bg-white transition-colors hover:bg-blue-50 active:bg-blue-100 {hoveredPsalm ===
				psalmNumber
					? 'border-blue-500 bg-blue-100'
					: ''}"
				onmouseenter={() => handleCellHover(psalmNumber)}
				onmouseleave={() => !isTouchDevice && (hoveredPsalm = null)}
				ontouchstart={(e) => handleTouchStart(psalmNumber, e)}
				onclick={() => handleCellClick(psalmNumber)}
			>
				<span class="text-xs text-gray-400">{psalmNumber}</span>
			</button>
		{/each}
	</div>

	<!-- Back button -->
	<a href="{base}/pg/iii" class="text-blue-600 hover:underline">← Back to Home</a>
</div>
