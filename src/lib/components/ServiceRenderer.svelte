<script>
	import { match } from '$lib/utils/match';
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
	import OfficeConfessionIntro from '$lib/prayer/office_confession_intro.svelte';
	import OfficeConfession from '$lib/prayer/office_confession.svelte';
	import OfficeAbsolution from '$lib/prayer/office_absolution.svelte';
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
	import VerticalMargin from '$lib/page_helpers/vertical_margin.svelte';

	// Front matter pages
	import PageIII from '$lib/text_component/iii.svelte';
	import PageIV from '$lib/text_component/iv.svelte';
	import PageV from '$lib/text_component/v.svelte';
	import PageVI from '$lib/text_component/vi.svelte';
	import PageVII from '$lib/text_component/vii.svelte';

	// Import all canticles
	import AgainstPerilsEp from '$lib/canticle/against_perils_ep.svelte';
	import BenediciteOnmiaOperaDomini from '$lib/canticle/benedicite_onmia_opera_domini.svelte';
	import Benedictus from '$lib/canticle/benedictus.svelte';
	import BenedictusEsDomine from '$lib/canticle/benedictus_es_domine.svelte';
	import CantateDomino from '$lib/canticle/cantate_domino.svelte';
	import CantemusDomino from '$lib/canticle/cantemus_domino.svelte';
	import DeusMisereatur from '$lib/canticle/deus_misereatur.svelte';
	import DignuEs from '$lib/canticle/dignu_es.svelte';
	import EcceDeus from '$lib/canticle/ecce_deus.svelte';
	import EveOfWorshipEp from '$lib/canticle/eve_of_worship_ep.svelte';
	import FaithEp from '$lib/canticle/faith_ep.svelte';
	import Jubilate from '$lib/canticle/jubilate.svelte';
	import KyriePantokrator from '$lib/canticle/kyrie_pantokrator.svelte';
	import Magnificat from '$lib/canticle/magnificat.svelte';
	import MagnaEtMirabilia from '$lib/canticle/magna_et_mirabilia.svelte';
	import NuncDimittis from '$lib/canticle/nunc_dimittis.svelte';
	import PaschaNostrum from '$lib/canticle/pascha_nostrum.svelte';
	import PeaceEp from '$lib/canticle/peace_ep.svelte';
	import PhosHilaron from '$lib/canticle/phos_hilaron.svelte';
	import PresenceChristEp from '$lib/canticle/presence_christ_ep.svelte';
	import ProtectionEp from '$lib/canticle/protection_ep.svelte';
	import QuaeriteDominum from '$lib/canticle/quaerite_dominum.svelte';
	import ResurrectionHopeEp from '$lib/canticle/resurrection_hope_ep.svelte';
	import SurgeIlluminare from '$lib/canticle/surge_illuminare.svelte';
	import TeDeumLaudamus from '$lib/canticle/te_deum_laudamus.svelte';
	import VeniCreatorSpiritus from '$lib/canticle/veni_creator_spiritus.svelte';
	import Venite from '$lib/canticle/venite.svelte';

	// Map canticle names to components
	const canticleMap = {
		against_perils_ep: AgainstPerilsEp,
		benedicite_onmia_opera_domini: BenediciteOnmiaOperaDomini,
		benedictus: Benedictus,
		benedictus_es_domine: BenedictusEsDomine,
		cantate_domino: CantateDomino,
		cantemus_domino: CantemusDomino,
		chrysostom: Chrysostom,
		deus_misereatur: DeusMisereatur,
		dignu_es: DignuEs,
		ecce_deus: EcceDeus,
		eve_of_worship_ep: EveOfWorshipEp,
		faith_ep: FaithEp,
		jubilate: Jubilate,
		kyrie_pantokrator: KyriePantokrator,
		magnificat: Magnificat,
		magna_et_mirabilia: MagnaEtMirabilia,
		nunc_dimittis: NuncDimittis,
		pacha_nostrum: PaschaNostrum,
		pascha_nostrum: PaschaNostrum,
		peace_ep: PeaceEp,
		phos_hilaron: PhosHilaron,
		presence_christ_ep: PresenceChristEp,
		protection_ep: ProtectionEp,
		quaerite_dominum: QuaeriteDominum,
		resurrection_hope_ep: ResurrectionHopeEp,
		surge_illuminare: SurgeIlluminare,
		te_deum_laudamus: TeDeumLaudamus,
		veni_creator_spiritus: VeniCreatorSpiritus,
		venite: Venite
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

	// Component type mapping
	const componentMap = {
		section_title: SectionTitle,
		rubric: Rubric,
		scripture: Scripture,
		text_block: TextBlock,
		line: Line,
		versical: Versical,
		ordered_list_item: OrderedListItem,
		unordered_list_item: UnorderedListItem,
		antiphon: Antiphon,
		ref: Ref,
		then_follows: ThenFollows,
		or_this: OrThis,
		gloria: Gloria,
		apostles_creed: ApostlesCreed,
		nicene_creed: NiceneCreed,
		lords_prayer: LordsPrayer,
		kyrie: Kyrie,
		gloria_in_excelsis: GloriaInExcelsis,
		agnus_dei: AgnusDei,
		sanctus: Sanctus,
		confession_communion: ConfessionCommunion,
		office_confession_intro: OfficeConfessionIntro,
		office_confession: OfficeConfession,
		office_absolution: OfficeAbsolution,
		general_thanksgiving: GeneralThanksgiving,
		humble_access: HumbleAccess,
		post_communion_standard: PostCommunionStandard,
		in_the_morning: InTheMorning,
		chrysostom: Chrysostom,
		footnote: Footnote,
		silence: Silence,
		vertical_margin: VerticalMargin,
		page_break: PageBreakMarker,
		blank_page: IntentionallyBlank,
		intentionally_blank: IntentionallyBlank,
		signature_block: SignatureBlock,
		section_page: SectionPage,
		show_psalm: ShowPsalm,
		calendar: Calendar,
		find_easter: FindEaster,
		lectionary: Lectionary,
		holy_day: HolyDay,
		iii: PageIII,
		iv: PageIV,
		v: PageV,
		vi: PageVI,
		vii: PageVII
	};

	let { serviceData } = $props();
</script>

<div class="service-content">
	{#each serviceData.sections as section}
		<section id={section.id} data-section={section.id}>
			{#each section.content as block}
				{@const Component = match(block.type, componentMap)}

				{#if block.type === 'section_title'}
					<Component
						size={block.size ? `text-${block.size}` : 'text-base'}
						fancy={block.fancy || false}
						latin_size={block.latin_size || false}
						fancyOf={block.fancyOf || false}
						lowercase={block.lowercase || false}
					>
						{block.text}
					</Component>
				{:else if block.type === 'rubric'}
					<Component add_on={block.add_on || ''} content={block.content}>{block.text}</Component>
				{:else if block.type === 'scripture'}
					<Component ref={block.ref} t={block.t || false}>
						{block.text}{#if block.amen}
							Amen.{/if}
					</Component>
				{:else if block.type === 'text_block'}
					<Component bold={block.bold || false} content={block.content}
						>{block.text}{#if block.amen}
							Amen.{/if}</Component
					>
				{:else if block.type === 'line'}
					<Component bold={block.bold || false} indent={block.indent || false} text={block.text} />
				{:else if block.type === 'versical'}
					<Component officiant={block.officiant || false} people={block.people || false}>
						{block.text}
					</Component>
				{:else if block.type === 'ordered_list_item'}
					<Component
						number={block.number}
						bold={block.bold}
						indent={block.indent}
						optional={block.optional}
					>
						{block.text}
					</Component>
				{:else if block.type === 'unordered_list_item'}
					<Component bold={block.bold} indent={block.indent} optional={block.optional}>
						{block.text}
					</Component>
				{:else if block.type === 'antiphon'}
					<Component call={block.call} response={block.response} />
				{:else if block.type === 'ref'}
					<Component text={block.text} t={block.t || false} />
				{:else if block.type === 'then_follows'}
					<Component>{block.text}</Component>
				{:else if block.type === 'gloria'}
					<Component versical={block.versical || false} />
				{:else if block.type === 'lords_prayer'}
					<Component toggle={block.toggle || false} />
				{:else if block.type === 'footnote'}
					<Component text={block.text} />
				{:else if block.type === 'line_break'}
					<br />
				{:else if block.type === 'vertical_margin'}
					<Component spacing={block.spacing} />
				{:else if block.type === 'page_break'}
					<Component page={block.page} />
				{:else if block.type === 'signature_block'}
					<Component signatures={block.signatures} date={block.date} dateRoman={block.dateRoman} />
				{:else if block.type === 'section_page'}
					<Component text={block.text} />
				{:else if block.type === 'show_psalm'}
					<Component
						ps={block.ps}
						from={block.from}
						to={block.to}
						fromLine={block.fromLine}
						toLine={block.toLine}
						bold={block.bold || false}
						showTitle={block.showTitle || false}
					/>
				{:else if block.type === 'holy_day'}
					<Component name={block.name} />
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
				{:else if Component}
					<!-- Simple component with no props or children -->
					<Component />
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
