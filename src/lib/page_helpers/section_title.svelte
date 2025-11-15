<script>
	import 'tailwindcss';
	import { parseMarkdown } from '$lib/utils/parseMarkdown.js';

	let {
		text,
		size = 'text-l',
		fancy = false,
		fancyOf = false,
		fancyAnd = false,
		latin_size = false,
		hebrew = false
	} = $props();
	let this_class =
		'text-center tracking-[.3em] uppercase ' +
		size +
		(fancy ? ' italic' : '') +
		(latin_size ? ' text-xs' : '') +
		(hebrew ? ' uppercase' : '');
	let fancy_class = 'italic font-cormorant lowercase ';

	let parsedText = $derived.by(() => {
		let result = parseMarkdown(text);
		if (fancyOf) {
			result = result.replace('of', `<span class="${fancy_class}">of</span>`);
		}
		if (fancyAnd) {
			result = result.replace('and', `<span class="${fancy_class}">and</span>`);
		}
		return result;
	});
</script>

<p class={this_class}>
	{@html parsedText}
</p>
