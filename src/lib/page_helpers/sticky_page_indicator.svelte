<script>
	import { currentVisiblePage } from '$lib/stores/currentPage.js';
</script>

<div class="sticky-page-indicator">
	<span class="page-number">
		p. {$currentVisiblePage}
	</span>
</div>

<style>
	.sticky-page-indicator {
		position: fixed;
		left: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		pointer-events: none;
		user-select: none;
	}

	.page-number {
		color: #9ca3af; /* gray-400 */
		font-size: 0.875rem; /* text-sm */
		line-height: 1;
		white-space: nowrap;
		opacity: 0.6;
	}

	/* Hide on narrow screens to avoid overlap */
	@media (max-width: 640px) {
		.sticky-page-indicator {
			display: none;
		}
	}
</style>
