<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ResurrectionHopeEp from '$lib/canticle/resurrection_hope_ep.svelte';
	import PeaceEp from '$lib/canticle/peace_ep.svelte';
	import AgainstPerilsEp from '$lib/canticle/against_perils_ep.svelte';
</script>

<Rubric
	text="The Officiant then prays one or more of the following Collects, always beginning
with the Collect of the Day (usually the Collect of the Sunday or Principal Feast
and of any of the weekdays following, or of the Holy Day being observed) found
on pages 598-640. It is traditional to pray the Collects for Peace and Aid against
Perils daily. Alternatively, one may pray the Collects on a weekly rotation, using
the suggestions in italics."
/>
<SectionTitle>the collect of the day</SectionTitle>
<SectionTitle>From the Collects of the Christian Year</SectionTitle>
<ResurrectionHopeEp />
<PeaceEp />
<AgainstPerilsEp />
<PageNumber page={49} text="Daily Evening prayer" />
