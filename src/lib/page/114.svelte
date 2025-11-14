<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<Scripture
	text="The saying is trustworthy and deserving of full
acceptance, that Christ Jesus came into the world to
save sinners."
	ref="1 timothy 1:15"
/>
<Scripture
	text="If anyone sins, we have an advocate with the Father, Jesus Christ
the righteous. He is the propitiation for our sins, and not for
ours only, but also for the sins of the whole world."
	ref="1 john 2:1-2"
	t
/>
<SectionTitle text="the peace" />

<Versical celebrant text="The Peace of the Lord be always with you." />
<Versical celebrant text="And with your spirit." />
<Rubric text="Then the Ministers and People may greet one another in the Name of the Lord." />
<SectionTitle text="the offertory" />
<Rubric
	text="The Celebrant may begin the Offertory with one of the provided sentences of Scripture.
During the Offertory a hymn, psalm, or anthem may be sung. The Deacon
or Priest prepares the Holy Table for the celebration. Representatives of the
Congregation may bring the People’s offerings of bread and wine, and money or
other gifts, to the Deacon or Priest."
/>
<Rubric text="The People stand while the offerings are presented. The following may be said." />
<Versical
	celebrant
	text="Yours, O Lord, is the greatness, and the power,
and the glory, and the victory, and the majesty: for
everything in heaven and on earth is yours; yours is
the Kingdom, O Lord, and you are exalted as Head
above all. All things come from you, O Lord,"
/>
<Versical people text="And of your own have we given you." />
<Ref text="1 chronicles 29:11, 14" t />
<PageNumber page={114} text="the holy eucharist" />
