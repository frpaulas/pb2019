<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import SpiritOfPrayer from '$lib/prayers/spirit_of_prayer.svelte';
	import ForThoseWeLove from '$lib/prayers/for_those_we_love.svelte';
	import ForTheFamily from '$lib/prayers/for_the_family.svelte';
	import ForRelativesAndFriends from '$lib/prayers/for_relatives_and_friends.svelte';
</script>

<SectionTitle size="2xl" text="additional prayers" />
<SpiritOfPrayer />
<ForThoseWeLove />
<ForTheFamily />
<ForRelativesAndFriends />
<Rubric text="The Prayer for Relatives and Friends is repeated on page 77" />
<PageNumber page={76} text="Daily Office" />
