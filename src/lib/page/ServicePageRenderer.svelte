<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Antiphon from '$lib/page_helpers/antiphon.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import ShowAppointedPsalms from '$lib/page_helpers/show_appointed_psalms.svelte';
	import ShowAppointedReadings from '$lib/page_helpers/show_appointed_readings.svelte';
	import OfficeConfessionIntro from '$lib/prayer/office_confession_intro.svelte';
	import OfficeConfession from '$lib/prayer/office_confession.svelte';
	import OfficeAbsolution from '$lib/prayer/office_absolution.svelte';

	// Front matter pages
	import PageIII from '$lib/text_component/iii.svelte';
	import PageIV from '$lib/text_component/iv.svelte';
	import PageV from '$lib/text_component/v.svelte';
	import PageVI from '$lib/text_component/vi.svelte';
	import PageVII from '$lib/text_component/vii.svelte';

	// Dynamically import all canticles
	const canticleModules = import.meta.glob('$lib/canticle/*.svelte', { eager: true });
	const canticleMap = {};
	for (const path in canticleModules) {
		const name = path.match(/\/([^/]+)\.svelte$/)[1];
		canticleMap[name] = canticleModules[path].default;
	}

	// Dynamically import all collects
	const collectModules = import.meta.glob('$lib/collect/*.svelte', { eager: true });
	const collectMap = {};
	for (const path in collectModules) {
		const name = path.match(/\/([^/]+)\.svelte$/)[1];
		collectMap[name] = collectModules[path].default;
	}

	// Dynamically import all occasional prayers
	const occasionalPrayerModules = import.meta.glob('$lib/occasional_prayer/*.svelte', {
		eager: true
	});
	const occasionalPrayerMap = {};
	for (const path in occasionalPrayerModules) {
		const name = path.match(/\/([^/]+)\.svelte$/)[1];
		occasionalPrayerMap[name] = occasionalPrayerModules[path].default;
	}

	let { pageData } = $props();
</script>

{#each pageData.content as block}
	{#if block.type === 'section_title'}
		<SectionTitle
			size={block.size}
			fancy={block.fancy || false}
			latin_size={block.latin_size || false}
		>
			{block.text}
		</SectionTitle>
	{:else if block.type === 'rubric'}
		<Rubric content={block.content}>{block.text}</Rubric>
	{:else if block.type === 'scripture'}
		<Scripture ref={block.ref}>{block.text}</Scripture>
	{:else if block.type === 'text_block'}
		<TextBlock content={block.content}>{block.text}</TextBlock>
	{:else if block.type === 'line'}
		<Line bold={block.bold || false} indent={block.indent || false} text={block.text} />
	{:else if block.type === 'versical'}
		<Versical
			officiant={block.officiant || false}
			people={block.people || false}
			text={block.text}
		/>
	{:else if block.type === 'antiphon'}
		<Antiphon call={block.call} response={block.response} />
	{:else if block.type === 'ref'}
		<Ref text={block.text} />
	{:else if block.type === 'or_this'}
		<OrThis />
	{:else if block.type === 'gloria'}
		<Gloria versical={block.versical || false} />
	{:else if block.type === 'show_psalm'}
		<ShowPsalm
			ps={block.ps}
			from={block.from}
			to={block.to}
			fromLine={block.fromLine}
			toLine={block.toLine}
			bold={block.bold || false}
			showTitle={block.showTitle || false}
		/>
	{:else if block.type === 'appointed_psalms'}
		<ShowAppointedPsalms office={block.office} />
	{:else if block.type === 'appointed_readings'}
		<ShowAppointedReadings office={block.office} />
	{:else if block.type === 'office_confession_intro'}
		<OfficeConfessionIntro />
	{:else if block.type === 'office_confession'}
		<OfficeConfession />
	{:else if block.type === 'office_absolution'}
		<OfficeAbsolution />
	{:else if block.type === 'canticle'}
		{@const CanticleComponent = canticleMap[block.name]}
		{#if CanticleComponent}
			<CanticleComponent />
		{:else}
			<p class="text-red-500">Unknown canticle: {block.name}</p>
		{/if}
	{:else if block.type === 'collect'}
		{@const CollectComponent = collectMap[block.name]}
		{#if CollectComponent}
			<CollectComponent />
		{:else}
			<p class="text-red-500">Unknown collect: {block.name}</p>
		{/if}
	{:else if block.type === 'occasional_prayer'}
		{@const PrayerComponent = occasionalPrayerMap[block.name]}
		{#if PrayerComponent}
			<PrayerComponent />
		{:else}
			<p class="text-red-500">Unknown occasional prayer: {block.name}</p>
		{/if}
	{:else if block.type === 'iii'}
		<PageIII />
	{:else if block.type === 'iv'}
		<PageIV />
	{:else if block.type === 'v'}
		<PageV />
	{:else if block.type === 'vi'}
		<PageVI />
	{:else if block.type === 'vii'}
		<PageVII />
	{/if}
{/each}

<PageNumber page={pageData.pageNumber} text={pageData.headerText} />
