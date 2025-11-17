<script>
	import Line from '$lib/page_helpers/line.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	let { rat = false, ast = false, pg = 0 } = $props();
	let which_prayer =
		'Celebrant and People together say the following, or the Post Communion Prayer in the ' + ast
			? 'Anglican Standard Text'
			: 'Renewed Ancient Text';
</script>

{#if pg !== 121}
	<SectionTitle>the post communion prayer</SectionTitle>
	<Rubric>After Communion, the Celebrant says</Rubric>
	<Line>Let us pray.</Line>
{/if}
<Rubric>{which_prayer}</Rubric>
{#if ast && pg === 121}
	<Line bold>Almighty and everliving God,</Line>
	<Line bold>we thank you for feeding us, in these holy mysteries,</Line>
	<Line indent bold>with the spiritual food of the most precious Body and Blood</Line>
	<Line indent bold>of your Son our Savior Jesus Christ;</Line>
	<Line bold>and for assuring us, through this Sacrament, of your favor and</Line>
	<Line indent bold>goodness towards us:</Line>
	<Line indent bold>that we are true members of the mystical body of your Son,</Line>
	<Line indent bold>the blessed company of all faithful people;</Line>
	<Line indent bold>and are also heirs, through hope,</Line>
	<Line indent bold>of your everlasting kingdom.</Line>
	<Line bold>And we humbly ask you, heavenly Father,</Line>
	<Line indent bold>to assist us with your grace,</Line>
	<Line indent bold>that we may continue in that holy fellowship,</Line>
	<Line indent bold>and do all the good works that you have prepared for us to</Line>
	<Line indent bold>walk in;</Line>
	<Line bold>through Jesus Christ our Lord,</Line>
	<Line indent bold>to whom, with you and the Holy Spirit,</Line>
	<Line indent bold>be all honor and glory, now and for ever. Amen.</Line>
{/if}
{#if rat}
	<Line bold>Heavenly Father,</Line>
	<Line bold>We thank you for feeding us with the spiritual food</Line>
	<Line indent bold>of the most precious Body and Blood</Line>
	<Line indent bold>of your Son our Savior Jesus Christ;</Line>
	<Line indent bold>and for assuring us in these holy mysteries</Line>
	<Line indent bold>that we are living members of the body of your Son,</Line>
	<Line indent bold>and heirs of your eternal Kingdom.</Line>
	<Line bold>And now, Father, send us out to do the work you have</Line>
	<Line indent bold>given us to do,</Line>
	<Line indent bold>to love and serve you as faithful witnesses of Christ our Lord.</Line>
	<Line bold>To him, to you, and to the Holy Spirit,</Line>
	<Line indent bold>be honor and glory, now and for ever. Amen.</Line>
{/if}

{#if pg !== 120}
	<Rubric>The Bishop when present, or the Priest, gives this or an alternate blessing</Rubric>
	<TextBlock
		>The peace of God, which passes all understanding, keep your hearts and minds in the knowledge
		and love of God, and of his Son Jesus Christ our Lord; and the blessing of God Almighty, the
		Father, the Son, and the Holy Spirit, be among you, and remain with you always. **Amen.**</TextBlock
	>
	<Rubric
		>A hymn, psalm, or anthem may be sung after the Blessing (or following the Dismissal).</Rubric
	>
{/if}
