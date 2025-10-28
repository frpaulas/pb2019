<script lang="ts">
	import SectionTitle from './section_title.svelte';
	import { getVerse } from '$lib/db/psalms';

	interface Props {
		vs: number;
	}

	let { vs }: Props = $props();

	// Get the verse from Psalm 119 to extract latin and hebrew
	let verse = $derived.by(() => {
		try {
			return getVerse(119, vs);
		} catch {
			return null;
		}
	});

	let latin = $derived(verse?.latin || '');
	let hebrew = $derived(verse?.hebrew || '');
</script>

{#if latin}
	<div class="text-xs">
		<SectionTitle fancy text={latin} latin_size />
	</div>
{/if}

{#if hebrew}
	<div class="text-xs">
		<SectionTitle text={hebrew} />
	</div>
{/if}
