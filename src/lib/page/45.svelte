<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<Rubric text="Or the Reader may say" />

<Versical text="Here ends the Reading." />
<Rubric
	text="The following Canticles are normally sung or said after each of the lessons. The
 Officiant may also use a Canticle drawn from the Supplemental Canticles (pages
 79-88) or an appropriate song of praise."
/>
<SectionTitle text="magnificat" />
<SectionTitle fancy text="The Song of Mary" />
<Line bold text="My soul magnifies the Lord, *" />
<Line bold indent text="and my spirit rejoices in God my Savior;" />
<Line bold indent text="For he has regarded *" />
<Line bold text="the lowliness of his handmaiden." />
<Line bold indent text="For behold, from now on, *" />
<Line bold text="all generations will call me blessed;" />
<Line bold indent text="For he that is mighty has magnified me, *" />
<Line bold text="and holy is his Name." />
<Line bold indent text="And his mercy is on those who fear him, *" />
<Line bold text="throughout all generations." />
<Line bold indent text="He has shown the strength of his arm; *" />
<Line bold text="he has scattered the proud in the imagination of their hearts." />
<Line bold indent text="He has brought down the mighty from their thrones, *" />
<Line bold text="and has exalted the humble and meek." />
<Line bold indent text="He has filled the hungry with good things, *" />
<Line bold text="and the rich he has sent empty away." />
<Line bold indent text="He, remembering his mercy, has helped his servant Israel, *" />
<Line bold text="as he promised to our fathers, Abraham and his seed for ever." />
<Gloria />
<Ref text="luke 1:46-55" />
<PageNumber page={45} text="Daily Evening prayer" />
