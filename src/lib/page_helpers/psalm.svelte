<script lang="ts">
	let { ln1, ln2, vs = '', bold = false } = $props();
	let this_font = bold ? 'font-bold ' : '';
</script>

<div class="flex">
	<span class="inline-block w-8 flex-shrink-0 text-xs font-normal">{vs}</span>
	<div class="flex-1">
		<p class={this_font}>
			{ln1}
			<span class="relative -top-1 text-xs">*</span>
		</p>
		<p class={this_font + 'pl-4'}>{ln2}</p>
	</div>
</div>
