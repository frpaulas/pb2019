<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Antiphon from '$lib/page_helpers/antiphon.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
</script>

<Rubric text="Then follows the Venite. Alternatively, the Jubilate may be used." />
<Rubric
	text="One of these antiphons, or one from the seasonal antiphons provided at the end of
the Office (pages 29-30), may be sung or said before and after the Invitatory Psalm."
/>
<Antiphon call="The earth is the Lord’s for he made it: *" response="O come, let us adore him." />
<OrThis />
<Antiphon
	call="Worship the Lord in the beauty of holiness: *"
	response="O come, let us adore him."
/>
<OrThis />
<Antiphon call="The mercy of the Lord is everlasting: *" response="O come, let us adore him." />
<SectionTitle size="1xl" text="venite" />
<SectionTitle size="1xl" fancy text="O Come" />
<Line text="O come, let us sing unto the Lord; * " bold />
<Line indent text="let us heartily rejoice in the strength of our salvation. " bold />
<Line text="Let us come before his presence with thanksgiving * " bold />
<Line indent text="and show ourselves glad in him with psalms. " bold />
<Line text="For the Lord is a great God * " bold />
<Line indent text="and a great King above all gods. " bold />
<Line text="In his hand are all the depths of the earth, * " bold />
<Line indent text="and the heights of the hills are his also. " bold />
<Line text="The sea is his, for he made it, * " bold />
<Line indent text="and his hands prepared the dry land. " bold />
<Line text="O come, let us worship and fall down, * " bold />
<Line indent text="and kneel before the Lord our Maker. " bold />
<Line text="For he is our God, * " bold />
<Line indent text="and we are the people of his pasture," />
<Line indent text="and the sheep of his hand." bold />
<PageNumber page={14} text="daily office" />
