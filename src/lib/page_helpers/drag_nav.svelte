<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	interface MenuItem {
		title: string;
		href?: string;
		submenu?: MenuItem[];
	}

	const menuStructure: MenuItem[] = [
		{
			title: 'Home',
			href: `${base}/pg/iii`
		},
		{
			title: 'Table of Contents',
			href: `${base}/pg/v`
		},
		{
			title: 'Psalter',
			href: `${base}/psalter`
		},
		{
			title: 'Daily Prayers',
			submenu: [
				{ title: 'Morning Prayer', href: `${base}/pg/11` },
				{ title: 'Midday Prayer', href: `${base}/pg/33` },
				{ title: 'Evening Prayer', href: `${base}/pg/41` },
				{ title: 'Compline', href: `${base}/pg/57` },
				{ title: 'Family Prayer', href: `${base}/pg/67` }
			]
		},
		{
			title: 'Holy Eucharist',
			submenu: [
				{ title: 'Anglican Standard Text', href: `${base}/to_do/HE: Anglican Standard Text` },
				{ title: 'Renewed Ancient Text', href: `${base}/to_do/HE: Renewed Ancient Text` },
				{
					title: 'Supplemental Eucharistic Text',
					href: `${base}/to_do/Supplenetal Eucharistic Text`
				},
				{ title: 'Seasonal Greetings', href: `${base}/to_do/Seasonal Greetings` },
				{ title: 'Exhortation', href: `${base}/to_do/Exhoration` },
				{ title: 'Offertory Sentences', href: `${base}/to_do/Offertory Sentences` },
				{ title: 'Proper Prefaces', href: `${base}/to_do/Proper Prefaces` }
			]
		},
		{
			title: 'Pastoral Offices',
			submenu: [
				{ title: 'Holy Baptism', href: `${base}/to_do/Holy Baptism` },
				{ title: 'Confirmation', href: `${base}/to_do/Confirmation` },
				{ title: 'Baptism With Confirmation', href: `${base}/to_do/Baptism With Confirmation` }
			]
		},
		{
			title: 'Additional Resources',
			submenu: [
				{ title: 'Supplemental Canticles', href: `${base}/to_do/Supplemental Canticles` },
				{
					title: 'Great Litany and Supplication',
					href: `${base}/to_do/Great Litany and Supplication`
				},
				{ title: 'Decalogue', href: `${base}/to_do/Decalogue` }
			]
		}
	];

	let isMenuOpen = $state(false);
	let hoveredMainItem = $state<number | null>(null);
	let hoveredSubItem = $state<number | null>(null);
	let touchStartX = $state(0);
	let hasInteracted = $state(false);
	let isDraggingFromEdge = $state(false);

	const EDGE_THRESHOLD = 30; // pixels from left edge

	// Setup non-passive event listeners on mount
	onMount(() => {
		// Add event listeners with { passive: false } to allow preventDefault
		window.addEventListener('touchstart', handleTouchStart, { passive: false });
		window.addEventListener('touchmove', handleTouchMove, { passive: false });
		window.addEventListener('touchend', handleTouchEnd, { passive: false });

		return () => {
			// Cleanup
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	});

	// Lock/unlock body scroll when menu opens/closes
	$effect(() => {
		if (typeof document !== 'undefined') {
			if (isMenuOpen) {
				document.body.style.overflow = 'hidden';
				document.body.style.position = 'fixed';
				document.body.style.width = '100%';
				document.body.style.height = '100%';
				document.documentElement.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
				document.body.style.position = '';
				document.body.style.width = '';
				document.body.style.height = '';
				document.documentElement.style.overflow = '';
			}
		}
	});

	function handleTouchStart(event: TouchEvent) {
		const touch = event.touches[0];
		touchStartX = touch.clientX;

		// Only open menu if touch starts near left edge
		if (touchStartX <= EDGE_THRESHOLD) {
			event.preventDefault();
			event.stopPropagation();
			isDraggingFromEdge = true;

			// Immediately lock body scroll synchronously
			if (typeof document !== 'undefined') {
				document.body.style.overflow = 'hidden';
				document.body.style.position = 'fixed';
				document.body.style.width = '100%';
				document.body.style.height = '100%';
				document.documentElement.style.overflow = 'hidden';
			}

			isMenuOpen = true;
			hasInteracted = false;
		}
	}

	function handleTouchMove(event: TouchEvent) {
		// Prevent default for ANY movement if we started from edge
		if (isDraggingFromEdge || isMenuOpen) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (!isMenuOpen) return;

		const touch = event.touches[0];
		const element = document.elementFromPoint(touch.clientX, touch.clientY);

		if (element) {
			const mainItem = element.closest('[data-main-index]');
			const subItem = element.closest('[data-sub-index]');

			if (subItem) {
				const subIndex = parseInt(subItem.getAttribute('data-sub-index') || '-1');
				hoveredSubItem = subIndex;
				hasInteracted = true;
			} else if (mainItem) {
				const mainIndex = parseInt(mainItem.getAttribute('data-main-index') || '-1');
				hoveredMainItem = mainIndex;
				hoveredSubItem = null;
				hasInteracted = true;
			}
		}
	}

	function handleTouchEnd(event: TouchEvent) {
		if (isDraggingFromEdge || isMenuOpen) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (!isMenuOpen) {
			isDraggingFromEdge = false;
			return;
		}

		// Navigate to the hovered item
		if (hoveredSubItem !== null && hoveredMainItem !== null) {
			const mainItem = menuStructure[hoveredMainItem];
			if (mainItem.submenu) {
				const subItem = mainItem.submenu[hoveredSubItem];
				if (subItem.href) {
					goto(subItem.href);
				}
			}
		} else if (hoveredMainItem !== null) {
			const mainItem = menuStructure[hoveredMainItem];
			if (mainItem.href) {
				goto(mainItem.href);
			}
		}

		// Reset state
		isMenuOpen = false;
		hoveredMainItem = null;
		hoveredSubItem = null;
		hasInteracted = false;
		isDraggingFromEdge = false;
	}

	function getDisplayText(): string {
		if (hoveredSubItem !== null && hoveredMainItem !== null) {
			const mainItem = menuStructure[hoveredMainItem];
			if (mainItem.submenu) {
				return mainItem.submenu[hoveredSubItem].title;
			}
		} else if (hoveredMainItem !== null) {
			return menuStructure[hoveredMainItem].title;
		}
		return hasInteracted ? '' : 'Drag to navigate';
	}
</script>

{#if isMenuOpen}
	<div
		class="fixed inset-0 z-50 flex overflow-hidden bg-white"
		style="touch-action: none; overscroll-behavior: none;"
	>
		<!-- Display Area -->
		<div
			class="absolute top-0 right-0 left-0 flex h-20 items-center justify-center border-b bg-gray-50"
			style="touch-action: none;"
		>
			<div class="text-center">
				{#if getDisplayText()}
					<div class="text-2xl font-bold text-gray-900">
						{getDisplayText()}
					</div>
				{:else}
					<div class="text-2xl text-gray-400">&nbsp;</div>
				{/if}
			</div>
		</div>

		<!-- Main Menu (Left Side) -->
		<div class="mt-20 flex w-2/5 flex-col border-r">
			{#each menuStructure as item, index}
				<button
					data-main-index={index}
					class="flex-1 border-b border-gray-200 px-3 text-left text-sm transition-colors {hoveredMainItem ===
					index
						? 'border-blue-500 bg-blue-100'
						: 'bg-white hover:bg-gray-50'}"
				>
					<div class="flex items-center justify-between">
						<span class="truncate">{item.title}</span>
						{#if item.submenu}
							<svg
								class="h-4 w-4 flex-shrink-0 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						{/if}
					</div>
				</button>
			{/each}
		</div>

		<!-- Submenu (Right Side) -->
		{#if hoveredMainItem !== null && menuStructure[hoveredMainItem].submenu}
			<div class="mt-20 flex w-3/5 flex-col">
				{#each menuStructure[hoveredMainItem].submenu || [] as subitem, subIndex}
					<button
						data-sub-index={subIndex}
						class="flex-1 border-b border-gray-200 px-3 text-left text-sm transition-colors {hoveredSubItem ===
						subIndex
							? 'border-blue-500 bg-blue-100'
							: 'bg-white hover:bg-gray-50'}"
					>
						<span class="truncate">{subitem.title}</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
