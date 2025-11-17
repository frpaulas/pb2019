<script>
	import IntentionallyBlank from '$lib/page_helpers/intentionally_blank.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import { text } from '@sveltejs/kit';
</script>

<SectionTitle
	text="from ash wednesday _to_ the eve of palm sunday
    _or_ penitential occasions"
/>
<Versical celebrant text="Bless the Lord who forgives all our sins." />
<Versical people text="His mercy endures for ever." />
<br />
<SectionTitle text="for holy week" />
<Versical celebrant text="Blessed be our God." />
<Versical people text="Now and for ever. Amen." />
<br />
<SectionTitle text="from easterday _until_ the eve of pentecost" />
<Versical celebrant text="Alleluia! Christ is risen!" />
<Versical people text="The Lord is risen indeed! Alleluia!" />
<br />
<SectionTitle
	text="for the day of pentecost, _and_
    occasions of confirmation _and_ ordination"
/>
<Versical celebrant text="The Lord will pour out his Spirit upon all flesh," />
<Versical people text="And your sons and daughters shall prophesy." />
<Versical celebrant text="Your old men shall dream dreams," />
<Versical people text="And your young men shall see visions." />
<Versical celebrant text="You shall know that the Lord is in the midst of his people," />
<Versical people text="That he is the Lord and there is none else." />
<Versical celebrant text="And it shall come to pass" />
<Versical people text="That everyone who calls on the Name of the Lord shall be saved." />
<div class="mr-10 text-right">
	<Ref text="joel 2:27-28, 32" t nr /><Ref text="acts 2:17, 21" t continued />
</div>
<br />
<SectionTitle
	text="for all saints’ day and
    other appropriate occasions"
/>
<Versical celebrant text=" is the Lord our God," />
<Versical people text="To receive glory and honor and power." />
<Ref text="revelation 4:11 t" />

<PageNumber page={146} text="the holy eucharist" />
