<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<SectionTitle size="3xl">the great litany</SectionTitle>
<Rubric>To be said or sung, kneeling, standing, or in procession.</Rubric>
<Line text="O God the Father, Creator of heaven and earth," />
<Line indent bold text="Have mercy upon us." />
<Line text="O God the Son, Redeemer of the world," />
<Line indent bold text="Have mercy upon us." />
<Line text="O God the Holy Spirit, Sanctifier of the faithful," />
<Line indent bold text="Have mercy upon us." />
<Line text="O holy, blessed, and glorious Trinity, one God," />
<Line indent bold text="Have mercy upon us." />
<TextBlock>Remember not, Lord Jesus, our offenses, nor the offenses of
 our forebears; neither reward us according to our sins. Spare us,
 good Lord, spare your people, whom you have redeemed with
 your most precious blood, and by your mercy preserve us forever.</TextBlock>
<Line indent bold text="Spare us, good Lord." />
<TextBlock>From all evil and wickedness; from sin, from the works and assaults
    of the devil; from your wrath and everlasting condemnation,</TextBlock>
<Line indent bold text="Good Lord, deliver us." />
<TextBlock>From all blindness of heart; from pride, vanity, and hypocrisy;
    from envy, hatred, and malice; and from all lack of charity,</TextBlock>
<Line indent bold text="Good Lord, deliver us." />

<PageNumber page={91} text="the great litany" />
