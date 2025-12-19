<script>
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Antiphon from '$lib/page_helpers/antiphon.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import ThenFollows from '$lib/page_helpers/then_follows.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
	import ApostlesCreed from '$lib/text_component/apostles_creed.svelte';
	import NiceneCreed from '$lib/text_component/nicene_creed.svelte';
	import LordsPrayer from '$lib/prayer/lords_prayer.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
	import Chrysostom from '$lib/canticle/chrysostom.svelte';
	import GloriaInExcelsis from '$lib/text_component/gloria_in_excelsis.svelte';
	import AgnusDei from '$lib/text_component/agnus_dei.svelte';
	import Sanctus from '$lib/text_component/sanctus.svelte';
	import ConfessionCommunion from '$lib/prayer/confession_communion.svelte';
	import ConfessionOffice from '$lib/prayer/confession_office.svelte';
	import GeneralThanksgiving from '$lib/prayer/general_thanksgiving.svelte';
	import HumbleAccess from '$lib/prayer/humble_access.svelte';
	import PostCommunionStandard from '$lib/prayer/post_communion_standard.svelte';
	import InTheMorning from '$lib/prayer/in_the_morning.svelte';
	import Footnote from '$lib/page_helpers/footnote.svelte';
	import Silence from '$lib/page_helpers/silence.svelte';
	import IntentionallyBlank from '$lib/page_helpers/intentionally_blank.svelte';
	import SignatureBlock from '$lib/page_helpers/signature_block.svelte';
	import SectionPage from '$lib/page_helpers/section_page.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Calendar from '$lib/page_helpers/calendar.svelte';
	import FindEaster from '$lib/page_helpers/find_easter.svelte';
	import Lectionary from '$lib/page_helpers/lectionary.svelte';
	import HolyDay from '$lib/page_helpers/holy_day.svelte';
	import OrderedListItem from '$lib/page_helpers/ordered_list_item.svelte';
	import UnorderedListItem from '$lib/page_helpers/unordered_list_item.svelte';
	import PageBreakMarker from '$lib/page_helpers/page_break_marker.svelte';

	// Import all canticles
	import AgainstPerilsEp from '$lib/canticle/against_perils_ep.svelte';
	import BenediciteOnmiaOperaDomini from '$lib/canticle/benedicite_onmia_opera_domini.svelte';
	import CantateDomino from '$lib/canticle/cantate_domino.svelte';
	import CantemusDomino from '$lib/canticle/cantemus_domino.svelte';
	import DeusMisereatur from '$lib/canticle/deus_misereatur.svelte';
	import DignuEs from '$lib/canticle/dignu_es.svelte';
	import EcceDeus from '$lib/canticle/ecce_deus.svelte';
	import EveOfWorshipEp from '$lib/canticle/eve_of_worship_ep.svelte';
	import FaithEp from '$lib/canticle/faith_ep.svelte';
	import KyriePantokrator from '$lib/canticle/kyrie_pantokrator.svelte';
	import MagnaEtMirabilia from '$lib/canticle/magna_et_mirabilia.svelte';
	import NuncDimittis from '$lib/canticle/nunc_dimittis.svelte';
	import PeaceEp from '$lib/canticle/peace_ep.svelte';
	import PhosHilaron from '$lib/canticle/phos_hilaron.svelte';
	import PresenceChristEp from '$lib/canticle/presence_christ_ep.svelte';
	import ProtectionEp from '$lib/canticle/protection_ep.svelte';
	import QuaeriteDominum from '$lib/canticle/quaerite_dominum.svelte';
	import ResurrectionHopeEp from '$lib/canticle/resurrection_hope_ep.svelte';
	import SurgeIlluminare from '$lib/canticle/surge_illuminare.svelte';

	// Map canticle names to components
	const canticleMap = {
		against_perils_ep: AgainstPerilsEp,
		benedicite_onmia_opera_domini: BenediciteOnmiaOperaDomini,
		cantate_domino: CantateDomino,
		cantemus_domino: CantemusDomino,
		chrysostom: Chrysostom,
		deus_misereatur: DeusMisereatur,
		dignu_es: DignuEs,
		ecce_deus: EcceDeus,
		eve_of_worship_ep: EveOfWorshipEp,
		faith_ep: FaithEp,
		kyrie_pantokrator: KyriePantokrator,
		magna_et_mirabilia: MagnaEtMirabilia,
		nunc_dimittis: NuncDimittis,
		peace_ep: PeaceEp,
		phos_hilaron: PhosHilaron,
		presence_christ_ep: PresenceChristEp,
		protection_ep: ProtectionEp,
		quaerite_dominum: QuaeriteDominum,
		resurrection_hope_ep: ResurrectionHopeEp,
		surge_illuminare: SurgeIlluminare
	};

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

	let { serviceData } = $props();
</script>

<div class="service-content">
	{#each serviceData.sections as section}
		<section id={section.id} data-section={section.id}>
			{#each section.content as block}
				{#if block.type === 'section_title'}
					<SectionTitle
						size={block.size ? `text-${block.size}` : 'text-base'}
						fancy={block.fancy || false}
						latin_size={block.latin_size || false}
						fancyOf={block.fancyOf || false}
						lowercase={block.lowercase || false}
					>
						{block.text}
					</SectionTitle>
				{:else if block.type === 'rubric'}
					<Rubric add_on={block.add_on || ''}>{block.text}</Rubric>
				{:else if block.type === 'scripture'}
					<Scripture ref={block.ref} t={block.t || false}>
						{block.text}{#if block.amen}
							Amen.{/if}
					</Scripture>
				{:else if block.type === 'text_block'}
					<TextBlock bold={block.bold || false}
						>{block.text}{#if block.amen}
							Amen.{/if}</TextBlock
					>
				{:else if block.type === 'line'}
					<Line bold={block.bold || false} indent={block.indent || false} text={block.text} />
				{:else if block.type === 'versical'}
					<Versical officiant={block.officiant || false} people={block.people || false}>
						{block.text}
					</Versical>
				{:else if block.type === 'ordered_list_item'}
					<OrderedListItem
						number={block.number}
						bold={block.bold}
						indent={block.indent}
						optional={block.optional}
					>
						{block.text}
					</OrderedListItem>
				{:else if block.type === 'unordered_list_item'}
					<UnorderedListItem bold={block.bold} indent={block.indent} optional={block.optional}>
						{block.text}
					</UnorderedListItem>
				{:else if block.type === 'antiphon'}
					<Antiphon call={block.call} response={block.response} />
				{:else if block.type === 'ref'}
					<Ref text={block.text} t={block.t || false} />
				{:else if block.type === 'then_follows'}
					<ThenFollows>{block.text}</ThenFollows>
				{:else if block.type === 'or_this'}
					<OrThis />
				{:else if block.type === 'gloria'}
					<Gloria versical={block.versical || false} />
				{:else if block.type === 'apostles_creed'}
					<ApostlesCreed />
				{:else if block.type === 'nicene_creed'}
					<NiceneCreed />
				{:else if block.type === 'lords_prayer'}
					<LordsPrayer toggle={block.toggle || false} />
				{:else if block.type === 'kyrie'}
					<Kyrie />
				{:else if block.type === 'gloria_in_exelsis' || block.type === 'gloria_in_excelsis'}
					<GloriaInExcelsis />
				{:else if block.type === 'agnus_dei'}
					<AgnusDei />
				{:else if block.type === 'sanctus'}
					<Sanctus />
				{:else if block.type === 'confession_communion'}
					<ConfessionCommunion />
				{:else if block.type === 'office_confession' || block.type === 'confession_office'}
					<ConfessionOffice />
				{:else if block.type === 'general_thanksgiving'}
					<GeneralThanksgiving />
				{:else if block.type === 'humble_access'}
					<HumbleAccess />
				{:else if block.type === 'post_communion_standard'}
					<PostCommunionStandard />
				{:else if block.type === 'in_the_morning'}
					<InTheMorning />
				{:else if block.type === 'chrysostom'}
					<Chrysostom />
				{:else if block.type === 'footnote'}
					<Footnote text={block.text} />
				{:else if block.type === 'silence'}
					<Silence />
				{:else if block.type === 'line_break'}
					<br />
				{:else if block.type === 'page_break'}
					<PageBreakMarker page={block.page} />
				{:else if block.type === 'blank_page'}
					<IntentionallyBlank />
				{:else if block.type === 'intentionally_blank'}
					<IntentionallyBlank />
				{:else if block.type === 'signature_block'}
					<SignatureBlock
						signatures={block.signatures}
						date={block.date}
						dateRoman={block.dateRoman}
					/>
				{:else if block.type === 'section_page'}
					<SectionPage text={block.text} />
				{:else if block.type === 'show_psalm'}
					<ShowPsalm
						ps={block.ps}
						from={block.from}
						to={block.to}
						fromLine={block.fromLine}
						toLine={block.toLine}
						bold={block.bold || false}
					/>
				{:else if block.type === 'canticle'}
					{#if canticleMap[block.name]}
						{@const CanticleComponent = canticleMap[block.name]}
						<CanticleComponent />
					{:else}
						<p class="text-red-500">Unknown canticle: {block.name}</p>
					{/if}
				{:else if block.type === 'collect'}
					{#if collectMap[block.name]}
						{@const CollectComponent = collectMap[block.name]}
						<CollectComponent />
					{:else}
						<p class="text-red-500">Unknown collect: {block.name}</p>
					{/if}
				{:else if block.type === 'occasional_prayer'}
					{#if occasionalPrayerMap[block.name]}
						{@const PrayerComponent = occasionalPrayerMap[block.name]}
						<PrayerComponent />
					{:else}
						<p class="text-red-500">Unknown occasional prayer: {block.name}</p>
					{/if}
				{:else if block.type === 'calendar'}
					<Calendar />
				{:else if block.type === 'find_easter'}
					<FindEaster />
				{:else if block.type === 'lectionary'}
					<Lectionary />
				{:else if block.type === 'holy_day'}
					<HolyDay name={block.name} />
				{:else}
					<!-- Fallback for unhandled types -->
					<div class="text-sm text-amber-600 italic">
						[Component not yet implemented: {block.type}]
					</div>
				{/if}
			{/each}
		</section>
	{/each}
</div>

<style>
	.service-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	section {
		margin-bottom: 2rem;
	}
</style>
