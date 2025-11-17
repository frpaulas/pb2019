<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import PostCommunionPrayer from '$lib/text_component/post_communion_prayer.svelte';
</script>

<PostCommunionPrayer ast pg={121} />
<Rubric>The Bishop when present, or the Priest, gives this or an alternate blessing</Rubric>
<TextBlock>The peace of God, which passes all understanding, keep your
hearts and minds in the knowledge and love of God, and of his
Son Jesus Christ our Lord; and the blessing of God Almighty,
the Father, the Son, and the Holy Spirit, be among you, and
remain with you always. **Amen.**</TextBlock>
<Rubric>A hymn, psalm, or anthem may be sung after the Blessing (or following the Dismissal).</Rubric>

<PageNumber page={121} text="holy eucharist | anglican standard text" />
