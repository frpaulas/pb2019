<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ThanksBe from '$lib/page_helpers/thanks_be.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle text="the dismissal" />
<Rubric text="The Deacon, or the Priest, may dismiss the People with these words" />
<Versical text="Let us go forth in the Name of Christ." />
<ThanksBe />
<OrThis />
<Versical deacon text="Go in peace to love and serve the Lord." />
<ThanksBe />
<OrThis />
<Versical
	deacon
	text="Let us go forth into the world, rejoicing in the power of the Holy Spirit."
/>
<ThanksBe />
<OrThis />
<Versical deacon text="Let us bless the Lord." />
<ThanksBe />
<Rubric
	text="From the Easter Vigil through the Day of Pentecost, “Alleluia, alleluia” is added to
any of the dismissals. It may be added at other times, except during Lent and on
other penitential occasions."
/>
<Rubric text="The People respond" />
<ThanksBe easter no_speaker />
<PageNumber page={122} text="the holy eucharist" />
