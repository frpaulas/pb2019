<script>
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import OrThis from './or_this.svelte';

	let { pg = 0 } = $props();
</script>

{#if pg != 120}
	<SectionTitle>the ministration of communion</SectionTitle>
	<Rubric>Facing the People, the Celebrant may say the following invitation</Rubric>
{/if}

{#if pg != 119}
	<TextBlock
		>The gifts of God for the people of God. [Take them in remembrance that Christ died for you and
		feed on him in your hearts by faith, with thanksgiving.]</TextBlock
	>
	<OrThis />
	<Scripture
		text="Behold the Lamb of God, behold him who takes away the sins
of the world. Blessed are those who are invited to the marriage
supper of the Lamb."
		ref="revelation 19:9, john 1:29"
		t
	/>
	<Rubric
		>The Ministers receive the Sacrament in both kinds, and then immediately deliver it to the
		People.</Rubric
	>
	<Rubric>The Bread and Cup are given to the communicants with these words</Rubric>
{/if}
