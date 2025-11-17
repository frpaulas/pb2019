<script>
	import Line from '$lib/page_helpers/line.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowContent from '$lib/page_helpers/show_content.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle text="the lessons" />
<Rubric text="One or more Lessons, as appointed, are read, the Reader first saying" />
<Versical>A Reading from _____________.</Versical>
<ShowContent text="Show 1st Lesson" getContent={() => 'First Lesson content goes here'} />
<ShowContent text="Show 2nd Lesson" getContent={() => 'Second Lesson content goes here'} />

<Rubric text="A citation giving chapter and verse may be added." />
<Rubric text="After each Lesson the Reader may say" />
<Versical>The Word of the Lord.</Versical>
<Versical people>Thanks be to God.</Versical>
<Rubric text="Or the Reader may say" add_on="Here ends the Reading." />
<Rubric text="Silence may follow." />
<Rubric text="A psalm, hymn, or anthem may follow each reading." />
<ShowContent text="Show Psalm" getContent={() => 'Psalm content goes here'} />

<Rubric text="All standing, the Deacon or Priest reads the Gospel, first saying" />
<Versical>The Holy Gospel of our Lord Jesus Christ according to _____________.</Versical>

<Versical people>Glory to you, Lord Christ.</Versical>
<Rubric text="After the Gospel, the Reader says" />

<Versical>The Gospel of the Lord.</Versical>
<Versical people>Praise to you, Lord Christ.</Versical>
<br />
<SectionTitle text="the sermon" />
<br />
<SectionTitle text="the nicene creed" />
<Rubric
	text="On Sundays, other Major Feast Days, and other times as appointed, all stand to
    recite the Nicene Creed, the Celebrant first saying"
/>
<Line text="Let us confess our faith in the words of the Nicene Creed:" />
