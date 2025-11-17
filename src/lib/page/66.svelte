<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import NuncDimittis from '$lib/canticle/nunc_dimittis.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import GuideUs from '$lib/text_component/guide_us.svelte';
	import Line from '$lib/page_helpers/line.svelte';
</script>

<SectionTitle size="3xl">concerning family prayer</SectionTitle>
<TextBlock>These devotions follow the basic structure of the Daily Office
of the Church and are particularly appropriate for families with
young children.</TextBlock>

<TextBlock>The Reading and the Collect may be read by one person, and the
other parts said in unison, or in some other convenient manner.</TextBlock>
<TextBlock>Appropriate Opening Sentences, Psalms, Readings, and Collects
are provided in each service. When desired, however, the Collect
of the Day, or any of the Collects appointed in the Daily Office,
may be used instead. The Opening Sentences may be replaced by
those appointed for various seasons in the liturgies for Morning
and Evening Prayer.</TextBlock>
<Line indent>The Psalms and Readings may be replaced by those appointed in:</Line>
<Line indent>the Sunday, Holy Days and Commemoration Lectionary; or</Line>
<Line indent>the Daily Office Lectionary; or</Line>
<Line indent>some other manual of devotion which provides daily selections for the Church Year.</Line>

<TextBlock>A concluding sentence from Morning or Evening Prayer may be
    used at the end of any of these devotions.</TextBlock>

<PageNumber page={66} text="Daily Office" />
