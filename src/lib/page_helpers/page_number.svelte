<script>
	import NewPage from './new_page.svelte';

	let { text, page } = $props();

	let this_class = $state('mt-8 tracking-[.15em] uppercase');
	if (page % 2 === 1) {
		this_class += ' text-right';
	}
</script>

<div class={this_class}>
	{text}
	{page}
</div>
<NewPage />
