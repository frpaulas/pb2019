<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ComfortableWords from '$lib/text_component/comfortable_words.svelte';
	import EpiscopalAbsolution from '$lib/text_component/episcopal_absolution.svelte';
</script>

<Line indent bold text="against your divine majesty," />
<Line indent bold text="provoking most justly your righteous anger against us." />
<Line bold text="We are deeply sorry for these our transgressions;" />
<Line indent bold text="the burden of them is more than we can bear." />
<Line bold text="Have mercy upon us," />
<Line bold text="Have mercy upon us, most merciful Father;" />
<Line indent bold text="for your Son our Lord Jesus Christ’s sake," />
<Line indent bold text="forgive us all that is past;" />
<Line indent bold text="and grant that we may evermore serve and please you in" />
<Line indent bold text="newness of life," />
<Line indent bold text="to the honor and glory of your Name;" />
<Line indent bold text="through Jesus Christ our Lord. Amen." />
<EpiscopalAbsolution />
<ComfortableWords to={2} />

<PageNumber page={113} text="holy eucharist | anglican standard text" />
