<script>
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowContent from '$lib/page_helpers/show_content.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle>the sursum corda</SectionTitle>
<Rubric>The People remain standing. The Celebrant faces them and sings or says</Rubric>
<Versical>The Lord be with you.</Versical>
<Versical people>And with your spirit.</Versical>
<Versical celebrant>Lift up your hearts.</Versical>
<Versical people>We lift them up to the Lord.</Versical>
<Versical celebrant>Let us give thanks to the Lord our God.</Versical>
<Versical people>It is right to give him thanks and praise.</Versical>
<Rubric>The Celebrant continues</Rubric>
<TextBlock
	>It is right, our duty and our joy, always and everywhere to give thanks to you, Father Almighty,
	Creator of heaven and earth.</TextBlock
>
<Rubric>Here a Proper Preface (pages 152-158) is normally sung or said.</Rubric>
<ShowContent text="Show Proper Preface" getContent={() => 'Proper Preface goes here'} />

<TextBlock
	>Therefore we praise you, joining our voices with Angels and Archangels and with all the company
	of heaven, who for ever sing this hymn to proclaim the glory of your Name:</TextBlock
>
