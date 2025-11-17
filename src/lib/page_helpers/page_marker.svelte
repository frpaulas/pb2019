<script>
	let { page, text = 'the holy eucharist' } = $props();

	// Alternate sides based on odd/even page numbers
	let position_class = page % 2 === 1 ? 'right-0' : 'left-0';
</script>

<!-- Inline anchor point for page reference -->
<span id="page-{page}" class="inline-block relative">
	<!-- Floating page number in margin -->
	<span class="absolute {position_class} -mx-16 text-xs text-gray-400 tracking-[.15em] uppercase opacity-50 whitespace-nowrap">
		{text} {page}
	</span>
</span>
