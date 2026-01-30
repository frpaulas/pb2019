<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { getPageName } from '$lib/page_helpers/nav_helpers.svelte';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
	import { season, colors } from '$lib/stores/liturgical';

	// Map season to display name
	const seasonDisplayNames: Record<string, string> = {
		advent: 'Advent',
		christmas: 'Christmas',
		epiphany: 'Epiphany',
		lent: 'Lent',
		easter: 'Easter',
		ascension: 'Ascension',
		pentecost: 'Pentecost',
		trinity: 'Trinity',
		proper: 'Ordinary Time'
	};

	// Map liturgical colors to CSS background colors
	const colorMap: Record<string, { bg: string; text: string }> = {
		purple: { bg: '#6B21A8', text: 'white' },
		white: { bg: '#F5F5F4', text: '#1C1917' },
		green: { bg: '#166534', text: 'white' },
		red: { bg: '#991B1B', text: 'white' },
		blue: { bg: '#1E40AF', text: 'white' },
		rose: { bg: '#BE185D', text: 'white' },
		black: { bg: '#1C1917', text: 'white' }
	};

	let seasonName = $derived(seasonDisplayNames[$season] || '');
	let liturgicalColor = $derived($colors?.[0] || 'green');
	let headerColors = $derived(colorMap[liturgicalColor] || colorMap.green);

	// Use the currentVisiblePage store which updates during infinite scroll
	let page_number = $derived($currentVisiblePage || $page.params.page_number || 'iii');
	let inputPageNumber = $state('');

	let isMenuOpen = $state(false);
	let openSubmenus = $state(new Set());
	let button_class =
		'block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900';
	let submenu_button_class =
		'flex items-center justify-between w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900';
	let submenu_item_class =
		'block rounded-md px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900';

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (!isMenuOpen) {
			openSubmenus.clear();
		}
	}

	function toggleSubmenu(category) {
		if (openSubmenus.has(category)) {
			openSubmenus.delete(category);
		} else {
			openSubmenus.add(category);
		}
		openSubmenus = new Set(openSubmenus);
	}

	function navigate(href: string) {
		toggleMenu();
		goto(href, { invalidateAll: true });
	}

	function handlePageNavigation(event: KeyboardEvent) {
		if (event.key === 'Enter' && inputPageNumber.trim()) {
			goto(`${base}/pg/${inputPageNumber.trim()}`);
			inputPageNumber = '';
		}
	}

	const menuStructure = [
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
			title: 'Bible',
			href: `${base}/bible`
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
				{ title: 'Concerning the Eucharist', href: `${base}/pg/100` },
				{ title: 'Anglican Standard Text', href: `${base}/pg/105` },
				{ title: 'Renewed Ancient Text', href: `${base}/pg/123` },
				{ title: 'Additional Directions', href: `${base}/pg/139` },
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
				{ title: 'Thanksgiving for Birth or Adoption', href: `${base}/pg/215` },
				{ title: 'Reconciliation of Penitents', href: `${base}/pg/223` },
				{ title: 'Ministry to the Sick', href: `${base}/pg/225` },
				{ title: 'Communion of the Sick', href: `${base}/pg/227` },
				{ title: 'Additional Prayers for the Sick', href: `${base}/pg/231` },
				{ title: 'Ministry to the Dying', href: `${base}/pg/237` },
				{ title: 'Prayers for a Vigil', href: `${base}/pg/243` },
				{ title: 'Burial of the Dead', href: `${base}/pg/249` }
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
</script>

<header
	class="fixed w-full max-w-180 border-b shadow-md"
	style="background-color: {headerColors.bg};"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-3">
			<!-- Logo/Title -->
			<div class="flex-shrink-0">
				<a
					href="{base}/pg/iii"
					class="block leading-tight font-bold"
					style="color: {headerColors.text};"
				>
					<span class="text-lg">PB2019</span>
					{#if seasonName}
						<span class="block text-xs font-normal opacity-80">{seasonName}</span>
					{/if}
				</a>
			</div>
			<div
				class="flex items-center gap-2 text-sm"
				style="color: {headerColors.text}; opacity: 0.8;"
			>
				<span>{getPageName(page_number)}</span>
				<input
					type="text"
					bind:value={inputPageNumber}
					onkeydown={handlePageNavigation}
					placeholder={page_number}
					class="w-16 rounded border border-white/30 bg-white/20 px-2 py-1 text-center text-sm focus:border-white/60 focus:ring-1 focus:ring-white/40 focus:outline-none"
					style="color: {headerColors.text};"
				/>
			</div>

			<!-- Hamburger Button -->
			<button
				onclick={toggleMenu}
				class="inline-flex items-center justify-center rounded-md p-2 hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none focus:ring-inset"
				style="color: {headerColors.text};"
				aria-expanded={isMenuOpen}
			>
				<span class="sr-only">Open main menu</span>
				<!-- Hamburger icon -->
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					{#if !isMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Multi-layered menu -->
	{#if isMenuOpen}
		<div class="w-min border-t border-gray-200 bg-white">
			<div class="space-y-1 px-2 pt-2 pb-3 whitespace-nowrap sm:px-3">
				{#each menuStructure as item}
					{#if item.href}
						<!-- Direct link -->
						<button class={button_class} onclick={() => navigate(item.href)}>
							{item.title}
						</button>
					{:else if item.submenu}
						<!-- Submenu parent -->
						<div class="relative">
							<button class={submenu_button_class} onclick={() => toggleSubmenu(item.title)}>
								<span>{item.title}</span>
								<svg
									class="h-5 w-5 transform transition-transform duration-200 {openSubmenus.has(
										item.title
									)
										? 'rotate-90'
										: ''}"
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
							</button>

							<!-- Fly-out submenu -->
							{#if openSubmenus.has(item.title)}
								<div
									class="absolute top-0 left-full z-50 ml-2 w-64 origin-left transform rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-out"
								>
									<div class="py-2">
										{#each item.submenu as subitem}
											<button
												class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
												onclick={() => navigate(subitem.href)}
											>
												{subitem.title}
											</button>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</header>
