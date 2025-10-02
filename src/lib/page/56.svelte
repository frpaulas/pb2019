<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<SectionTitle text="at any time" />
<Scripture
	text="O worship the Lord in the beauty of holiness;
    let the whole earth stand in awe of him."
	ref="psalm 96:9"
/>
<Scripture
	text="I will thank the Lord for giving me counsel;
my heart also chastens me in the night season.
I have set the Lord always before me;
he is at my right hand, therefore I shall not fall."
	ref="psalm 16:8-9"
/>
<SectionTitle size="3xl" text="additional directions" />
<TextBlock
	text="The Confession and Apostles’ Creed may be omitted, provided each is
    said at least once during the course of the day."
/>
<TextBlock
	text="The Gloria Patri (Glory be...) in the opening versicles may be said in
    unison. The following form of the Gloria Patri may alternatively be used:"
/>
<Gloria />
<TextBlock
	text="The Officiant and People may join in saying “Alleluia” (except in Lent)
as an alternative to the versicles “Praise the Lord. The Lord’s Name be
praised.”"
/>
<TextBlock
	text="If an offering is to be received, it is appropriate to do so during the hymn
    or anthem following the Collects."
/>
<TextBlock
	text="A sermon may be preached after the lessons, after the hymn or anthem
    following the Collects, or after the conclusion of the Office."
/>
<PageNumber page={56} text="Daily office" />
