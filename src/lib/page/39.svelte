<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<Rubric
	text="The Officiant may conclude with this, or one of the other concluding sentences from
    Morning and Evening Prayer."
/>
<Scripture
	text="The grace of our Lord Jesus Christ, and the love of God,
    and the fellowship of the Holy Spirit, be with us all evermore."
	amen
	ref="2 corinthians 13:14"
	t
/>
<SectionTitle size="3xl" text="additional directions" />
<TextBlock
	text="Other suitable selections from the Psalter include Psalms 19, 67, one or
    more sections of Psalm 119, or a selection from Psalms 120 through 133."
/>
<TextBlock
	text="Either version of the Lord’s Prayer may be ended with, “deliver us from
    evil. Amen.” omitting the concluding doxology."
/>
<PageNumber page={39} text="Midday prayer" />
