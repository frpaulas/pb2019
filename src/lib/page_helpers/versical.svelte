<script lang="ts">
	let { text, officiant = false, people = true } = $props();
	let who = officiant ? 'Officiant' : people ? 'People' : '';
	let textClass = officiant ? '' : 'font-bold';
</script>

<div class="mt-3 flex break-after-all gap-4 leading-relaxed">
	<div class="w-[70px] flex-shrink-0 text-right italic">{who}</div>
	<div class="flex-1 {textClass}">{text}</div>
</div>
