<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Silence from '$lib/page_helpers/silence.svelte';
	import ComfortableWords from '$lib/text_component/comfortable_words.svelte';
	import EpiscopalAbsolution from '$lib/text_component/episcopal_absolution.svelte';
</script>

<Rubric>The Deacon and People kneel as able and pray</Rubric>
<Silence />
<Line>Most merciful God,</Line>
<Line indent>we confess that we have sinned against you</Line>
<Line indent>in thought, word, and deed,</Line>
<Line indent>by what we have done, and by what we have left undone.</Line>
<Line>We have not loved you with our whole heart;</Line>
<Line indent>we have not loved our neighbors as ourselves.</Line>
<Line>We are truly sorry and we humbly repent.</Line>
<Line>For the sake of your Son Jesus Christ,</Line>
<Line indent>have mercy on us and forgive us;</Line>
<Line indent>that we may delight in your will, and walk in your ways,</Line>
<Line indent>to the glory of your Name. Amen.</Line>
<EpiscopalAbsolution />
<ComfortableWords to={2} />
<PageNumber page={130} text="the holy eucharist" />
