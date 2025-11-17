<script>
	let { text, page } = $props();

	// Floating page marker - appears in margin, doesn't break flow
	let position_class = page % 2 === 1 ? 'right-0' : 'left-0';
</script>

<div id="page-{page}" class="relative">
	<div
		class="absolute {position_class} -mx-16 text-xs tracking-[.15em] text-gray-400 uppercase opacity-50"
	>
		{text}
		{page}
	</div>
</div>
