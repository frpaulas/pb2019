<script>
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import 'tailwindcss';
	import { page } from '$app/stores';
	let to_do_page = $state($page.params.to_do_page);
</script>

<div class="pt-8 pb-8">
	<SectionTitle text="{to_do_page} Yet To Be Implemented" />
</div>
