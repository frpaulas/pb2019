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
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
	import Chrysostom from '$lib/canticle/chrysostom.svelte';
	import Footnote from '$lib/page_helpers/footnote.svelte';
	import Silence from '$lib/page_helpers/silence.svelte';
	import IntentionallyBlank from '$lib/page_helpers/intentionally_blank.svelte';

	let { serviceData } = $props();
</script>

<div class="service-content">
	{#each serviceData.sections as section}
		<section id={section.id} data-section={section.id}>
			{#each section.content as block}
				{#if block.type === 'section_title'}
					<SectionTitle
						size={block.size || 'text-l'}
						fancy={block.fancy || false}
						latin_size={block.latin_size || false}
						fancyOf={block.fancyOf || false}
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
					<TextBlock
						>{block.text}{#if block.amen}
							Amen.{/if}</TextBlock
					>
				{:else if block.type === 'line'}
					<Line bold={block.bold || false} indent={block.indent || false}>
						{block.text}
					</Line>
				{:else if block.type === 'versical'}
					<Versical officiant={block.officiant || false} people={block.people || false}>
						{block.text}
					</Versical>
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
				{:else if block.type === 'lords_prayer'}
					<LordsPrayer toggle={block.toggle || false} />
				{:else if block.type === 'kyrie'}
					<Kyrie />
				{:else if block.type === 'chrysostom'}
					<Chrysostom />
				{:else if block.type === 'footnote'}
					<Footnote text={block.text} />
				{:else if block.type === 'silence'}
					<Silence />
				{:else if block.type === 'intentionally_blank'}
					<IntentionallyBlank />
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
