<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import LordBeWithYou from '$lib/text_component/lord_be_with_you.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
</script>

<SectionTitle>the prayers</SectionTitle>
<LordBeWithYou />
<Kyrie />
<LordsPrayer />
<Rubric>Then follows one of these sets of Suffrages</Rubric>
<Versical officiant text="O Lord, show your mercy upon us;" />
<Versical people text="And grant us your salvation." />
<Versical officiant text="O Lord, guide those who govern us;" />
<Versical people text="And lead us in the way of justice and truth." />
<PageNumber page={47} text="Daily Evening prayer" />
