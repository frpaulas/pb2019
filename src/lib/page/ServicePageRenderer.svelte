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
	import Gloria from '$lib/text_component/gloria.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import ShowAppointedPsalms from '$lib/page_helpers/show_appointed_psalms.svelte';
	import ShowAppointedReadings from '$lib/page_helpers/show_appointed_readings.svelte';
	import ShowEucharistReadings from '$lib/page_helpers/show_eucharist_readings.svelte';
	import SeasonalScripture from '$lib/page_helpers/seasonal_scripture.svelte';
	import SeasonalAntiphon from '$lib/page_helpers/seasonal_antiphon.svelte';
	import WeeklyCollects from '$lib/page_helpers/weekly_collects.svelte';
	import LordsPrayer from '$lib/prayer/lords_prayer.svelte';
	import LordsPrayerNoDox from '$lib/prayer/lords_prayer_nodox.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
	import NiceneCreed from '$lib/text_component/nicene_creed.svelte';
	import ScriptureLink from '$lib/page_helpers/scripture_link.svelte';

	// Front matter pages
	import PageIII from '$lib/text_component/iii.svelte';
	import PageIV from '$lib/text_component/iv.svelte';
	import PageV from '$lib/text_component/v.svelte';
	import PageVI from '$lib/text_component/vi.svelte';
	import PageVII from '$lib/text_component/vii.svelte';

	// Import canticles from JSON (lazy lookup instead of eager component loading)
	import canticlesData from '$lib/data/canticles/canticles.json';

	// Import collects from JSON (lazy lookup instead of eager component loading)
	import collectsData from '$lib/data/collects/collects.json';

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
	{#if block.type === 'vertical_margin'}
		<div style="height: {block.spacing}em;"></div>
	{:else if block.type === 'hr'}
		<hr class="horizontal-rule" />
	{:else if block.type === 'section_title'}
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
			reader={block.reader || false}
			deacon={block.deacon || false}
			minister={block.minister || false}
			celebrant={block.celebrant || false}
			bishop={block.bishop || false}
			bold={block.bold || false}
			text={block.text}
		/>
	{:else if block.type === 'antiphon'}
		<Antiphon call={block.call} response={block.response} />
	{:else if block.type === 'ref'}
		<Ref text={block.text} />
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
	{:else if block.type === 'eucharist_readings'}
		<ShowEucharistReadings type={block.readingType} />
	{:else if block.type === 'seasonal_scripture'}
		<SeasonalScripture office={block.office} />
	{:else if block.type === 'seasonal_antiphon'}
		<SeasonalAntiphon />
	{:else if block.type === 'weekly_collects'}
		<WeeklyCollects office={block.office} />
	{:else if block.type === 'lords_prayer'}
		<LordsPrayer />
	{:else if block.type === 'lords_prayer_nodox'}
		<LordsPrayerNoDox />
	{:else if block.type === 'kyrie'}
		<Kyrie />
	{:else if block.type === 'nicene_creed'}
		<NiceneCreed />
	{:else if block.type === 'scripture_link'}
		<p class:ml-8={block.indent}>
			<ScriptureLink reference={block.reference} />
		</p>
	{:else if block.type === 'canticle'}
		{@const canticleBlocks = canticlesData[block.name]}
		{#if canticleBlocks}
			{#each canticleBlocks as canticleBlock}
				{#if canticleBlock.type === 'section_title'}
					<SectionTitle
						fancy={canticleBlock.fancy || false}
						latin_size={canticleBlock.latin_size || false}>{canticleBlock.text}</SectionTitle
					>
				{:else if canticleBlock.type === 'rubric'}
					<Rubric>{canticleBlock.text}</Rubric>
				{:else if canticleBlock.type === 'text_block'}
					<TextBlock amen={canticleBlock.amen || false}>{canticleBlock.text}</TextBlock>
				{:else if canticleBlock.type === 'line'}
					<Line
						bold={canticleBlock.bold || false}
						indent={canticleBlock.indent || false}
						text={canticleBlock.text}
					/>
				{:else if canticleBlock.type === 'ref'}
					<Ref text={canticleBlock.text} />
				{:else if canticleBlock.type === 'gloria'}
					<Gloria />
				{:else if canticleBlock.type === 'vertical_margin'}
					<div style="height: {canticleBlock.spacing}em;"></div>
				{/if}
			{/each}
		{:else}
			<p class="text-red-500">Unknown canticle: {block.name}</p>
		{/if}
	{:else if block.type === 'collect'}
		{@const collectBlocks = collectsData[block.name]}
		{#if collectBlocks}
			{#each collectBlocks as collectBlock}
				{#if collectBlock.type === 'section_title'}
					<SectionTitle>{collectBlock.text}</SectionTitle>
				{:else if collectBlock.type === 'text_block'}
					<TextBlock>{collectBlock.text}</TextBlock>
				{/if}
			{/each}
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

<style>
	.horizontal-rule {
		border: none;
		border-top: 1px solid #9ca3af;
		border-bottom: 1px solid #9ca3af;
		height: 3px;
		margin: 1em 0;
	}
</style>
