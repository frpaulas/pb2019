<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<TextBlock>
	here. The Book of Common Prayer (2019) is indisputably true to Cranmer’s originating vision of a
	form of prayers and praises that is thoroughly Biblical, catholic in the manner of the early
	centuries, highly participatory in delivery, peculiarly Anglican and English in its roots,
	culturally adaptive and missional in a most remarkable way, utterly accessible to the people, and
	whose repetitions are intended to form the faithful catechetically and to give them doxological
	voice.</TextBlock>
<TextBlock>
	The Book of Common Prayer (2019) is the product of the new era of reform and restoration that has
	created the Anglican Church in North America. The Jerusalem Declaration of 2008 located itself
	within the historic confines of what is authentically the Christian Faith and the Anglican
	patrimony, and sought to restore their fullness and beauty. The Book of Common Prayer (2019) is
	offered to the same end.</TextBlock>
{#snippet bishop(name, title, affiliation, of)}
	<div>
		<p class=" text-center text-lg uppercase">{name}</p>
		<p class=" text-center normal-case italic">{title}</p>
		<p class=" text-center normal-case italic">{affiliation}</p>
		<p class=" text-center normal-case italic">{of}</p>
	</div>
{/snippet}
<div class="mt-8 flex break-after-all flex-col gap-3 sm:flex-row sm:gap-6">
	{@render bishop(
		'+Foley Beach',
		'Archbishop',
		'Anglican Church in North America',
		'On behalf of the College of Bishops'
	)}
	{@render bishop(
		'+Robert Duncan',
		'Archbishop Emeritus',
		'Anglican Church in North America',
		'On behalf of all who shaped this Book'
	)}
</div>
<p class="mt-8 text-center text-base italic">The Feast of the Nativity of St. John the Baptist</p>
<p class="text-center text-sm uppercase">anno domini mmxix</p>
<PageNumber text="preface" page={5} />
