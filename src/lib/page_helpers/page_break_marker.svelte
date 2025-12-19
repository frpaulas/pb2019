<script lang="ts">
	/**
	 * PageBreakMarker - Non-disruptive page break indicator
	 *
	 * Used to mark page breaks in the Prayer Book content without
	 * interrupting the reading flow. Tracks position for infinite scroll
	 * and optionally displays page number in margin.
	 */

	interface Props {
		page: number | string;
		showMarker?: boolean; // Whether to show visible page number
	}

	let { page, showMarker = true }: Props = $props();
</script>

<!--
  This element is tracked by IntersectionObserver in InfiniteScroll.svelte
  When it becomes visible, the currentVisiblePage store is updated
-->
<div
	class="page-break-marker"
	data-page-break={page}
	role="presentation"
	aria-hidden="true"
>
	{#if showMarker}
		<span class="page-number">
			p. {page}
		</span>
	{/if}
</div>

<style>
	.page-break-marker {
		position: relative;
		height: 0;
		margin: 0;
		padding: 0;
	}

	.page-number {
		position: absolute;
		right: 100%;
		margin-right: 0.5rem;
		color: #9ca3af; /* gray-400 */
		font-size: 0.75rem; /* text-xs */
		line-height: 1;
		white-space: nowrap;
		user-select: none;
		pointer-events: none;
	}

	/* On narrow screens, show page number inline instead of margin */
	@media (max-width: 640px) {
		.page-break-marker {
			height: auto;
			margin: 0.5rem 0;
		}

		.page-number {
			position: static;
			margin: 0;
			display: block;
			text-align: center;
		}
	}
</style>
