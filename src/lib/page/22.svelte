<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<Versical officiant text="O Lord, save your people;" />
<Versical people text="And bless your inheritance." />
<Versical officiant text="Give peace in our time, O Lord;" />
<Versical people text="And defend us by your mighty power." />
<Versical officiant text="Let not the needy, O Lord, be forgotten;" />
<Versical people text="Nor the hope of the poor be taken away." />
<Versical officiant text="Create in us clean hearts, O God;" />
<Versical people text="And take not your Holy Spirit from us." />
<Rubric
	text="The Officiant then prays one or more of the following Collects, always beginning
with the Collect of the Day (usually the Collect of the Sunday or Principal Feast
and of any of the weekdays following, or of the Holy Day being observed), found
on pages 598-640. It is traditional to pray the Collects for Peace and Grace daily.
Alternatively, one may pray the Collects on a weekly rotation, using the
suggestions in italics."
/>
<SectionTitle text="the collect of the day" />
<SectionTitle fancy text="From the Collects of the Christian Year" />
<SectionTitle text="a collect for strength to await christ’s return" />
<SectionTitle fancy text="Sunday" />
<TextBlock
	text="O God our King, by the resurrection of your Son Jesus Christ on the first day of the week,
you conquered sin, put death to flight, and gave us the hope of everlasting life: Redeem all our days
by this victory; forgive our sins, banish our fears, make us bold to praise you and to do your will;
and steel us to wait for the consummation of your kingdom on the last great Day; through Jesus Christ
our Lord."
	amen
/>
<SectionTitle text="a collect for the renewal of life" />
<SectionTitle fancy text="Monday" />
<TextBlock
	text="O God, the King eternal, whose light
divides the day from the night and turns the shadow of death into the morning: Drive far from us all
wrong desires, incline our hearts to keep your"
/>
<PageNumber page={22} text="daily office" />
