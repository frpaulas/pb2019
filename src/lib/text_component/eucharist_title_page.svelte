<script>
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';

	let { renewed_ancient = false, anglican_standard = false } = $props();
	let this_order = anglican_standard
		? 'Anglican Standard Text'
		: renewed_ancient
			? 'Renewed Ancient Text'
			: '';
</script>

<SectionTitle text="the order for the administration of" />
<SectionTitle text="the lord’s supper" />
<SectionTitle fancy text="or" />
<SectionTitle text="holy communion," />
<SectionTitle text="commonly called" />
<SectionTitle text="the holy eucharist" />
<SectionTitle fancy text={this_order} />
<Rubric text="A hymn, psalm, or anthem may be sung." />
<SectionTitle text="the acclamation" />
<Rubric
	text="The People standing, the Celebrant says this or a seasonal greeting (pages 145-146)"
/>
<Versical>Blessed be God: the Father, the Son, and the Holy Spirit.</Versical>
<Versical people>And blessed be his kingdom, now and for ever. Amen.</Versical>
<Rubric text="In the season of Lent" />
<Versical celebrant>Bless the Lord who forgives all our sins.</Versical>
<Versical people>His mercy endures for ever.</Versical>
<Rubric text="From Easter Day until the Eve of Pentecost" />
<Versical celebrant>Alleluia! Christ is risen!</Versical>
<Versical people>The Lord is risen indeed! Alleluia!</Versical>
