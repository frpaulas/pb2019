<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import Line from '$lib/page_helpers/line.svelte';
</script>

<Scripture
	text="O send out your light and your truth, that they may lead me, and
bring me to your holy hill, and to your dwelling."
	ref="psalm 43:3"
/>
<Scripture
	text="Thus says the One who is high and lifted up, who inhabits
eternity, whose name is Holy: “I dwell in the high and holy
place, and also with him who is of a contrite and lowly spirit,
to revive the spirit of the lowly, and to revive the heart of
the contrite.”"
	ref="isaiah 57:15"
/>
<Scripture
	text="The hour is coming, and is now here, when the true worshipers
will worship the Father in spirit and truth, for the Father is
seeking such people to worship him."
	ref="john 4:23"
/>
<SectionTitle size="3xl">seasonal antiphons</SectionTitle>
<SectionTitle>advent</SectionTitle>
Our King and Savior now draws near: * O come, let us adore him.
<SectionTitle>christmas</SectionTitle>
<Line text="Alleluia, to us a child is born: *" />
<Line indent bold text="O come, let us adore him. Alleluia." />
<SectionTitle>epiphany, and the feast of the transfiguration</SectionTitle>
<Line text="The Lord has shown forth his glory: *" />
<Line indent bold text="O come, let us adore him." />
<SectionTitle fancyAnd>presentation and annunciation</SectionTitle>
<Line text="The Word was made flesh and dwelt among us: *" />
<Line indent bold text="O come, let us adore him." />
<PageNumber page={29} text="daily morning prayer" />
