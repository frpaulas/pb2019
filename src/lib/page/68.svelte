<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
</script>

<Scripture
	text="to a living hope through the resurrection of Jesus Christ from
    the dead."
	ref="1 Peter 1:3"
/>
<OrThis />
<Scripture
	text="Give thanks to the Father, who has qualified you to share in
the inheritance of the saints in light. He has delivered us from
the domain of darkness and transferred us to the kingdom of
his beloved Son, in whom we have redemption, the forgiveness
of sins."
	ref="colossians 1:12-14"
/>
<OrThis />
<Scripture
	text="If then you have been raised with Christ, seek the things that
are above, where Christ is, seated at the right hand of God. Set
your minds on things that are above, not on things that are on
earth. For you have died, and your life is hidden with Christ in
God. When Christ who is your life appears, then you also will
appear with him in glory."
	ref="colossians 3:1-4"
/>
<Rubric text="A period of silence may follow." />
<Rubric text="A hymn or canticle may be used; the Apostles’ Creed (page 75) may be said." />
<Rubric text="Prayers may be offered for ourselves and others." />
<SectionTitle size="2xl" text="the lord’s prayer" />
<SectionTitle size="2xl" text="the collect" />
<TextBlock
	text="O Lord, our heavenly Father, almighty and everlasting God, you
have brought us safely to the beginning of this day: Defend us
by your mighty power, that we may not fall into sin nor run into
any danger; and that, guided by your Spirit, we may do what is
righteous in your sight; through Jesus Christ our Lord."
	amen
/>

<PageNumber page={68} text="Daily Office" />
