<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<Rubric>Or the Reader may say</Rubric>

<Versical text="Here ends the Reading." />
<Rubric>The following Canticles are normally sung or said after each of the lessons. The
 Officiant may also use a Canticle drawn from the Supplemental Canticles (pages
 79-88) or an appropriate song of praise.</Rubric>
<SectionTitle>magnificat</SectionTitle>
<SectionTitle fancy>The Song of Mary</SectionTitle>
<Line bold>My soul magnifies the Lord, *</Line>
<Line bold indent>and my spirit rejoices in God my Savior;</Line>
<Line bold indent>For he has regarded *</Line>
<Line bold>the lowliness of his handmaiden.</Line>
<Line bold indent>For behold, from now on, *</Line>
<Line bold>all generations will call me blessed;</Line>
<Line bold indent>For he that is mighty has magnified me, *</Line>
<Line bold>and holy is his Name.</Line>
<Line bold indent>And his mercy is on those who fear him, *</Line>
<Line bold>throughout all generations.</Line>
<Line bold indent>He has shown the strength of his arm; *</Line>
<Line bold>he has scattered the proud in the imagination of their hearts.</Line>
<Line bold indent>He has brought down the mighty from their thrones, *</Line>
<Line bold>and has exalted the humble and meek.</Line>
<Line bold indent>He has filled the hungry with good things, *</Line>
<Line bold>and the rich he has sent empty away.</Line>
<Line bold indent>He, remembering his mercy, has helped his servant Israel, *</Line>
<Line bold>as he promised to our fathers, Abraham and his seed for ever.</Line>
<Gloria />
<Ref text="luke 1:46-55" />
<PageNumber page={45} text="Daily Evening prayer" />
