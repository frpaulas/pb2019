<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PopResponse from '$lib/page_helpers/pop_response.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Silence from '$lib/page_helpers/silence.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<PopResponse />
<Rubric text="Additional prayers may be added." />
<Rubric text="The Celebrant concludes with this or some other appropriate Collect." />
<TextBlock
	text="Heavenly Father, grant these our prayers for the sake of Jesus
Christ, our only Mediator and Advocate, who lives and reigns
with you in the unity of the Holy Spirit, one God, now and for
ever. **Amen.**"
/>
<Rubric text="The Celebrant may then say the Exhortation." />
<SectionTitle text="the confession and absolution of sin" />
<Rubric text="The Deacon or other person appointed says the following" />
<TextBlock
	text="All who truly and earnestly repent of your sins, and seek to live
in love and charity with your neighbors, and intend to lead the
new life, following the commandments of God, and walking
in his holy ways: draw near with faith and make your humble
confession to Almighty God."
/>
<Rubric text="or" />
<Line text="Let us humbly confess our sins to Almighty God." />
<Silence />
<Rubric text="The Deacon and People kneel as able and pray" />
<Line bold text="Almighty God, Father of our Lord Jesus Christ," />
<Line indent bold text="maker and judge of us all:" />
<Line bold text="We acknowledge and lament our many sins and offenses," />
<Line indent bold text="which we have committed by thought, word, and deed" />

<PageNumber page={112} text="the holy eucharist" />
