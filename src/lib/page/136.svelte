<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import AgnusDei from '$lib/text_component/agnus_dei.svelte';
	import Communion from '$lib/text_component/communion.svelte';
</script>

<AgnusDei />
<Communion />
<Line text="The Body of Christ, the bread of heaven." />
<Line text="The Blood of Christ, the cup of salvation." />
<Rubric text="During the ministration of Communion, hymns, psalms, or anthems may be sung." />
<Rubric
	text="The Celebrant may offer a sentence of Scripture at the conclusion of the Communion."
/>
<PageNumber page={136} text="the holy eucharist" />
