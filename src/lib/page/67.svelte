<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import ShowPsalmVerses from '$lib/page_helpers/show_psalm_verses.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
	import OpenMyLips from '$lib/text_component/open_my_lips.svelte';
</script>

<SectionTitle size="4xl">family prayer</SectionTitle>
<SectionTitle size="3xl">in the morning</SectionTitle>
<Rubric>The following or some other verse of Scripture is said</Rubric>

<ShowPsalmVerses ps={51} verses={[15]} />

<SectionTitle size="2xl">psalm 51:10-12</SectionTitle>
<ShowPsalm ps={51} from={10} to={12} bold />
<Gloria />
<Rubric>Alternatively, Psalm 5:1-3 may be used.</Rubric>
<SectionTitle size="2xl">a reading from holy scripture</SectionTitle>
<TextBlock>Blessed be the God and Father of our Lord
    Jesus Christ! According to his great mercy, he has caused us to be born again</TextBlock>
<PageNumber page={67} text="Family Prayer | in the morning" />
