<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<Scripture
	text="Jesus spoke to them, saying, “I am the light of the world.
Whoever follows me will not walk in darkness, but will have the
light of life.”"
	ref="john 8:12"
/>
<OrThis />
<Scripture
	text="Jesus said, “Behold, I stand at the door and knock. If anyone
hears my voice and opens the door, I will come in to him and
eat with him, and he with me.”"
	ref="revelation 3:20"
/>
<Rubric text="A period of silence may follow." />
<Rubric text="A hymn or canticle may be used; the Apostles’ Creed (page 75) may be said." />
<Rubric text="Prayers may be offered for ourselves and others." />
<SectionTitle size="2xl" text="the lord’s prayer" />
<SectionTitle size="2xl" text="the collect" />

<TextBlock
	text="Lord Jesus, stay with us, for evening is at hand and the day
is past; be our companion in the way, kindle our hearts, and
awaken hope, that we may know you as you are revealed in
Scripture and the breaking of bread. Grant this for the sake of
your love."
	amen
/>

<PageNumber page={72} text="Daily Office" />
