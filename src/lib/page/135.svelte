<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import HumbleAccess from '$lib/prayers/humble_access.svelte';
	import KeepTheFeast from '$lib/text_component/keep_the_feast.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<SectionTitle text="the fraction" />
<Rubric text="If the consecrated Bread was not broken earlier, the Celebrant breaks it now." />
<Rubric text="A period of silence is kept." />
<Rubric text="Then may be sung or said" />
<Versical celebrant text="[Alleluia.] Christ our Passover is sacrificed for us." />
<KeepTheFeast />
<OrThis />
<Versical
	celebrant
	text="[Alleluia.] Christ our Passover Lamb has been sacrificed, once for all upon the Cross."
/>
<KeepTheFeast />
<Rubric
	text="In Lent, Alleluia is omitted, and may be omitted at other times except during Easter Season."
/>
<HumbleAccess />
<PageNumber page={135} text="holy eucharist | Renewed ancient text" />
