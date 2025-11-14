<script lang="ts">
	let {
		text,
		officiant = false,
		celebrant = false,
		reader = false,
		people = false,
		deacon = false
	} = $props();
	let who = officiant
		? 'Officiant'
		: people
			? 'People'
			: celebrant
				? 'Celebrant'
				: reader
					? 'Reader'
					: deacon
						? 'Deacon'
						: '';
	let textClass = people ? 'font-bold' : '';
</script>

<div class="flex break-after-all gap-4 leading-normal">
	<div class="w-[70px] flex-shrink-0 text-right italic">{who}</div>
	<div class="flex-1 {textClass}">{text}</div>
</div>
