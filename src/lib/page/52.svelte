<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Chrysostom from '$lib/canticle/chrysostom.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
</script>

<Line bold>We bless you for our creation, preservation,</Line>
<Line bold indent>and all the blessings of this life;</Line>
<Line bold indent>but above all for your immeasurable love</Line>
<Line bold indent>in the redemption of the world by our Lord Jesus Christ;</Line>
<Line bold indent>for the means of grace, and for the hope of glory.</Line>
<Line bold>And, we pray, give us such an awareness of your mercies,</Line>
<Line bold indent>that with truly thankful hearts we may show forth your praise,</Line>
<Line bold indent>not only with our lips, but in our lives,</Line>
<Line bold indent>by giving up our selves to your service,</Line>
<Line bold indent>and by walking before you</Line>
<Line bold indent>in holiness and righteousness all our days;</Line>
<Line bold>Through Jesus Christ our Lord,</Line>
<Line bold indent>to whom, with you and the Holy Spirit,</Line>
<Line bold indent>be honor and glory throughout all ages. Amen.</Line>
<Chrysostom />
<Versical officiant>Let us bless the Lord.</Versical>
<Versical people>Thanks be to God.</Versical>
<Rubric
	text="From Easter Day through the Day of Pentecost, “Alleluia, alleluia” may be added
    to the preceding versicle and response."
/>
<Rubric
	text="The Officiant says one of these concluding sentences (and the People may be
    invited to join)"
/>
<PageNumber page={52} text="Daily office" />
