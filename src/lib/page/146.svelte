<script>
	import IntentionallyBlank from '$lib/page_helpers/intentionally_blank.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import { text } from '@sveltejs/kit';
</script>

<SectionTitle
	>from ash wednesday _to_ the eve of palm sunday _or_ penitential occasions</SectionTitle
>
<Versical celebrant>Bless the Lord who forgives all our sins.</Versical>
<Versical people>His mercy endures for ever.</Versical>
<br />
<SectionTitle>for holy week</SectionTitle>
<Versical celebrant>Blessed be our God.</Versical>
<Versical people>Now and for ever. Amen.</Versical>
<br />
<SectionTitle>from easterday _until_ the eve of pentecost</SectionTitle>
<Versical celebrant>Alleluia! Christ is risen!</Versical>
<Versical people>The Lord is risen indeed! Alleluia!</Versical>
<br />
<SectionTitle
	>for the day of pentecost, _and_ occasions of confirmation _and_ ordination</SectionTitle
>
<Versical celebrant>The Lord will pour out his Spirit upon all flesh,</Versical>
<Versical people>And your sons and daughters shall prophesy.</Versical>
<Versical celebrant>Your old men shall dream dreams,</Versical>
<Versical people>And your young men shall see visions.</Versical>
<Versical celebrant>You shall know that the Lord is in the midst of his people,</Versical>
<Versical people>That he is the Lord and there is none else.</Versical>
<Versical celebrant>And it shall come to pass</Versical>
<Versical people>That everyone who calls on the Name of the Lord shall be saved.</Versical>
<div class="mr-10 text-right">
	<Ref text="joel 2:27-28, 32" t nr /><Ref text="acts 2:17, 21" t continued />
</div>
<br />
<SectionTitle>for all saints’ day and other appropriate occasions</SectionTitle>
<Versical celebrant>is the Lord our God,</Versical>
<Versical people>To receive glory and honor and power.</Versical>
<Ref text="revelation 4:11 t" />

<PageNumber page={146} text="the holy eucharist" />
