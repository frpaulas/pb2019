<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
	import PhosHilaron from '$lib/canticle/phos_hilaron.svelte';
</script>

<Rubric text="The following or some other suitable hymn or Psalm may be sung or said." />
<PhosHilaron />
<Rubric text="Then follows" />
<SectionTitle text="the psalm or psalms appointed" />
<Rubric text="At the end of the Psalms the Gloria Patri (Glory be...) is sung or said" />
<Gloria />
<SectionTitle text="the lessons" />
<Rubric text="One or more Lessons, as appointed, are read, the Reader first saying" />
<Versical text="A Reading from _____________." />
<Rubric text="A citation giving chapter and verse may be added." />
<Rubric text="After each Lesson the Reader may say" />
<Versical text="The Word of the Lord." />
<Versical people text="Thanks be to God." />
<PageNumber page={44} text="Daily office" />
