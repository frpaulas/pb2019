<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Silence from '$lib/page_helpers/silence.svelte';
	import ComfortableWords from '$lib/text_component/comfortable_words.svelte';
	import EpiscopalAbsolution from '$lib/text_component/episcopal_absolution.svelte';
</script>

<Rubric text="The Deacon and People kneel as able and pray" />
<Silence />
<Line text="Most merciful God," />
<Line indent text="we confess that we have sinned against you" />
<Line indent text="in thought, word, and deed," />
<Line indent text="by what we have done, and by what we have left undone." />
<Line text="We have not loved you with our whole heart;" />
<Line indent text="we have not loved our neighbors as ourselves." />
<Line text="We are truly sorry and we humbly repent." />
<Line text="For the sake of your Son Jesus Christ," />
<Line indent text="have mercy on us and forgive us;" />
<Line indent text="that we may delight in your will, and walk in your ways," />
<Line indent text="to the glory of your Name. Amen." />
<EpiscopalAbsolution />
<ComfortableWords to={2} />
<PageNumber page={130} text="the holy eucharist" />
