<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Line from '$lib/page_helpers/line.svelte';
</script>

<SectionTitle>the lessons</SectionTitle>

<Rubric>One or more Lessons, as appointed, are read, the Reader first saying</Rubric>
<Line>A Reading from _____________.</Line>
<Rubric>A citation giving chapter and verse may be added.</Rubric>
<Rubric>After each lesson the Reader may say</Rubric>
<Versical>The Word of the Lord.</Versical>
<Versical people>Thanks be to God.</Versical>
<Rubric>Or the Reader may say</Rubric>
<Versical>Here ends the Reading.</Versical>
<Rubric
	>The following Canticles are normally sung or said after each of the lessons. The Officiant may
	also use a Canticle drawn from the Supplemental Canticles (pages 79-88) or an appropriate song of
	praise.</Rubric
>
<SectionTitle>te deum laudamus</SectionTitle>
<SectionTitle fancy>We Praise You, O God</SectionTitle>
<Line bold>We praise you, O God; we acclaim you as Lord; *</Line>
<Line indent bold>all creation worships you, the Father everlasting.</Line>
<Line bold>To you all angels, all the powers of heaven, *</Line>
<Line indent bold>the cherubim and seraphim, sing in endless praise:</Line>
<Line bold>Holy, Holy, Holy, Lord God of power and might, *</Line>
<Line indent bold>heaven and earth are full of your glory.</Line>
<Line bold>The glorious company of apostles praise you. *</Line>
<Line indent bold>The noble fellowship of prophets praise you.</Line>
<Line bold>The white-robed army of martyrs praise you. *</Line>
<Line indent bold>Throughout the world the holy Church acclaims you:</Line>
<Line bold>Father, of majesty unbounded,</Line>
<Line bold>your true and only Son, worthy of all praise, *</Line>
<Line indent bold>and the Holy Spirit, advocate and guide.</Line>
<PageNumber page={17} text="daily morning prayer" />
