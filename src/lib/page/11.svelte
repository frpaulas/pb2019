<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle size="3xl">daily morning prayer</SectionTitle>
<Rubric
	>The Officiant may begin Morning Prayer by reading an opening sentence of Scripture. One of the
	following, or a sentence from among those provided at the end of the Office (pages 27-29), is
	customary.</Rubric
>
>
<Scripture ref="philippians 1:2"
	>Grace to you and peace from God our Father and the Lord Jesus Christ."</Scripture
>
<OrThis />
<Scripture ref="psalm 122:1"
	>I was glad when they said unto me, “We will go into the house of the Lord.”</Scripture
>
/>
<OrThis />
<Scripture ref="psalm 19:14"
	>Let the words of my mouth and the meditation of my heart be always acceptable in your sight, O
	Lord, my rock and my redeemer.</Scripture
>
<SectionTitle size="1xl">confession of sin</SectionTitle>
<Rubric>The Officiant says to the People</Rubric>
<TextBlock
	>Dearly beloved, the Scriptures teach us to acknowledge our many sins and offenses, not concealing
	them from our heavenly Father, but confessing them with humble and obedient hearts that we may
	obtain forgiveness by his infinite goodness and</TextBlock
>
<PageNumber text="daily morning prayer" page={11} />
