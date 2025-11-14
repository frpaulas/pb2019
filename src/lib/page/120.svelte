<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
</script>

<TextBlock
	text="The gifts of God for the people of God. [Take them in
remembrance that Christ died for you and feed on him in your
hearts by faith, with thanksgiving.]"
/>
<OrThis />
<Scripture
	text="Behold the Lamb of God, behold him who takes away the sins
of the world. Blessed are those who are invited to the marriage
supper of the Lamb."
	ref="revelation 19:9, john 1:29"
	t
/>
<Rubric
	text="The Ministers receive the Sacrament in both kinds, and then immediately deliver
    it to the People."
/>
<Rubric text="The Bread and Cup are given to the communicants with these words" />
<TextBlock
	text="The Body of our Lord Jesus Christ, [which was given for you,
preserve your body and soul to everlasting life. Take and eat this
in remembrance that Christ died for you, and feed on him in
your heart by faith, with thanksgiving.]"
/>
<TextBlock
	text="The Blood of our Lord Jesus Christ, [which was shed for you,
preserve your body and soul to everlasting life. Drink this in
remembrance that Christ’s Blood was shed for you, and be
thankful.]"
/>
<Rubric text="During the ministration of Communion, hymns, psalms, or anthems may be sung." />
<Rubric
	text="The Celebrant may offer a sentence of Scripture at the conclusion of the Communion."
/>
<SectionTitle text="the post communion prayer" />
<Rubric text="After Communion, the Celebrant says" />
<Line text="Let us pray." />
<Rubric
	text="Celebrant and People together say the following, or the Post Communion Prayer
    in the Renewed Ancient Text"
/>

<PageNumber page={120} text="the holy eucharist" />
