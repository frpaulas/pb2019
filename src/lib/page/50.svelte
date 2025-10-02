<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import ProtectionEp from '$lib/canticle/protection_ep.svelte';
	import PresenceChristEp from '$lib/canticle/presence_christ_ep.svelte';
	import FaithEp from '$lib/canticle/faith_ep.svelte';
	import EveOfWorshipEp from '$lib/canticle/eve_of_worship_ep.svelte';
</script>

<ProtectionEp />
<PresenceChristEp />
<FaithEp />
<EveOfWorshipEp />
<PageNumber page={50} text="Daily office" />
