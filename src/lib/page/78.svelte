<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ForQuietConfidence from '$lib/prayers/for_quiet_confidence.svelte';
	import GraceBeforeMeals from '$lib/prayers/grace_before_meals.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
</script>

<ForQuietConfidence />

<SectionTitle size="2xl">family responses before meals</SectionTitle>
<SectionTitle fancy latin_size>Traditional</SectionTitle>

<Line text="The eyes of all wait upon thee, O Lord;" />
<Line indent bold text="And thou givest them their meat in due season." />
<Line text="Thou openest thine hand;" />
<Line indent bold text="And fillest all things living with plenteousness." />
<Line
	text="Bless us, O Lord, and these thy gifts, which we are about to
    receive from thy bounty, through Christ our Lord."
	amen
/>
<GraceBeforeMeals />
<Rubric
	text="In Advent, using the Antiphons found in the Calendar of Holy Days and
Commemorations (page 712), families might consider singing the appropriate
verse of the hymn “O Come, O Come, Emmanuel” each night beginning on
December 16."
/>
<PageNumber page={74} text="Daily Office" />
