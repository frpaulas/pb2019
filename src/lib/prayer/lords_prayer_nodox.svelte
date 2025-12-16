<script>
	import Line from '$lib/page_helpers/line.svelte';

	let showTraditional = $state(true);

	function toggleVersion() {
		showTraditional = !showTraditional;
	}
</script>

<div class="mt-8 break-after-all">
	<button
		onclick={toggleVersion}
		class="mb-4 w-64 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
	>
		{showTraditional ? 'Show Modern Version' : 'Show Traditional Version'}
	</button>

	{#if showTraditional}
		<div>
			<Line bold>Our Father, who art in heaven,</Line>
			<Line bold indent>hallowed be thy Name,</Line>
			<Line bold indent>thy kingdom come,</Line>
			<Line bold indent>thy will be done,</Line>
			<Line bold indent>on earth as it is in heaven.</Line>
			<Line bold>Give us this day our daily bread.</Line>
			<Line bold>And forgive us our trespasses,</Line>
			<Line bold indent>as we forgive those</Line>
			<Line bold indent>who trespass against us.</Line>
			<Line bold>And lead us not into temptation,</Line>
			<Line bold indent>but deliver us from evil.</Line>
		</div>
	{:else}
		<div>
			<Line bold>Our Father in heaven,</Line>
			<Line bold indent>hallowed be your Name,</Line>
			<Line bold indent>your kingdom come,</Line>
			<Line bold indent>your will be done,</Line>
			<Line bold indent>on earth as it is in heaven.</Line>
			<Line bold>Give us today our daily bread.</Line>
			<Line bold>And forgive us our sins</Line>
			<Line bold indent>as we forgive those</Line>
			<Line bold indent>who sin against us.</Line>
			<Line bold>Save us from the time of trial,</Line>
			<Line bold indent>and deliver us from evil.</Line>
		</div>
	{/if}
</div>
