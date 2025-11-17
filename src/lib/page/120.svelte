<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Communion from '$lib/text_component/communion.svelte';
	import PostCommunionPrayer from '$lib/text_component/post_communion_prayer.svelte';
</script>

<Communion pg={120} />

<TextBlock>The Body of our Lord Jesus Christ, [which was given for you,
preserve your body and soul to everlasting life. Take and eat this
in remembrance that Christ died for you, and feed on him in
your heart by faith, with thanksgiving.]</TextBlock>
<TextBlock>The Blood of our Lord Jesus Christ, [which was shed for you,
preserve your body and soul to everlasting life. Drink this in
remembrance that Christ’s Blood was shed for you, and be
thankful.]</TextBlock>
<Rubric>During the ministration of Communion, hymns, psalms, or anthems may be sung.</Rubric>
<Rubric>The Celebrant may offer a sentence of Scripture at the conclusion of the Communion.</Rubric>
<PostCommunionPrayer ast pg={120} />
<Rubric>Celebrant and People together say the following, or the Post Communion Prayer
    in the Renewed Ancient Text</Rubric>

<PageNumber page={120} text="the holy eucharist" />
