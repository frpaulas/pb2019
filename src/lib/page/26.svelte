<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import Chrysostom from '$lib/canticle/chrysostom.svelte';
</script>

<Chrysostom />
<Versical officiant>Let us bless the Lord.</Versical>
<Versical people>Thanks be to God.</Versical>
<Rubric
	text="From Easter Day through the Day of Pentecost, “Alleluia, alleluia” may be added
    to the preceding versicle and response."
/>
<Rubric
	text="The Officiant says one of these concluding sentences (and the People may be invited
    to join)"
/>
<Scripture
	text="The grace of our Lord Jesus Christ, and the love of God, and the
    fellowship of the Holy Spirit, be with us all evermore."
	amen
	ref="2 corinthians 13:14"
	t
/>
<Scripture
	text="May the God of hope fill us with all joy and peace in believing
    through the power of the Holy Spirit."
	amen
	ref="romans 15:13"
	t
/>
<Scripture
	text="Glory to God whose power, working in us, can do infinitely
more than we can ask or imagine: Glory to him from generation
to generation in the Church, and in Christ Jesus for ever and
ever."
	amen
	ref="ephesians 3:20-21"
	t
/>
<PageNumber page={26} text="daily office" />
