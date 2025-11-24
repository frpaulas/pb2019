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

<SectionTitle>the order for the administration of</SectionTitle>
<SectionTitle>the lord's supper</SectionTitle>
<SectionTitle fancy>or</SectionTitle>
<SectionTitle>holy communion,</SectionTitle>
<SectionTitle>commonly called</SectionTitle>
<SectionTitle>the holy eucharist</SectionTitle>
<SectionTitle fancy>{this_order}</SectionTitle>
<Rubric>A hymn, psalm, or anthem may be sung.</Rubric>
<SectionTitle>the acclamation</SectionTitle>
<Rubric>The People standing, the Celebrant says this or a seasonal greeting (pages 145-146)</Rubric>
<Versical>Blessed be God: the Father, the Son, and the Holy Spirit.</Versical>
<Versical who="people">And blessed be his kingdom, now and for ever. Amen.</Versical>
<Rubric>In the season of Lent</Rubric>
<Versical who="celebrant">Bless the Lord who forgives all our sins.</Versical>
<Versical who="people">His mercy endures for ever.</Versical>
<Rubric>From Easter Day until the Eve of Pentecost</Rubric>
<Versical who="celebrant">Alleluia! Christ is risen!</Versical>
<Versical who="people">The Lord is risen indeed! Alleluia!</Versical>
