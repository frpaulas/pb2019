<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle size="3xl">compline</SectionTitle>
<Rubric>The Officiant begins</Rubric>

<Line text="The Lord Almighty grant us a peaceful" amen />
<Line indent text="and a perfect end." amen />
Officiant People
<Versical officiant text="Our help is in the Name of the Lord;" />
<Versical people text="The maker of heaven and earth." />
<Rubric>The Officiant continues</Rubric>
<Line text="Let us humbly confess our sins to Almighty God." />
<Rubric>Silence may be kept. The Officiant and People then say</Rubric>
<Line bold text="Almighty God and Father, we confess to you," />
<Line bold text="to one another, and to the whole company of heaven," />
<Line bold indent text="that we have sinned, through our own fault," />
<Line bold indent text="in thought, and word, and deed," />
<Line bold indent text="and in what we have left undone." />
<Line bold text="For the sake of your Son our Lord Jesus Christ," />
<Line bold indent text="have mercy upon us, forgive us our sins," />
<Line bold indent text="and by the power of your Holy Spirit" />
<Line bold indent text="raise us up to serve you in newness of life," />
<Line bold indent text="to the glory of your Name. Amen." />
/>
<PageNumber page={57} text="Compline" />
