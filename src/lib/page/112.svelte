<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PopResponse from '$lib/page_helpers/pop_response.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Silence from '$lib/page_helpers/silence.svelte';
</script>

<PopResponse />
<Rubric>Additional prayers may be added.</Rubric>
<Rubric>The Celebrant concludes with this or some other appropriate Collect.</Rubric>
<TextBlock>Heavenly Father, grant these our prayers for the sake of Jesus
Christ, our only Mediator and Advocate, who lives and reigns
with you in the unity of the Holy Spirit, one God, now and for
ever. **Amen.**</TextBlock>
<Rubric>The Celebrant may then say the Exhortation.</Rubric>
<SectionTitle>the confession and absolution of sin</SectionTitle>
<Rubric>The Deacon or other person appointed says the following</Rubric>
<TextBlock>All who truly and earnestly repent of your sins, and seek to live
in love and charity with your neighbors, and intend to lead the
new life, following the commandments of God, and walking
in his holy ways: draw near with faith and make your humble
confession to Almighty God.</TextBlock>
<Rubric>or</Rubric>
<Line>Let us humbly confess our sins to Almighty God.</Line>
<Silence />
<Rubric>The Deacon and People kneel as able and pray</Rubric>
<Line bold>Almighty God, Father of our Lord Jesus Christ,</Line>
<Line indent bold>maker and judge of us all:</Line>
<Line bold>We acknowledge and lament our many sins and offenses,</Line>
<Line indent bold>which we have committed by thought, word, and deed</Line>
<PageNumber page={112} text="the holy eucharist" />
