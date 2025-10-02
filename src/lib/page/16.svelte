<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import ThenFollows from '$lib/text_component/then_follows.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<SectionTitle size="1xl" text="pascha nostrum" />
<SectionTitle size="1xl" fancy text="Christ our Passover" />
<Line bold indent text="Alleluia. Christ our Passover has been sacrificed for us; *" />
<Line bold text="therefore let us keep the feast," />
<Line bold indent text="Not with the old leaven, the leaven of malice and evil, *" />
<Line bold text="but with the unleavened bread of sincerity and truth. Alleluia." />
<Line bold indent text="Christ being raised from the dead will never die again; *" />
<Line bold text="death no longer has dominion over him." />
<Line bold indent text="The death that he died, he died to sin, once for all; *" />
<Line bold text="but the life he lives, he lives to God." />
<Line bold indent text="So also consider yourselves dead to sin, *" />
<Line bold text="and alive to God in Jesus Christ our Lord. Alleluia." />
<Line bold indent text="Christ has been raised from the dead, *" />
<Line bold text="the firstfruits of those who have fallen asleep." />
<Line bold indent text="For since by a man came death, *" />
<Line bold text="by a man has come also the resurrection of the dead." />
<Line bold indent text="For as in Adam all die, *" />
<Line bold text="so also in Christ shall all be made alive. Alleluia." />
<Ref text="1 corinthians 5:7-8; romans 6:9-11; 1 corinthians 15:20-22" />
<ThenFollows />
<SectionTitle text="the psalm or psalms appointed" />
<Rubric text="At the end of the Psalms the Gloria Patri (Glory be...) is sung or said" />
<Gloria />
<PageNumber page={16} text="daily office" />
