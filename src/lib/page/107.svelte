<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowContent from '$lib/page_helpers/show_content.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import GloriaInExcelsis from '$lib/text_component/gloria_in_excelsis.svelte';
</script>

<SectionTitle text="The Gloria in Excelsis" />
<Rubric
	text="The Gloria or some other song of praise may be sung or said, all standing. It
is appropriate to omit the song of praise during penitential seasons and days
appointed for fasting."
/>
<GloriaInExcelsis />
<SectionTitle text="the collect of the day" />
<Rubric text="The Celebrant says to the People" />
<Versical text="The Lord be with you." />
<Versical people text="And with your spirit." />
<Versical officiant text="Let us pray." />
<Rubric text="The Celebrant prays the Collect." />
<ShowContent text="Show Collect" getContent={() => 'Collect content goes here'} />
<Versical people text="Amen." />

<PageNumber page={107} text="holy eucharist | anglican standard text" />
