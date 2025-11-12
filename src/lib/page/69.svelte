<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';
	import OrThis from '$lib/text_component/or_this.svelte';
	const psalm113 = getPsalmMeta(113);
</script>

<SectionTitle size="3xl" text="at midday" />
<Rubric text="The following or some other verse of Scripture is said" />
<Scripture
	text="Blessed be the God and Father of our Lord Jesus Christ, who
has blessed us in Christ with every spiritual blessing in the
heavenly places."
	ref="ephesians 1:3"
/>

<SectionTitle size="2xl" text="Psalm 113:1-4" />
<SectionTitle fancy text={psalm113.name} latin_size />
<ShowPsalm ps={149} to={4} />
<Gloria />

<SectionTitle size="2xl" text="a reading from holy scripture" />
<Scripture
	text="Abide in me, and I in you. As the branch cannot bear fruit by
itself, unless it abides in the vine, neither can you, unless you
abide in me. I am the vine; you are the branches. Whoever
abides in me and I in him, he it is that bears much fruit, for
apart from me you can do nothing."
	ref="john 15:4-5"
/>
<OrThis />
<PageNumber page={69} text="Family Prayer | at midday" />
