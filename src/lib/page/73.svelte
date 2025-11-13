<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import ShowPsalmVerses from '$lib/page_helpers/show_psalm_verses.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm134 = getPsalmMeta(134);
</script>

<SectionTitle size="3xl" text="at the close of day" />
<Rubric text="The following or some other verse of Scripture is said" />
<ShowPsalmVerses ps={4} verses={[8]} />
<PsalmNumber n={psalm134.number} />
<SectionTitle fancy text={psalm134.name} latin_size />

<ShowPsalm ps={134} bold />
<SectionTitle size="2xl" text="a reading from holy scripture" />
<Scripture
	text="You keep them in perfect peace whose minds are stayed on you,
because they trust in you. Trust in the Lord for ever, for the
Lord God is an everlasting rock."
	ref="isaiah 26:3-4"
	t
/>
<OrThis />
<Scripture
	text="Now may the God of peace himself sanctify you completely,
and may your whole spirit and soul and body be kept blameless
at the coming of our Lord Jesus Christ."
	ref="1 thessalonians 5:23"
/>
<Rubric text="A period of silence may follow." />
<Rubric text="A hymn or canticle may be used." />
<Rubric
	text="Prayers may be offered for ourselves and others. It is appropriate that prayers of
    thanksgiving for the blessings of the day, and penitence for our sins, be included."
/>

<PageNumber page={73} text="Family Prayer | at the close of day" />
