<script lang="ts">
	/**
	 * Vertical margin component
	 * Adds vertical spacing between content blocks
	 */
	let { spacing = 1 }: { spacing?: number } = $props();
</script>

<div class="vertical-margin" style="height: {spacing}rem;"></div>
