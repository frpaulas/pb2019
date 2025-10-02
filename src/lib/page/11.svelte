<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle size="3xl" text="daily morning prayer" />
<Rubric
	text="The Officiant may begin Morning Prayer by reading an opening sentence of
Scripture. One of the following, or a sentence from among those provided at the
end of the Office (pages 27-29), is customary."
/>
<Scripture
	text="Grace to you and peace from God our Father and the Lord
    Jesus Christ."
	ref="philippians 1:2"
/>
<OrThis />
<Scripture
	text="I was glad when they said unto me, “We will go into the house
    of the Lord.”"
	ref="psalm 122:1"
/>
<OrThis />
<Scripture
	text="Let the words of my mouth and the meditation of my heart
be always acceptable in your sight, O Lord, my rock and my
redeemer."
	ref="psalm 19:14"
/>
<SectionTitle size="1xl" text="confession of sin" />
<Rubric text="The Officiant says to the People" />
<TextBlock
	text="Dearly beloved, the Scriptures teach us to acknowledge our
many sins and offenses, not concealing them from our heavenly
Father, but confessing them with humble and obedient hearts
that we may obtain forgiveness by his infinite goodness and"
/>
<PageNumber text="daily morning prayer" page={11} />
