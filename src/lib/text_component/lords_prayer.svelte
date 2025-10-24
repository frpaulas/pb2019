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
			<Line bold text="Our Father, who art in heaven," />
			<Line bold indent text="hallowed be thy Name,		" />
			<Line bold indent text="thy kingdom come,			" />
			<Line bold indent text="thy will be done, 			" />
			<Line bold indent text="on earth as it is in heaven.		" />
			<Line bold text="Give us this day our daily bread. " />
			<Line bold text="And forgive us our trespasses," />
			<Line bold indent text="as we forgive those 		" />
			<Line bold indent text="who trespass against us.		" />
			<Line bold text="And lead us not into temptation, " />
			<Line bold indent text="but deliver us from evil.		" />
			<Line bold text="For thine is the kingdom," />
			<Line bold indent text="and the power, and the glory," />
			<Line bold indent text="for ever and ever. Amen.		" />
		</div>
	{:else}
		<div>
			<Line bold text="Our Father in heaven," />
			<Line bold indent text="hallowed be your Name," />
			<Line bold indent text="your kingdom come," />
			<Line bold indent text="your will be done," />
			<Line bold indent text="on earth as it is in heaven." />
			<Line bold text="Give us today our daily bread." />
			<Line bold text="And forgive us our sins" />
			<Line bold indent text="as we forgive those" />
			<Line bold indent text="who sin against us." />
			<Line bold text="Save us from the time of trial," />
			<Line bold indent text="and deliver us from evil." />
			<Line bold text="For the kingdom, the power," />
			<Line bold indent text="and the glory are yours," />
			<Line bold indent text="now and for ever. Amen." />
		</div>
	{/if}
</div>
