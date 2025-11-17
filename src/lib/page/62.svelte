<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Psalm from '$lib/page_helpers/psalm.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
	import WordOfTheLord from '$lib/text_component/word_of_the_lord.svelte';
</script>

<Rubric>At the end of the reading is said</Rubric>
<WordOfTheLord />
<Rubric>A period of silence may follow. A suitable hymn may be sung.</Rubric>
<Versical officiant text="Into your hands, O Lord, I commend my spirit;" />
<Versical people text="For you have redeemed me, O Lord, O God of truth." />
<Versical officiant text="Keep me, O Lord, as the apple of your eye;" />
<Versical people text="Hide me under the shadow of your wings." />
<Kyrie />
<Rubric>Officiant and People</Rubric>
<PageNumber page={62} text="Daily Office" />
