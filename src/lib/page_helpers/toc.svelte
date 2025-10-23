<script>
	import { base } from '$app/paths';

	let { text, page = 0, indent = false } = $props();

	let button_class =
		'block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer';
</script>

<div class="grid break-after-all grid-cols-[575px_50px] gap-3 uppercase">
	{#if indent}
		<div class="ml-4">{text}</div>
	{:else}
		<div>{text}</div>
	{/if}

	{#if page > 0}
		<a href="{base}/pg/{page}" class={button_class}>
			{page}
		</a>
	{/if}
</div>
