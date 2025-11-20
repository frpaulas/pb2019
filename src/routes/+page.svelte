<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		goto(`${base}/pg/iii`);
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="text-lg">Redirecting to Prayer Book...</div>
</div>
