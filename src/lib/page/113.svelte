<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<Line indent bold text="against your divine majesty," />
<Line indent bold text="provoking most justly your righteous anger against us." />
<Line bold text="We are deeply sorry for these our transgressions;" />
<Line indent bold text="the burden of them is more than we can bear." />
<Line bold text="Have mercy upon us," />
<Line bold text="Have mercy upon us, most merciful Father;" />
<Line indent bold text="for your Son our Lord Jesus Christ’s sake," />
<Line indent bold text="forgive us all that is past;" />
<Line indent bold text="and grant that we may evermore serve and please you in" />
<Line indent bold text="newness of life," />
<Line indent bold text="to the honor and glory of your Name;" />
<Line indent bold text="through Jesus Christ our Lord. Amen." />
<Rubric text="The Bishop or Priest stands and says" />
<TextBlock
	text="Almighty God, our heavenly Father, who in his great mercy has
promised forgiveness of sins to all those who sincerely repent
and with true faith turn to him, have mercy upon you, pardon
and deliver you from all your sins, confirm and strengthen you
in all goodness, and bring you to everlasting life; through Jesus
Christ our Lord. **Amen.**"
/>
<SectionTitle text="the comfortable words" />
<Rubric text="The Celebrant may then say one or more of the following sentences, first saying" />
<Line text="Hear the Word of God to all who truly turn to him." />
<Scripture
	text="Come to me, all who labor and are heavy laden, and I will give
    you rest."
	ref="matthew 11:28"
/>
<Scripture
	text="God so loved the world, that he gave his only-begotten Son,
that whoever believes in him should not perish but have eternal
life."
	ref="john 3:16"
	t
/>

<PageNumber page={113} text="holy eucharist | anglican standard text" />
