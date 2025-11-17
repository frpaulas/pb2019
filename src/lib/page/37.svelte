<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
</script>

<Rubric>The Officiant then begins the Prayers</Rubric>
Officiant People
<Versical officiant text="I will bless the Lord at all times." />
<Versical people text="His praise shall continually be in my mouth." />
<Kyrie />
<Rubric>Officiant and People</Rubric>
<LordsPrayer />
<Versical officiant text="O Lord, hear our prayer;" />
<Versical people text="And let our cry come to you." />
<Versical officiant text="Let us pray." />
<PageNumber page={37} text="Midday prayer" />
