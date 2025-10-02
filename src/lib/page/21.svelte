<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
</script>

<Rubric text="" />
<Kyrie />
<Rubric text="Officiant and People" />
<LordsPrayer />
<Versical officiant text="O Lord, show your mercy upon us;" />
<Versical people text="And grant us your salvation." />
<Versical officiant text="O Lord, guide those who govern us;" />
<Versical people text="And lead us in the way of justice and truth." />
<Versical officiant text="Clothe your ministers with righteousness;" />
<Versical people text="And let your people sing with joy." />
<PageNumber page={21} text="daily morning prayer" />
