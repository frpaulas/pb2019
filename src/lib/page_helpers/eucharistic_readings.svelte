<script>
	import Line from './line.svelte';
	import Rubric from './rubric.svelte';
	import SectionTitle from './section_title.svelte';
	import ShowContent from './show_content.svelte';
	import Versical from './versical.svelte';
</script>

<SectionTitle text="the lessons" />
<Rubric text="One or more Lessons, as appointed, are read, the Reader first saying" />
<Versical text="A Reading from _____________." />
<ShowContent text="Show 1st Lesson" getContent={() => 'First Lesson content goes here'} />
<ShowContent text="Show 2nd Lesson" getContent={() => 'Second Lesson content goes here'} />

<Rubric text="A citation giving chapter and verse may be added." />
<Rubric text="After each Lesson the Reader may say" />
<Versical text="The Word of the Lord." />
<Versical people text="Thanks be to God." />
<Rubric text="Or the Reader may say" add_on="Here ends the Reading." />
<Rubric text="Silence may follow." />
<Rubric text="A psalm, hymn, or anthem may follow each reading." />
<ShowContent text="Show Psalm" getContent={() => 'Psalm content goes here'} />

<Rubric text="All standing, the Deacon or Priest reads the Gospel, first saying" />
<Versical
	text="The Holy Gospel of our Lord Jesus Christ according
    to _____________."
/>

<Versical people text="Glory to you, Lord Christ." />
<Rubric text="After the Gospel, the Reader says" />

<Versical text="The Gospel of the Lord." />
<Versical people text="Praise to you, Lord Christ." />
<SectionTitle text="the sermon" />
<SectionTitle text="the nicene creed" />
<Rubric
	text="On Sundays, other Major Feast Days, and other times as appointed, all stand to
    recite the Nicene Creed, the Celebrant first saying"
/>
<Line text="Let us confess our faith in the words of the Nicene Creed:" />
