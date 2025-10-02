<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Psalm from '$lib/page_helpers/psalm.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

6 7
<Psalm vs="6" ln1="Those who sow in tears " ln2="shall reap with songs of joy." />
<Psalm
	vs="7"
	ln1="He who goes on his way weeping and bears good seed "
	ln2="shall doubtless come again with joy, and bring
    his sheaves with him."
/>
<Rubric text="At the end of the Psalms the Gloria Patri (Glory be...) is sung or said" />
<Gloria />
<Rubric text="One of the following, or some other suitable passage of Scripture, is read" />
<Scripture
	text="Jesus said, “Now is the judgment of this world; now will the
ruler of this world be cast out. And I, when I am lifted up from
the earth, will draw all people to myself.” "
	ref="john 12:31-32"
/>
<Scripture
	text="If anyone is in Christ, he is a new creation. The old has passed
away; behold, the new has come. All this is from God, who
through Christ reconciled us to himself and gave us the ministry
of reconciliation."
	ref="2 corinthians 5:17-18"
/>
<Scripture
	text="From the rising of the sun to its setting my name will be great
among the nations, and in every place incense will be offered to
my name, and a pure offering. For my name will be great among
the nations, says the Lord of Hosts. "
	ref="malachi 1:11"
/>
<Rubric text="At the end of the reading is said" />
<Versical text="The Word of the Lord." />
<Versical text="Thanks be to God." />
<Rubric text="A meditation, silent or spoken, may follow." />
<PageNumber page={36} text="daily office" />
