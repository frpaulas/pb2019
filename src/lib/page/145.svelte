<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle>supplemental</SectionTitle>
<SectionTitle>eucharistic texts</SectionTitle>
<SectionTitle>seasonal greetings</SectionTitle>
<Rubric
	text="The opening Acclamation may be replaced by a greeting appropriate to the season
    or the occasion, such as the following"
/>
<SectionTitle>for advent</SectionTitle>
<br />
<Versical celebrant>Surely the Lord is coming soon.</Versical>
<Versical people>Amen. Come Lord Jesus!</Versical>
<Ref text="revelation 22:20" />
<br />
<SectionTitle>for christmastide ~_and_~ the feast of the presentation of christ</SectionTitle>
<br />
<Versical celebrant>For unto us a child is born,</Versical>
<Versical people>Unto us a son is given.</Versical>
<Ref text="isaiah 9:6" t />
<br />
<SectionTitle>from the feast of the epiphany ~_to_~ the end of the epiphany season</SectionTitle>
<br />
<Versical celebrant>I will make you as a light for the nations,</Versical>
<Versical people>That my salvation may reach to the end of the earth.</Versical>
<Ref text="isaiah 49:6" />

<PageNumber page={145} text="additional directions" />
