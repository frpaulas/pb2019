<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Line from '$lib/page_helpers/line.svelte';
</script>

<SectionTitle text="the lessons" />

<Rubric text="One or more Lessons, as appointed, are read, the Reader first saying" />
<Line text="A Reading from _____________." />
<Rubric text="A citation giving chapter and verse may be added." />
<Rubric text="After each lesson the Reader may say" />
<Versical text="The Word of the Lord." />
<Versical people text="Thanks be to God." />
<Rubric text="Or the Reader may say" />
<Versical text="Here ends the Reading." />
<Rubric
	text="The following Canticles are normally sung or said after each of the lessons. The Officiant may also use
    a Canticle drawn from the Supplemental Canticles (pages 79-88) or an appropriate song of praise."
/>
<SectionTitle text="te deum laudamus" />
<SectionTitle fancy text="We Praise You, O God" />
<Line bold text="We praise you, O God; we acclaim you as Lord; * " />
<Line indent bold text="all creation worships you, the Father everlasting. " />
<Line bold text="To you all angels, all the powers of heaven, * " />
<Line indent bold text="the cherubim and seraphim, sing in endless praise: " />
<Line bold text="Holy, Holy, Holy, Lord God of power and might, * " />
<Line indent bold text="heaven and earth are full of your glory. " />
<Line bold text="The glorious company of apostles praise you. * " />
<Line indent bold text="The noble fellowship of prophets praise you." />
<Line bold text="The white-robed army of martyrs praise you. * " />
<Line indent bold text="Throughout the world the holy Church acclaims you: " />
<Line bold text="Father, of majesty unbounded, " />
<Line bold text="your true and only Son, worthy of all praise, * " />
<Line indent bold text="and the Holy Spirit, advocate and guide." />
<PageNumber page={17} text="daily morning prayer" />
