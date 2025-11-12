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
<Rubric text="The Officiant concludes with the following" />
<TextBlock
	text="The almighty and merciful Lord, Father, Son, and Holy Spirit,
    bless us and keep us, this night and evermore."
	amen
/>
<SectionTitle size="3xl" text="additional directions" />
<TextBlock
	text="A Bishop or Priest, if present, may pronounce absolution after the
    confession."
/>
<TextBlock
	text="For those saying Compline every day, particularly in families or other
communities, additional short Scriptural readings may be desired. Some
appropriate readings include:"
/>
<Line indent text="isaiah 26:3-4" />
<Line indent text="isaiah 30:15" />
<Line indent text="matthew 6:31-34" />
<Line indent text="2 corinthians 4:6" />
<Line indent text="1 thessalonians 5:9-10" />
<Line indent text="1 thessalonians 5:23" />
<Line indent text="ephesians 4:26-27" />
<TextBlock
	text="Either version of the Lord’s Prayer may be ended with, “deliver us from
    evil. Amen.” omitting the concluding doxology."
/>

<PageNumber page={65} text="Compline" />
