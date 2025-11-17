<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ComfortableWords from '$lib/text_component/comfortable_words.svelte';
	import EpiscopalAbsolution from '$lib/text_component/episcopal_absolution.svelte';
</script>

<Line indent bold>against your divine majesty,</Line>
<Line indent bold>provoking most justly your righteous anger against us.</Line>
<Line bold>We are deeply sorry for these our transgressions;</Line>
<Line indent bold>the burden of them is more than we can bear.</Line>
<Line bold>Have mercy upon us,</Line>
<Line bold>Have mercy upon us, most merciful Father;</Line>
<Line indent bold>for your Son our Lord Jesus Christ’s sake,</Line>
<Line indent bold>forgive us all that is past;</Line>
<Line indent bold>and grant that we may evermore serve and please you in</Line>
<Line indent bold>newness of life,</Line>
<Line indent bold>to the honor and glory of your Name;</Line>
<Line indent bold>through Jesus Christ our Lord. Amen.</Line>
<EpiscopalAbsolution />
<ComfortableWords to={2} />

<PageNumber page={113} text="holy eucharist | anglican standard text" />
