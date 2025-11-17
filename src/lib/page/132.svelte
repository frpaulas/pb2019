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
<p class="mb-4">
	Holy and gracious Father: In your infinite love you made us for yourself; and when we had sinned
	against you and become<PageNumber page={132} text="the holy eucharist" />subject to evil and
	death, you, in your mercy, sent your only Son Jesus Christ into the world for our salvation. By
	the Holy Spirit and the Virgin Mary he became flesh and dwelt among us. In obedience to your will,
	he stretched out his arms upon the Cross and offered himself once for all, that by his suffering
	and death we might be saved. By his resurrection he broke the bonds of death, trampling Hell and
	Satan under his feet. As our great high priest, he ascended to your right hand in glory, that we
	might come with confidence before the throne of grace.
</p>
<Rubric
	text="At the following words concerning the bread, the Celebrant is to hold it, or lay
a hand upon it, and here* may break the bread; and at the words concerning the
cup, to hold or place a hand upon the cup and any other vessel containing the wine
to be consecrated."
/>
