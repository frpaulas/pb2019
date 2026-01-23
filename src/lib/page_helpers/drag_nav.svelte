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
			title: 'Calendar',
			href: `${base}/calendar`
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
				{ title: 'Anglican Standard Text', href: `${base}/pg/105` },
				{ title: 'Renewed Ancient Text', href: `${base}/pg/123` },
				{ title: 'Seasonal Greetings', href: `${base}/pg/145` },
				{ title: 'Exhortation', href: `${base}/pg/147` },
				{ title: 'Offertory Sentences', href: `${base}/pg/149` },
				{ title: 'Proper Prefaces', href: `${base}/pg/152` }
			]
		},
		{
			title: 'Baptism & Confirmation',
			submenu: [
				{ title: 'Holy Baptism', href: `${base}/pg/161` },
				{ title: 'Confirmation', href: `${base}/pg/175` },
				{ title: 'Baptism With Confirmation', href: `${base}/pg/183` },
				{ title: 'Renewal of Baptismal Vows', href: `${base}/pg/194` }
			]
		},
		{
			title: 'Pastoral Rites',
			submenu: [
				{ title: 'Holy Matrimony', href: `${base}/pg/201` },
				{ title: 'Thanksgiving For The Birth or Adoption Of A Child', href: `${base}/pg/215` },
				{ title: 'Revonciliation of Penitents', href: `${base}/pg/223` },
				{ title: 'Ministry To The Sick', href: `${base}/pg/225` },
				{ title: 'Communion Of The Sick', href: `${base}/pg/227` },
				{ title: 'Additional Prayers For The Sick', href: `${base}/pg/231` },
				{ title: 'Ministry To The Dying', href: `${base}/pg/237` },
				{ title: 'Prayers For A Vigil', href: `${base}/pg/243` },
				{ title: 'Burial Of The Dead', href: `${base}/pg/249` }
			]
		},
		{
			title: 'The Psalter',
			submenu: [
				{ title: 'Selections of Psalms', href: `${base}/pg/269` },
				{ title: 'Psalms 1-150', href: `${base}/pg/270` }
			]
		},
		{
			title: 'Episcopal Services',
			submenu: [
				{ title: 'Ordination Of A Deacon', href: `${base}/pg/472` },
				{ title: 'Ordination Of A Priest', href: `${base}/pg/483` },
				{ title: 'Ordination and Confirmation Of A Bishop', href: `${base}/pg/497` },
				{ title: 'Litany For Ordinations', href: `${base}/pg/510` }
			]
		},
		{
			title: 'Additional Resources',
			submenu: [
				{ title: 'Supplemental Canticles', href: `${base}/pg/79` },
				{ title: 'Great Litany', href: `${base}/pg/91` },
				{ title: 'Decalogue', href: `${base}/pg/100` }
			]
		}
	];

	let isMenuOpen = $state(false);
	let hoveredMainItem = $state<number | null>(null);
	let hoveredSubItem = $state<number | null>(null);
	let touchStartY = $state(0);
	let isDraggingHeader = $state(false);
	let hasInteracted = $state(false);

	const PULL_DOWN_THRESHOLD = 50; // pixels to drag down before opening menu

	// Setup non-passive event listeners on mount
	onMount(() => {
		window.addEventListener('touchstart', handleTouchStart, { passive: false });
		window.addEventListener('touchmove', handleTouchMove, { passive: false });
		window.addEventListener('touchend', handleTouchEnd, { passive: false });

		return () => {
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	});

	function handleTouchStart(event: TouchEvent) {
		const touch = event.touches[0];
		const target = event.target as HTMLElement;

		// Check if touch started on the header
		const header = target.closest('header');
		if (header) {
			// Don't prevent default on links - let them work normally
			const link = (event.target as HTMLElement).closest('a');
			if (link) {
				return;
			}

			touchStartY = touch.clientY;
			isDraggingHeader = true;
		}
	}

	function handleTouchMove(event: TouchEvent) {
		if (!isDraggingHeader && !isMenuOpen) return;

		const touch = event.touches[0];
		const deltaY = touch.clientY - touchStartY;

		// If dragging down enough, open menu
		if (isDraggingHeader && deltaY > PULL_DOWN_THRESHOLD && !isMenuOpen) {
			event.preventDefault();
			event.stopPropagation();
			isMenuOpen = true;
			hasInteracted = false;
			isDraggingHeader = false; // Stop tracking header drag
			return;
		}

		// Once menu is open, track item selection
		if (isMenuOpen) {
			event.preventDefault();
			event.stopPropagation();

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
	}

	function handleTouchEnd(event: TouchEvent) {
		if (isMenuOpen) {
			event.preventDefault();
			event.stopPropagation();

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
		}

		isDraggingHeader = false;
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
	<div class="fixed inset-0 top-18 z-40 flex overflow-hidden bg-white" style="touch-action: none;">
		<!-- Display Area -->
		<div
			class="absolute top-0 right-0 left-0 flex h-20 items-center justify-center border-b bg-gray-50"
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
