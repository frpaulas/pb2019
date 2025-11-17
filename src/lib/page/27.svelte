<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
</script>

<SectionTitle size="3xl">opening sentences of scripture</SectionTitle>
<SectionTitle>advent</SectionTitle>
<Scripture
	text="In the wilderness prepare the way of the Lord; make straight in
    the desert a highway for our God."
	ref="isaiah 40:3"
/>
<SectionTitle>christmas</SectionTitle>
<Scripture
	text="Fear not, for behold, I bring you good news of great joy that will
be for all the people. For unto you is born this day in the city of
David a Savior, who is Christ the Lord."
	ref="luke 2:10-11"
/>
<SectionTitle>epiphany</SectionTitle>
<Scripture
	text="From the rising of the sun to its setting my name will be great
among the nations, and in every place incense will be offered to
my name, and a pure offering. For my name will be great among
the nations, says the Lord of hosts."
	ref="malachi 1:11"
/>
<SectionTitle fancyAnd>lent and other penitential occasions</SectionTitle>
<Scripture text="Repent, for the kingdom of heaven is at hand." ref="matthew 3:2" />
<Line indent text="Turn your face from my sins," />
<Line indent text="and blot out all my misdeeds." />
<Ref text="psalm 51:9" />
<Scripture
	text="If anyone would come after me, let him deny himself and take
    up his cross and follow me."
	ref="mark 8:34"
/>
<SectionTitle>holy week</SectionTitle>
<Scripture
	text="Is it nothing to you, all you who pass by? Look and see
if there is any sorrow like my sorrow, which was brought
upon me, which the Lord inflicted on the day of his
fierce anger."
	ref="lamentations 1:12"
/>
<PageNumber page={27} text="daily morning prayer" />
