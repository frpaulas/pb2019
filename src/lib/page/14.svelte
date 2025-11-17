<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Antiphon from '$lib/page_helpers/antiphon.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
</script>

<Rubric>Then follows the Venite. Alternatively, the Jubilate may be used.</Rubric>
<Rubric
	>One of these antiphons, or one from the seasonal antiphons provided at the end of the Office
	(pages 29-30), may be sung or said before and after the Invitatory Psalm.</Rubric
>
<Antiphon call="The earth is the Lord’s for he made it: *" response="O come, let us adore him." />
<OrThis />
<Antiphon
	call="Worship the Lord in the beauty of holiness: *"
	response="O come, let us adore him."
/>
<OrThis />
<Antiphon call="The mercy of the Lord is everlasting: *" response="O come, let us adore him." />
<SectionTitle size="1xl">venite</SectionTitle>
<SectionTitle size="1xl" fancy>O Come</SectionTitle>
<Line bold>O come, let us sing unto the Lord; *</Line>
<Line indent bold>let us heartily rejoice in the strength of our salvation.</Line>
<Line bold>Let us come before his presence with thanksgiving *</Line>
<Line indent bold>and show ourselves glad in him with psalms.</Line>
<Line bold>For the Lord is a great God *</Line>
<Line indent bold>and a great King above all gods.</Line>
<Line bold>In his hand are all the depths of the earth, *</Line>
<Line indent bold>and the heights of the hills are his also.</Line>
<Line bold>The sea is his, for he made it, *</Line>
<Line indent bold>and his hands prepared the dry land.</Line>
<Line bold>O come, let us worship and fall down, *</Line>
<Line indent bold>and kneel before the Lord our Maker.</Line>
<Line bold>For he is our God, *</Line>
<Line indent>and we are the people of his pasture,</Line>
<Line indent bold>and the sheep of his hand.</Line>
<PageNumber page={14} text="daily office" />
