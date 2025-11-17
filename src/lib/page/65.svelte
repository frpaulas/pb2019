<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import GuideUs from '$lib/text_component/guide_us.svelte';
	import LetUsBless from '$lib/text_component/let_us_bless.svelte';
</script>

<GuideUs />
<LetUsBless />
<Rubric>The Officiant concludes with the following</Rubric>
<TextBlock amen>The almighty and merciful Lord, Father, Son, and Holy Spirit,
    bless us and keep us, this night and evermore.</TextBlock>
<SectionTitle size="3xl">additional directions</SectionTitle>
<TextBlock>A Bishop or Priest, if present, may pronounce absolution after the
    confession.</TextBlock>
<TextBlock>For those saying Compline every day, particularly in families or other
communities, additional short Scriptural readings may be desired. Some
appropriate readings include:</TextBlock>
<Line indent>isaiah 26:3-4</Line>
<Line indent>isaiah 30:15</Line>
<Line indent>matthew 6:31-34</Line>
<Line indent>2 corinthians 4:6</Line>
<Line indent>1 thessalonians 5:9-10</Line>
<Line indent>1 thessalonians 5:23</Line>
<Line indent>ephesians 4:26-27</Line>
<TextBlock>Either version of the Lord’s Prayer may be ended with, “deliver us from
    evil. Amen.” omitting the concluding doxology.</TextBlock>

<PageNumber page={65} text="Compline" />
