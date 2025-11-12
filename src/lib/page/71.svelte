<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import ShowPsalmVerses from '$lib/page_helpers/show_psalm_verses.svelte';
	import PhosHilaron from '$lib/canticle/phos_hilaron.svelte';
</script>

<SectionTitle size="3xl" text="in the early evening" />
<Rubric text="This devotion may be used before or after the evening meal." />
<Rubric text="The following or some other verse of Scripture is said" />
<ShowPsalmVerses ps={36} verses={[7, 9]} />
<PhosHilaron />
<SectionTitle size="sxl" text="a reading from holy scripture" />
<Scripture
	text="For what we proclaim is not ourselves, but Jesus Christ as Lord,
with ourselves as your servants for Jesus’ sake. For God, who
said, “Let light shine out of darkness,” has shone in our hearts,
to give the light of the knowledge of the glory of God in the
face of Jesus Christ."
	ref="2 corinthians 4:5-6"
/>

<OrThis />
<PageNumber page={71} text="Family Prayer | in the early evening" />
