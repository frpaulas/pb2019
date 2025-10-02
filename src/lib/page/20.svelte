<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Ref from '$lib/page_helpers/ref.svelte';
	import ApostlesCreed from '$lib/text_component/apostles_creed.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<Line bold indent text="In the tender compassion of our God *" />
<Line bold indent text="the dawn from on high shall break upon us," />
<Line bold indent text="To shine on those who dwell in darkness" />
<Line bold indent text="and in the shadow of death, *" />
<Line bold indent text="and to guide our feet into the way of peace." />
<Gloria />
<Ref text="luke 1:68-79" />
<Rubric text="Officiant and People together, all standing" />
<ApostlesCreed />

<PageNumber page={20} text="daily office" />
