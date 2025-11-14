<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle text="the order for the administration of" />
<SectionTitle text="the lord’s supper" />
<SectionTitle fancy text="or" />
<SectionTitle text="holy communion," />
<SectionTitle text="commonly called" />
<SectionTitle text="the holy eucharist" />
<SectionTitle fancy text="Anglican Standard Text" />
<Rubric text="A hymn, psalm, or anthem may be sung." />
<SectionTitle text="the acclamation" />
<Rubric
	text="The People standing, the Celebrant says this or a seasonal greeting (pages 145-146)"
/>
<Versical text="Blessed be God: the Father, the Son, and the Holy Spirit." />
<Versical people text="And blessed be his kingdom, now and for ever. Amen." />
<Rubric text="In the season of Lent" />
<Versical celebrant text="Bless the Lord who forgives all our sins." />
<Versical people text="His mercy endures for ever." />
<Rubric text="From Easter Day until the Eve of Pentecost" />
<Versical celebrant text="Alleluia! Christ is risen!" />
<Versical people text="The Lord is risen indeed! Alleluia!" />

<PageNumber page={105} text="holy eucharist | anglican standard text" />
