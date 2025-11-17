<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import NuncDimittis from '$lib/canticle/nunc_dimittis.svelte';
</script>

<SectionTitle size="2xl">the lord’s prayer</SectionTitle>
<SectionTitle size="2xl">the collect</SectionTitle>

<TextBlock amen>Visit this place, O Lord, and drive far from it all snares of the
enemy; let your holy angels dwell with us to preserve us in
peace; and let your blessing be upon us always; through Jesus
Christ our Lord.</TextBlock>
<NuncDimittis />
<SectionTitle size="2xl">concluding sentence</SectionTitle>
<TextBlock amen>The almighty and merciful Lord, Father, Son, and Holy Spirit,
    bless us and keep us, this night and evermore.</TextBlock>

<PageNumber page={74} text="Daily Office" />
