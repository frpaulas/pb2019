<script>
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import OrThis from './or_this.svelte';

	let { pg = 0 } = $props();
</script>

{#if pg != 120}
	<SectionTitle text="the ministration of communion" />
	<Rubric text="Facing the People, the Celebrant may say the following invitation" />
{/if}

{#if pg != 119}
	<TextBlock
		text="The gifts of God for the people of God. [Take them in
remembrance that Christ died for you and feed on him in your
hearts by faith, with thanksgiving.]"
	/>
	<OrThis />
	<Scripture
		text="Behold the Lamb of God, behold him who takes away the sins
of the world. Blessed are those who are invited to the marriage
supper of the Lamb."
		ref="revelation 19:9, john 1:29"
		t
	/>
	<Rubric
		text="The Ministers receive the Sacrament in both kinds, and then immediately deliver
    it to the People."
	/>
	<Rubric text="The Bread and Cup are given to the communicants with these words" />
{/if}
