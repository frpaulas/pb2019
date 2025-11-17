<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
</script>

<Rubric></Rubric>
<Kyrie />
<Rubric>Officiant and People</Rubric>
<LordsPrayer />
<Versical officiant>O Lord, show your mercy upon us;</Versical>
<Versical people>And grant us your salvation.</Versical>
<Versical officiant>O Lord, guide those who govern us;</Versical>
<Versical people>And lead us in the way of justice and truth.</Versical>
<Versical officiant>Clothe your ministers with righteousness;</Versical>
<Versical people>And let your people sing with joy.</Versical>
<PageNumber page={21} text="daily morning prayer" />
