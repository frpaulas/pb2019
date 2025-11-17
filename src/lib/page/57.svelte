<script>
	import Line from '$lib/page_helpers/line.svelte';
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
</script>

<SectionTitle size="3xl">compline</SectionTitle>
<Rubric>The Officiant begins</Rubric>

<Line amen>The Lord Almighty grant us a peaceful</Line>
<Line indent amen>and a perfect end.</Line>
Officiant People
<Versical officiant text="Our help is in the Name of the Lord;" />
<Versical people text="The maker of heaven and earth." />
<Rubric>The Officiant continues</Rubric>
<Line>Let us humbly confess our sins to Almighty God.</Line>
<Rubric>Silence may be kept. The Officiant and People then say</Rubric>
<Line bold>Almighty God and Father, we confess to you,</Line>
<Line bold>to one another, and to the whole company of heaven,</Line>
<Line bold indent>that we have sinned, through our own fault,</Line>
<Line bold indent>in thought, and word, and deed,</Line>
<Line bold indent>and in what we have left undone.</Line>
<Line bold>For the sake of your Son our Lord Jesus Christ,</Line>
<Line bold indent>have mercy upon us, forgive us our sins,</Line>
<Line bold indent>and by the power of your Holy Spirit</Line>
<Line bold indent>raise us up to serve you in newness of life,</Line>
<Line bold indent>to the glory of your Name. Amen.</Line>
/>
<PageNumber page={57} text="Compline" />
