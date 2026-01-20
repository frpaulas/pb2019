<script lang="ts">
	import { scriptureModal } from '$lib/stores/scriptureModal';

	interface Props {
		reference: string;
		altReference?: string;
		displayText?: string;
	}

	let { reference, altReference, displayText }: Props = $props();

	function handleClick(event: MouseEvent) {
		event.preventDefault();
		scriptureModal.open(reference, altReference || null);
	}

	// Format display text
	let label = $derived(() => {
		if (displayText) return displayText;

		// Build display: "Genesis 1:1-14" or "Genesis 1:1-14 Or Genesis 2:1-5"
		let text = reference;
		if (altReference) {
			text += ` Or ${altReference}`;
		}
		return text;
	});
</script>

<button
	type="button"
	onclick={handleClick}
	class="cursor-pointer rounded text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
	aria-label="View scripture: {reference}"
>
	{label()}
</button>
