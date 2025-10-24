<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		// Redirect to the infinite scroll page starting at iii
		goto(`${base}/pg/iii`);
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="text-lg">Redirecting to Prayer Book...</div>
</div>
