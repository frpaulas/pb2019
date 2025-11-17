<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Psalm from '$lib/page_helpers/psalm.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<Rubric>The Officiant alone says</Rubric>
<TextBlock amen
	>May Almighty God grant us forgiveness of all our sins, and the grace and comfort of the Holy
	Spirit.</TextBlock
>
<Versical officiant>O God, make speed to save us;</Versical>
<Versical people>O Lord, make haste to help us.</Versical>
<Versical officiant>Glory be to the Father, and to the Son, and to the Holy Spirit;</Versical>
<Versical people
	>As it was in the beginning, is now, and ever shall be, world without end. Amen.</Versical
>
<Rubric add_on="Alleluia.">Except in Lent, add</Rubric>
<Rubric>One or more of the following, or some other suitable Psalm, is sung or said.</Rubric>
<SectionTitle>psalm 4</SectionTitle>
<SectionTitle fancy>Cum invocarem</SectionTitle>
<Psalm
	vs="1"
	ln1="Hear me when I call, O God of my righteousness; *"
	ln2="you set me free when I was in trouble; have mercy upon me,
and hear my prayer."
/>
<Psalm
	vs="2"
	ln1="O you children of men, how long will you blaspheme
my honor, *"
	ln2="and have such pleasure in vanity, and seek after falsehood?"
/>
<Psalm
	vs="3"
	ln1="Know this also, that the Lord has chosen for himself
the one that is godly; *"
	ln2="when I call upon the Lord, he will hear me."
/>
<Psalm
	vs="4"
	ln1="Stand in awe, and sin not; *"
	ln2="commune with your own heart upon your bed, and be still."
/>
<Psalm vs="5" ln1="Offer the sacrifice of righteousness *" ln2="and put your trust in the Lord." />
<Psalm
	vs="6"
	ln1="There are many that say, “Who will show us any good?” *"
	ln2="Lord, lift up the light of your countenance upon us."
/>
<PageNumber page={58} text="Daily office" />
