<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import AtNight from '$lib/prayers/at_night.svelte';
	import ForChildren from '$lib/prayers/for_children.svelte';
	import InTheMorning from '$lib/prayers/in_the_morning.svelte';
	import ForRelativesAndFriends from '$lib/prayers/for_relatives_and_friends.svelte';
</script>

<ForRelativesAndFriends />
<Rubric>The Prayer for Relatives and Friends is repeated on page 76</Rubric>
<ForChildren />
<InTheMorning />
<AtNight />

<PageNumber page={77} text="Family Prayer | additional prayers" />
