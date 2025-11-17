<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Psalm from '$lib/page_helpers/psalm.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<SectionTitle size="3xl">midday prayer</SectionTitle>
<Versical officiant>O God, make speed to save us;</Versical>
<Versical people>O Lord, make haste to help us.</Versical>
<Gloria versical />
<Rubric add_on=" Alleluia.">Except in Lent, add</Rubric>
<Rubric>A suitable hymn may be sung.</Rubric>
<Rubric>One or more of the following, or some other suitable Psalm, is sung or said.</Rubric>
<SectionTitle>psalm 119:105-112</SectionTitle>
<SectionTitle fancy>Lucerna pedibus meis</SectionTitle>
<Psalm vs="105" ln1="Your word is a lantern to my feet" ln2="and a light upon my path." />

<Psalm
	vs="106"
	ln1="I have sworn and am steadfastly purposed"
	ln2="to keep your righteous judgments."
/>
<Psalm
	vs="107"
	ln1="I am troubled above measure;"
	ln2="revive me, O Lord, according to your word."
/>
<PageNumber page={33} text="Midday prayer" />
