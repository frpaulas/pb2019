<script lang="ts">
	import { page } from '$app/stores';
	import { getPageName } from '$lib/page_helpers/nav_helpers.svelte';
	import { currentVisiblePage } from '$lib/stores/currentPage.js';

	// Use the currentVisiblePage store which updates during infinite scroll
	let page_number = $derived($currentVisiblePage || $page.params.page_number || 'iii');

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

	const menuStructure = [
		{
			title: 'Home',
			href: '/pg/iii'
		},
		{
			title: 'Table of Contents',
			href: '/pg/v'
		},
		{
			title: 'Daily Prayers',
			submenu: [
				{ title: 'Morning Prayer', href: '/pg/11' },
				{ title: 'Midday Prayer', href: '/pg/33' },
				{ title: 'Evening Prayer', href: '/pg/41' },
				{ title: 'Compline', href: '/pg/57' },
				{ title: 'Family Prayer', href: '/pg/67' }
			]
		},
		{
			title: 'Holy Eucharist',
			submenu: [
				{ title: 'Anglican Standard Text', href: '/to_do/HE: Anglican Standard Text' },
				{ title: 'Renewed Ancient Text', href: '/to_do/HE: Renewed Ancient Text' },
				{ title: 'Supplemental Eucharistic Text', href: '/to_do/Supplenetal Eucharistic Text' },
				{ title: 'Seasonal Greetings', href: '/to_do/Seasonal Greetings' },
				{ title: 'Exhortation', href: '/to_do/Exhoration' },
				{ title: 'Offertory Sentences', href: '/to_do/Offertory Sentences' },
				{ title: 'Proper Prefaces', href: '/to_do/Proper Prefaces' }
			]
		},
		{
			title: 'Pastoral Offices',
			submenu: [
				{ title: 'Holy Baptism', href: '/to_do/Holy Baptism' },
				{ title: 'Confirmation', href: '/to_do/Confirmation' },
				{ title: 'Baptism With Confirmation', href: '/to_do/Baptism With Confirmation' }
			]
		},
		{
			title: 'Additional Resources',
			submenu: [
				{ title: 'Supplemental Canticles', href: '/to_do/Supplemental Canticles' },
				{ title: 'Great Litany and Supplication', href: '/to_do/Great Litany and Supplication' },
				{ title: 'Decalogue', href: '/to_do/Decalogue' }
			]
		}
	];
</script>

<header class="fixed w-180 border-b bg-white shadow-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo/Title -->
			<div class="flex-shrink-0">
				<a href="/pg/iii" class="text-xl font-bold text-gray-900">PB2019</a>
			</div>
			<div class="text-sm text-gray-500">
				{getPageName(page_number)}
				{page_number}
			</div>

			<!-- Hamburger Button -->
			<button
				onclick={toggleMenu}
				class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
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
						<a href={item.href} class={button_class} onclick={toggleMenu}>
							{item.title}
						</a>
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
											<a
												href={subitem.href}
												class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
												onclick={toggleMenu}
											>
												{subitem.title}
											</a>
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
