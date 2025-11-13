<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
</script>

<Line text="O Lamb of God, you take away the sin of the world;" />
<Line indent bold text="Have mercy upon us." />
<Line text="O Lamb of God, you take away the sin of the world;" />
<Line indent bold text="Have mercy upon us." />
<Line text="O Lamb of God, you take away the sin of the world;" />
<Line indent bold text="Grant us your peace." />
<Line text="O Christ, hear us." />
<Line indent bold text="O Christ, hear us." />
<Line text="Lord, have mercy upon us." />
<Line indent bold text="Christ, have mercy upon us." />
<Line text="Lord, have mercy upon us." />
<Rubric
	text="When the Litany is sung or said immediately before the Eucharist, the Litany
concludes here, and the Eucharist begins with the Salutation (“The Lord be with
you”) and the Collect of the Day."
/>
<Rubric text="On all other occasions, the Officiant and People say or sing together" />

<LordsPrayer />

<PageNumber page={96} text="great litany & decalogue" />
