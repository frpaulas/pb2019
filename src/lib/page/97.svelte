<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import GraceOfOurLord from '$lib/text_component/grace_of_our_lord.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<Line>O Lord, show us your love and mercy;</Line>
<Line indent bold>For we have put our trust in you.</Line>
<Rubric>The Officiant says the following</Rubric>
Almighty God, you have promised to hear the petitions of those who ask in the Name of your Son: Mercifully
incline your ear to us who have made our prayers and supplications to you; and grant that what we have
asked faithfully, according to your will, we may obtain effectually, for the relief of our necessities
and the setting forth of your glory; through Jesus Christ our Lord. Amen.
<Rubric>The Officiant may add other prayers, and may end the Litany, saying</Rubric>
<GraceOfOurLord />
<SectionTitle>the supplication</SectionTitle>
<Rubric>For use in the Litany in place of the Versicle and Collect which follows the Lord’s
 Prayer; or at the end of Morning or Evening Prayer; or as a separate devotion.
 The Supplication is especially appropriate in times of war, or of great anxiety, or
 of disaster.</Rubric>
<Line>O Lord, arise and help us;</Line>
<Line indent bold>And deliver us for your Name’s sake.</Line>
<TextBlock>O God, we have heard with our ears, and our forebears have
 declared to us, the noble works that you did in their days, and in
 the time before them.</TextBlock>
<Line>O Lord, arise and help us;</Line>
<Line indent bold>And deliver us for your Name’s sake.</Line>
<Gloria />

<PageNumber page={97} text="the great litany" />
