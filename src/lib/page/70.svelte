<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
</script>

<Scripture
	text="Do not be anxious about anything, but in everything by prayer
and supplication with thanksgiving let your requests be made
known to God. And the peace of God, which surpasses all
understanding, will guard your hearts and your minds in
Christ Jesus."
	ref="philippians 4:6-7"
/>

<Rubric>A period of silence may follow.</Rubric>
<Rubric>Prayers may be offered for ourselves and others.</Rubric>

<SectionTitle size="2xl">the lord’s prayer</SectionTitle>
<SectionTitle size="2xl">the collect</SectionTitle>

<TextBlock amen>Blessed Savior, at this hour you hung upon the Cross, stretching
out your loving arms: Grant that all the peoples of the earth
may look to you and be saved; for your tender mercies’ sake.</TextBlock>

<PageNumber page={70} text="Daily Office" />
