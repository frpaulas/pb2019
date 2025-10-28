<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm23 = getPsalmMeta(23);
	const psalm23kjv = getPsalmMeta('23kjv');

	let kjv = $state(true);

	function toggleVersion() {
		kjv = !kjv;
	}
</script>

<div class="mt-8 break-after-all">
	<button
		onclick={toggleVersion}
		class="mb-4 w-64 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
	>
		{kjv ? 'Show Modern Version' : 'King James Version'}
	</button>

	{#if kjv}
		<div>
			<PsalmNumber n={psalm23kjv.number} />
			<SectionTitle fancy text={psalm23kjv.name} latin_size />
			<ShowPsalm ps={23} />
		</div>
	{:else}
		<div>
			<PsalmNumber n={psalm23.number} />
			<SectionTitle fancy text={psalm23.name} latin_size />
			<ShowPsalm ps={23} />
		</div>
	{/if}
</div>

<PageNumber page={295} text="Day 4: Evening Prayer | Psalm 7 |" />
