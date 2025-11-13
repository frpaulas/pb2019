<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import NuncDimittis from '$lib/canticle/nunc_dimittis.svelte';
</script>

<SectionTitle size="2xl" text="the lord’s prayer" />
<SectionTitle size="2xl" text="the collect" />

<TextBlock
	text="Visit this place, O Lord, and drive far from it all snares of the
enemy; let your holy angels dwell with us to preserve us in
peace; and let your blessing be upon us always; through Jesus
Christ our Lord."
	amen
/>
<NuncDimittis />
<SectionTitle size="2xl" text="concluding sentence" />
<TextBlock
	text="The almighty and merciful Lord, Father, Son, and Holy Spirit,
    bless us and keep us, this night and evermore."
	amen
/>

<PageNumber page={74} text="Daily Office" />
