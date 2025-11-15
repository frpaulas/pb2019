<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Sanctus from '$lib/text_component/sanctus.svelte';
	import SursumCorda from '$lib/text_component/sursum_corda.svelte';
</script>

<SursumCorda />
<Sanctus />
<SectionTitle text="The prayer of consecration" />
<Rubric text="The People stand or kneel. The Celebrant continues" />
<TextBlock
	text="Holy and gracious Father: In your infinite love you made us
    for yourself; and when we had sinned against you and become"
/>
<PageNumber page={132} text="the holy eucharist" />
