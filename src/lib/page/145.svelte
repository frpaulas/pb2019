<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle text="supplemental" />
<SectionTitle text="eucharistic texts" />
<SectionTitle text="seasonal greetings" />
<Rubric
	text="The opening Acclamation may be replaced by a greeting appropriate to the season
    or the occasion, such as the following"
/>
<SectionTitle text="for advent" />
<br />
<Versical celebrant text="Surely the Lord is coming soon." />
<Versical people text="Amen. Come Lord Jesus!" />
<Ref text="revelation 22:20" />
<br />
<SectionTitle text="for christmastide ~_and_~ the feast of the presentation of christ" />
<br />
<Versical celebrant text="For unto us a child is born," />
<Versical people text="Unto us a son is given." />
<Ref text="isaiah 9:6" t />
<br />
<SectionTitle text="from the feast of the epiphany ~_to_~ the end of the epiphany season" />
<br />
<Versical celebrant text="I will make you as a light for the nations," />
<Versical people text="That my salvation may reach to the end of the earth." />
<Ref text="isaiah 49:6" />

<PageNumber page={145} text="additional directions" />
