<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PopResponse from '$lib/page_helpers/pop_response.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Silence from '$lib/page_helpers/silence.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<TextBlock>For all those who are in trouble, sorrow, need, sickness, or any
    other adversity [especially _____________].</TextBlock>
<PopResponse />
<TextBlock>For all those who have departed this life in the certain hope of
    the resurrection, [especially ______,] in thanksgiving let us pray.</TextBlock>
<PopResponse />
<Rubric>Additional petitions may be added. Thanksgivings may also be invited.</Rubric>
<Rubric>The Celebrant concludes with this or some other appropriate Collect.</Rubric>
<TextBlock>Heavenly Father, grant these our prayers for the sake of Jesus
Christ, our only Mediator and Advocate, who lives and reigns
with you in the unity of the Holy Spirit, one God, now and for
ever. **Amen.**</TextBlock>
<Rubric>The Celebrant may then say the Exhortation.</Rubric>
<SectionTitle>the confession and absolution of sin</SectionTitle>
<Rubric>The Deacon or other person appointed says the following</Rubric>
<Line text="Let us humbly confess our sins to Almighty God." />
<Silence />
<PageNumber page={129} text="holy eucharist | Renewed ancient text" />
