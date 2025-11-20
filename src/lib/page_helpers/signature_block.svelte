<script>
	let { signatures = [], date = '', dateRoman = '' } = $props();
</script>

<div class="mt-8 flex break-after-all flex-col gap-3 sm:flex-row sm:gap-6">
	{#each signatures as sig}
		<div>
			<p class="text-center text-lg uppercase">{sig.name}</p>
			<p class="text-center normal-case italic">{sig.title}</p>
			<p class="text-center normal-case italic">{sig.affiliation}</p>
			<p class="text-center normal-case italic">{sig.of}</p>
		</div>
	{/each}
</div>

{#if date}
	<p class="mt-8 text-center text-base italic">{date}</p>
{/if}

{#if dateRoman}
	<p class="text-center text-sm uppercase">{dateRoman}</p>
{/if}
