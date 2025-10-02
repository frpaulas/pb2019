<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Chrysostom from '$lib/canticle/chrysostom.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
</script>

<Line bold text="We bless you for our creation, preservation," />
<Line bold indent text="and all the blessings of this life;" />
<Line bold indent text="but above all for your immeasurable love" />
<Line bold indent text="in the redemption of the world by our Lord Jesus Christ;" />
<Line bold indent text="for the means of grace, and for the hope of glory." />
<Line bold text="And, we pray, give us such an awareness of your mercies," />
<Line bold indent text="that with truly thankful hearts we may show forth your praise," />
<Line bold indent text="not only with our lips, but in our lives," />
<Line bold indent text="by giving up our selves to your service," />
<Line bold indent text="and by walking before you" />
<Line bold indent text="in holiness and righteousness all our days;" />
<Line bold text="Through Jesus Christ our Lord," />
<Line bold indent text="to whom, with you and the Holy Spirit," />
<Line bold indent text="be honor and glory throughout all ages. Amen." />
<Chrysostom />
<Versical officiant text="Let us bless the Lord." />
<Versical people text="Thanks be to God." />
<Rubric
	text="From Easter Day through the Day of Pentecost, “Alleluia, alleluia” may be added
    to the preceding versicle and response."
/>
<Rubric
	text="The Officiant says one of these concluding sentences (and the People may be
    invited to join)"
/>
<PageNumber page={52} text="Daily office" />
