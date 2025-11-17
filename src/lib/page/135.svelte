<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import HumbleAccess from '$lib/prayers/humble_access.svelte';
	import KeepTheFeast from '$lib/text_component/keep_the_feast.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle>the fraction</SectionTitle>
<Rubric>If the consecrated Bread was not broken earlier, the Celebrant breaks it now.</Rubric>
<Rubric>A period of silence is kept.</Rubric>
<Rubric>Then may be sung or said</Rubric>
<Versical celebrant>[Alleluia.] Christ our Passover is sacrificed for us.</Versical>
<KeepTheFeast />
<OrThis />
<Versical celebrant
	>[Alleluia.] Christ our Passover Lamb has been sacrificed, once for all upon the Cross.</Versical
>
<KeepTheFeast />
<Rubric
	>In Lent, Alleluia is omitted, and may be omitted at other times except during Easter Season.</Rubric
>
<HumbleAccess />
<PageNumber page={135} text="holy eucharist | Renewed ancient text" />
