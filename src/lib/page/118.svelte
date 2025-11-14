<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle text="the lord’s prayer" />
<Rubric text="The Celebrant then says" />
<Line text="And now as our Savior Christ has taught us, we are bold to pray:" />
<Rubric text="Celebrant and People together pray" />
<LordsPrayer />
<SectionTitle text="the fraction" />
<Rubric text="If the consecrated Bread was not broken earlier, the Celebrant breaks it now." />
<Rubric text="A period of silence is kept." />
<Rubric text="Then may be sung or said" />
<Versical celebrant text="[Alleluia.] Christ our Passover is sacrificed for us." />
<Versical people text="Therefore let us keep the feast. [Alleluia.]" />
<OrThis />
<Versical
	celebrant
	text="[Alleluia.] Christ our Passover Lamb has been sacrificed, once for all upon the Cross."
/>
<Versical celebrant text="People Therefore let us keep the feast. [Alleluia.]" />
<PageNumber page={118} text="the holy eucharist" />
