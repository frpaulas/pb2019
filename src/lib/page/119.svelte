<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import HumbleAccess from '$lib/prayers/humble_access.svelte';
	import AgnusDei from '$lib/text_component/agnus_dei.svelte';
	import Communion from '$lib/text_component/communion.svelte';
</script>

<Rubric
	text="In Lent, Alleluia is omitted, and may be omitted at other times except during
    Easter Season."
/>
<HumbleAccess />
<AgnusDei />
<Communion pg={119} />

<PageNumber page={119} text="holy eucharist | anglican standard text" />
