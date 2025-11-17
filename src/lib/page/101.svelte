<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import InclineOurHearts from '$lib/text_component/incline_our_hearts.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
</script>

<Versical celebrant>You shall not commit adultery.</Versical>
<InclineOurHearts />
<Versical celebrant>You shall not steal.</Versical>
<InclineOurHearts />
<Versical celebrant>You shall not bear false witness against your neighbor.</Versical>
<InclineOurHearts />
<Versical celebrant>You shall not covet.</Versical>
<Versical people>Lord, have mercy upon us,</Versical>
<Versical>and write all these, your laws,</Versical>
<Versical>in our hearts, we beseech you.</Versical>
<Ref text="exodus 20:1-17 t; deuteronomy 5:6-21" t />

<PageNumber page={101} text="the decalogue" />
