<script>
	import 'tailwindcss';

	let { text, size = '2xl', fancy = false, fancyOf = false, fancyAnd = false } = $props();
	let this_class = 'text-center tracking-[.3em] uppercase ' + size + (fancy ? ' italic' : '');
	let fancy_class = 'italic font-cormorant lowercase ';
	if (fancyOf) {
		text = text.replace('of', `<span class="${fancy_class}">of</span>`);
	}
	if (fancyAnd) {
		text = text.replace('and', `<span class="${fancy_class}">and</span>`);
	}
</script>

<p class={this_class}>
	{@html text}
</p>
