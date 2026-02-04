<script lang="ts">
	import collectsData from '$lib/data/collects/collects.json';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';

	interface Props {
		office: 'mp' | 'ep';
	}

	let { office }: Props = $props();

	const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// Get current day of week (0 = Sunday)
	const today = new Date().getDay();

	let selectedDay = $state(today);

	function getBlocks(day: number) {
		const key = `${office}_${days[day]}`;
		return (collectsData as Record<string, any[]>)[key] || [];
	}
</script>

<div class="weekly-collects">
	<div class="day-selector">
		{#each dayLabels as label, index}
			<button
				type="button"
				class="day-option"
				class:selected={selectedDay === index}
				onclick={() => {
					selectedDay = index;
				}}
			>
				{label}
			</button>
		{/each}
	</div>

	{#key selectedDay}
		{#each getBlocks(selectedDay) as block}
			{#if block.type === 'section_title'}
				<SectionTitle>{block.text}</SectionTitle>
			{:else if block.type === 'text_block'}
				<TextBlock>{block.text}</TextBlock>
			{/if}
		{/each}
	{/key}
</div>

<style>
	.day-selector {
		display: flex;
		justify-content: center;
		gap: 0.25rem;
		margin: 1rem 0;
	}

	.day-option {
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		background: white;
		color: #374151;
		transition: all 0.15s;
	}

	.day-option:hover {
		background: #f3f4f6;
	}

	.day-option.selected {
		background: #1e40af;
		color: white;
		border-color: #1e40af;
	}

	/* Dark mode */
	:global(.dark) .day-option {
		background: #374151;
		color: #e5e5e5;
		border-color: #4b5563;
	}

	:global(.dark) .day-option:hover {
		background: #4b5563;
	}

	:global(.dark) .day-option.selected {
		background: #1e40af;
		color: white;
		border-color: #1e40af;
	}
</style>
