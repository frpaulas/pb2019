<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle size="4xl" text="daily evening prayer" />
<Rubric
	text="The Officiant may begin Evening Prayer by reading an opening sentence of
Scripture. One of the following, or a sentence from among those provided at the
end of the Office (pages 54-56), is customary."
/>
<Scripture
	text="Jesus spoke to them, saying, “I am the light of the world.
Whoever follows me will not walk in darkness, but will have
the light of life.”"
	ref="john 8:12"
/>
<OrThis />
<Scripture
	text="Lord, I have loved the habitation of your house and the place
    where your honor dwells."
	ref="psalm 26:8"
/>
<OrThis />
<Scripture
	text="Let my prayer be set forth in your sight as incense, and let the
    lifting up of my hands be an evening sacrifice."
	ref="psalm 141:2"
/>
<SectionTitle text="confession of sin" />
<Rubric text="The Officiant says to the People" />
<TextBlock
	text="Dearly beloved, the Scriptures teach us to acknowledge our
many sins and offenses, not concealing them from our heavenly
Father, but confessing them with humble and obedient hearts
that we may obtain forgiveness by his infinite goodness and"
/>
<PageNumber page={41} text="Daily Evening prayer" />
