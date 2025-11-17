<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle>the lord’s prayer</SectionTitle>
<Rubric>The Celebrant then says</Rubric>
<Line>And now as our Savior Christ has taught us, we are bold to pray:</Line>
<Rubric>Celebrant and People together pray</Rubric>
<LordsPrayer />
<SectionTitle>the fraction</SectionTitle>
<Rubric>If the consecrated Bread was not broken earlier, the Celebrant breaks it now.</Rubric>
<Rubric>A period of silence is kept.</Rubric>
<Rubric>Then may be sung or said</Rubric>
<Versical celebrant text="[Alleluia.] Christ our Passover is sacrificed for us." />
<Versical people text="Therefore let us keep the feast. [Alleluia.]" />
<OrThis />
<Versical
	celebrant
	text="[Alleluia.] Christ our Passover Lamb has been sacrificed, once for all upon the Cross."
/>
<Versical celebrant text="People Therefore let us keep the feast. [Alleluia.]" />
<PageNumber page={118} text="the holy eucharist" />
