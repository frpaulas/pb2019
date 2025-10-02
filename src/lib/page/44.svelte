<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<Rubric text="The following or some other suitable hymn or Psalm may be sung or said." />
<SectionTitle text="phos hilaron" />
<SectionTitle fancy text="O Gladsome Light" />
<Line bold text="O gladsome light," />
<Line bold text="pure brightness of the everliving Father in heaven, *" />
<Line bold indent text="O Jesus Christ, holy and blessed!" />
<Line bold text="Now as we come to the setting of the sun," />
<Line bold text="and our eyes behold the vesper light, *" />
<Line bold indent text="we sing your praises, O God: Father, Son, and Holy Spirit." />
<Line bold text="You are worthy at all times to be praised by happy voices, *" />
<Line bold indent text="O Son of God, O Giver of Life," />
<Line bold indent text="and to be glorified through all the worlds." />
<Rubric text="Then follows" />
<SectionTitle text="the psalm or psalms appointed" />
<Rubric text="At the end of the Psalms the Gloria Patri (Glory be...) is sung or said" />
<Gloria />
<SectionTitle text="the lessons" />
<Rubric text="One or more Lessons, as appointed, are read, the Reader first saying" />
<Versical text="A Reading from _____________." />
<Rubric text="A citation giving chapter and verse may be added." />
<Rubric text="After each Lesson the Reader may say" />
<Versical text="The Word of the Lord." />
<Versical people text="Thanks be to God." />
<PageNumber page={44} text="Daily office" />
