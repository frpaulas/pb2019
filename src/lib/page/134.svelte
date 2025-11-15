<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
</script>

<TextBlock
	text="Sanctify them by your Word and Holy Spirit to be for your
people the Body and Blood of your Son Jesus Christ. Sanctify
us also, that we may worthily receive this holy Sacrament, and
be made one body with him, that he may dwell in us and we in
him. In the fullness of time, put all things in subjection under
your Christ, and bring us with all your saints into the joy of your
heavenly kingdom, where we shall see our Lord face to face."
/>
<TextBlock
	text="All this we ask through your Son Jesus Christ: By him, and with
him, and in him, in the unity of the Holy Spirit, all honor and
glory is yours, Almighty Father, now and for ever. Amen."
/>
<SectionTitle text="the lord’s prayer" />
<Rubric text="The Celebrant then says" />
<Line text="And now as our Savior Christ has taught us, we are bold to pray:" />
<Rubric text="Celebrant and People together pray" />
<LordsPrayer />

<PageNumber page={134} text="the holy eucharist" />
