<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowContent from '$lib/page_helpers/show_content.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle text="the sursum corda" />
<Rubric text="The People remain standing. The Celebrant faces them and sings or says" />
<Versical text="The Lord be with you." />
<Versical people text="And with your spirit." />
<Versical celebrant text="Lift up your hearts." />
<Versical people text="We lift them up to the Lord." />
<Versical celebrant text="Let us give thanks to the Lord our God." />
<Versical people text="It is right to give him thanks and praise." />
<Rubric text="The Celebrant continues" />
<TextBlock
	text="It is right, our duty and our joy, always and everywhere to give
    thanks to you, Father Almighty, Creator of heaven and earth."
/>
<Rubric text="Here a Proper Preface (pages 152-158) is normally sung or said." />
<ShowContent text="Show Proper Preface" getContent={() => 'Proper Preface goes here'} />

<TextBlock
	text="Therefore we praise you, joining our voices with Angels and
Archangels and with all the company of heaven, who for ever
sing this hymn to proclaim the glory of your Name:"
/>
<SectionTitle text="the sanctus" />
<Rubric text="Celebrant and People" />
<Line bold text="Holy, Holy, Holy, Lord God of power and might, heaven and" />
<Line indent bold text="earth are full of your glory." />
<Line indent bold text="Hosanna in the highest." />
<Line bold text="Blessed is he who comes in the Name of the Lord." />
<Line indent bold text="Hosanna in the highest." />
<SectionTitle text="the prayer of consecration" />
<Rubric text="The People kneel or stand. The Celebrant continues" />

<PageNumber page={115} text="holy eucharist | anglican standard text" />
