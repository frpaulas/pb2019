<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	function getOfficePageByTime() {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const timeValue = hours * 100 + minutes; // e.g., 14:30 = 1430

		if (timeValue < 1130) {
			return '11'; // Morning Prayer
		} else if (timeValue < 1500) {
			return '33'; // Midday Prayer
		} else if (timeValue < 2000) {
			return '41'; // Evening Prayer
		} else {
			return '57'; // Compline
		}
	}

	onMount(() => {
		const page = getOfficePageByTime();
		goto(`${base}/pg/${page}`);
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="text-lg">Redirecting to Daily Office...</div>
</div>
