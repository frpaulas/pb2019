<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import ApostlesCreed from '$lib/text_component/apostles_creed.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<Line bold>In the tender compassion of our God *</Line>
<Line bold indent>the dawn from on high shall break upon us,</Line>
<Line bold>To shine on those who dwell in darkness</Line>
<Line bold indent>and in the shadow of death, *</Line>
<Line bold indent>and to guide our feet into the way of peace.</Line>
<Gloria />
<Ref text="luke 1:68-79" />
<Rubric>Officiant and People together, all standing</Rubric>
<ApostlesCreed />

<PageNumber page={20} text="daily office" />
