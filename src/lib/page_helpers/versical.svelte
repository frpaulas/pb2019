<script lang="ts">
	let { text, officiant = false, people = true } = $props();
	let who = officiant ? 'Officiant' : people ? 'People' : '';
	let textClass = officiant ? '' : 'font-bold';
</script>

<div class="mt-3 grid break-after-all grid-cols-[70px_600px] gap-4 leading-2">
	<div class="text-right italic">{who}</div>
	<div class={textClass}>{text}</div>
</div>
