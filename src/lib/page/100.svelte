<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import InclineOurHearts from '$lib/text_component/incline_our_hearts.svelte';
</script>

<SectionTitle>the decalogue</SectionTitle>
<Versical celebrant>God spoke these words and said:</Versical>
<Versical>I am the Lord your God.</Versical>
<Versical>You shall have no other gods but me.</Versical>
<InclineOurHearts />
<Versical celebrant>You shall not make for yourself any idol.</Versical>
<InclineOurHearts />
<Versical celebrant>You shall not take the Name of the Lord your God in vain.</Versical>
<InclineOurHearts />
<Versical celebrant>Remember the Sabbath day and keep it holy.</Versical>
<InclineOurHearts />
<Versical celebrant>Honor your father and your mother.</Versical>
<InclineOurHearts />
<Versical celebrant>You shall not murder.</Versical>
<InclineOurHearts />

<PageNumber page={100} text="great litany & decalogue" />
