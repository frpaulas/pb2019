<script lang="ts">
	let { text, officiant = false, celebrant = false, people = true } = $props();
	let who = officiant ? 'Officiant' : people ? 'People' : celebrant ? 'Celebrant' : '';
	let textClass = people ? 'font-bold' : '';
</script>

<div class="mt-3 flex break-after-all gap-4 leading-normal">
	<div class="w-[70px] flex-shrink-0 text-right italic">{who}</div>
	<div class="flex-1 {textClass}">{text}</div>
</div>
