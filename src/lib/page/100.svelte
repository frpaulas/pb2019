<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import InclineOurHearts from '$lib/text_component/incline_our_hearts.svelte';
</script>

<SectionTitle>the decalogue</SectionTitle>
<Versical celebrant text="God spoke these words and said:" />
<Versical text="I am the Lord your God." />
<Versical text="You shall have no other gods but me." />
<InclineOurHearts />
<Versical celebrant text="You shall not make for yourself any idol." />
<InclineOurHearts />
<Versical celebrant text="You shall not take the Name of the Lord your God in vain." />
<InclineOurHearts />
<Versical celebrant text="Remember the Sabbath day and keep it holy." />
<InclineOurHearts />
<Versical celebrant text="Honor your father and your mother." />
<InclineOurHearts />
<Versical celebrant text="You shall not murder." />
<InclineOurHearts />

<PageNumber page={100} text="great litany & decalogue" />
