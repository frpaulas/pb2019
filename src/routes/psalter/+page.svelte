<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getPsalmPage } from '$lib/db/psalm_page_map';

	let hoveredPsalm = $state<number | null>(null);
	let isTouchDevice = $state(false);
	let hasInteracted = $state(false);
	let isFingerOverGrid = $state(true);

	// Simple 10x15 grid (150 psalms)
	const COLS = 10;
	const ROWS = 15;

	function handleCellHover(psalmNumber: number) {
		hasInteracted = true;
		hoveredPsalm = psalmNumber;
	}

	function handleTouchStart(psalmNumber: number, event: TouchEvent) {
		event.preventDefault(); // Prevent mouse events from firing
		isTouchDevice = true;
		hasInteracted = true;
		hoveredPsalm = psalmNumber;
		isFingerOverGrid = true;
	}

	function handleTouchMove(event: TouchEvent) {
		// Track which cell the finger is over while dragging
		if (!isTouchDevice) return;

		event.preventDefault();
		const touch = event.touches[0];
		const element = document.elementFromPoint(touch.clientX, touch.clientY);

		if (element) {
			const button = element.closest('button');
			if (button) {
				const psalmAttr = button.getAttribute('data-psalm');
				if (psalmAttr) {
					hoveredPsalm = parseInt(psalmAttr);
					isFingerOverGrid = true;
				}
			} else {
				// Finger moved outside the grid
				isFingerOverGrid = false;
			}
		} else {
			// Finger moved outside the grid
			isFingerOverGrid = false;
		}
	}

	function handleTouchEnd() {
		// On touch devices, navigate when finger lifts off - only if still over grid
		if (isTouchDevice && hoveredPsalm && isFingerOverGrid) {
			const pageNumber = getPsalmPage(hoveredPsalm);
			if (pageNumber) {
				goto(`${base}/pg/${pageNumber}#psalm-${hoveredPsalm}`);
			} else {
				console.warn(`No page found for Psalm ${hoveredPsalm}`);
			}
		}
		// Reset state
		isFingerOverGrid = true;
	}

	function handleCellClick(psalmNumber: number) {
		// On mouse (desktop), single click navigates
		if (!isTouchDevice) {
			const pageNumber = getPsalmPage(psalmNumber);
			if (pageNumber) {
				goto(`${base}/pg/${pageNumber}#psalm-${psalmNumber}`);
			} else {
				console.warn(`No page found for Psalm ${psalmNumber}`);
			}
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-8 bg-white p-4">
	<!-- Header -->
	<h1 class="text-3xl font-bold text-gray-900">Psalter</h1>

	<!-- Display Area -->
	<div class="text-center">
		{#if hoveredPsalm}
			<div class="text-6xl font-bold text-gray-900">
				{hoveredPsalm}
			</div>
			<div class="text-sm text-gray-500">Psalm {hoveredPsalm}</div>
		{:else if !hasInteracted}
			<div class="text-2xl text-gray-400">Point to a psalm</div>
		{:else}
			<div class="text-2xl text-gray-400">&nbsp;</div>
		{/if}
	</div>

	<!-- Grid Navigator -->
	<div class="grid" style="grid-template-columns: repeat({COLS}, minmax(0, 1fr));">
		{#each Array(ROWS * COLS) as _, index}
			{@const psalmNumber = index + 1}
			<button
				data-psalm={psalmNumber}
				class="aspect-square border border-gray-300 bg-white transition-colors hover:bg-blue-50 active:bg-blue-100 {hoveredPsalm ===
				psalmNumber
					? 'border-blue-600 bg-blue-400 font-bold'
					: ''}"
				onmouseenter={() => handleCellHover(psalmNumber)}
				onmouseleave={() => !isTouchDevice && (hoveredPsalm = null)}
				ontouchstart={(e) => handleTouchStart(psalmNumber, e)}
				ontouchmove={handleTouchMove}
				ontouchend={handleTouchEnd}
				onclick={() => handleCellClick(psalmNumber)}
			>
				<span class="text-xs text-gray-400">{psalmNumber}</span>
			</button>
		{/each}
	</div>

	<!-- Back button -->
	<a href="{base}/pg/iii" class="text-blue-600 hover:underline">← Back to Home</a>
</div>
