<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import InclineOurHearts from '$lib/text_component/incline_our_hearts.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
</script>

<Versical celebrant text="You shall not commit adultery." />
<InclineOurHearts />
<Versical celebrant text="You shall not steal." />
<InclineOurHearts />
<Versical celebrant text="You shall not bear false witness against your neighbor." />
<InclineOurHearts />
<Versical celebrant text="You shall not covet." />
<Versical people text="Lord, have mercy upon us," />
<Versical text="and write all these, your laws," />
<Versical text="in our hearts, we beseech you." />
<Ref text="exodus 20:1-17 t; deuteronomy 5:6-21" t />

<PageNumber page={101} text="the decalogue" />
