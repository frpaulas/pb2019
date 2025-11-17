<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import ThenFollows from '$lib/text_component/then_follows.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<SectionTitle size="1xl">pascha nostrum</SectionTitle>
<SectionTitle size="1xl" fancy>Christ our Passover</SectionTitle>
<Line bold>Alleluia. Christ our Passover has been sacrificed for us; *</Line>
<Line bold indent>therefore let us keep the feast,</Line>
<Line bold>Not with the old leaven, the leaven of malice and evil, *</Line>
<Line bold indent>but with the unleavened bread of sincerity and truth. Alleluia.</Line>
<Line bold>Christ being raised from the dead will never die again; *</Line>
<Line bold indent>death no longer has dominion over him.</Line>
<Line bold>The death that he died, he died to sin, once for all; *</Line>
<Line bold indent>but the life he lives, he lives to God.</Line>
<Line bold>So also consider yourselves dead to sin, *</Line>
<Line bold indent>and alive to God in Jesus Christ our Lord. Alleluia.</Line>
<Line bold>Christ has been raised from the dead, *</Line>
<Line bold indent>the firstfruits of those who have fallen asleep.</Line>
<Line bold>For since by a man came death, *</Line>
<Line bold indent>by a man has come also the resurrection of the dead.</Line>
<Line bold>For as in Adam all die, *</Line>
<Line bold indent>so also in Christ shall all be made alive. Alleluia.</Line>
<Ref text="1 corinthians 5:7-8; romans 6:9-11; 1 corinthians 15:20-22" />
<ThenFollows />
<SectionTitle>the psalm or psalms appointed</SectionTitle>
<Rubric>At the end of the Psalms the Gloria Patri (Glory be...) is sung or said</Rubric>
<Gloria />
<PageNumber page={16} text="daily office" />
