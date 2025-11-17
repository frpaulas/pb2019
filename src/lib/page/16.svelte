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
<Line bold text="Alleluia. Christ our Passover has been sacrificed for us; *" />
<Line bold indent text="therefore let us keep the feast," />
<Line bold text="Not with the old leaven, the leaven of malice and evil, *" />
<Line bold indent text="but with the unleavened bread of sincerity and truth. Alleluia." />
<Line bold text="Christ being raised from the dead will never die again; *" />
<Line bold indent text="death no longer has dominion over him." />
<Line bold text="The death that he died, he died to sin, once for all; *" />
<Line bold indent text="but the life he lives, he lives to God." />
<Line bold text="So also consider yourselves dead to sin, *" />
<Line bold indent text="and alive to God in Jesus Christ our Lord. Alleluia." />
<Line bold text="Christ has been raised from the dead, *" />
<Line bold indent text="the firstfruits of those who have fallen asleep." />
<Line bold text="For since by a man came death, *" />
<Line bold indent text="by a man has come also the resurrection of the dead." />
<Line bold text="For as in Adam all die, *" />
<Line bold indent text="so also in Christ shall all be made alive. Alleluia." />
<Ref text="1 corinthians 5:7-8; romans 6:9-11; 1 corinthians 15:20-22" />
<ThenFollows />
<SectionTitle>the psalm or psalms appointed</SectionTitle>
<Rubric>At the end of the Psalms the Gloria Patri (Glory be...) is sung or said</Rubric>
<Gloria />
<PageNumber page={16} text="daily office" />
