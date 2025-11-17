<script>
	import PageMarker from '$lib/page_helpers/page_marker.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
	import Line from '$lib/page_helpers/line.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import ComfortableWords from '$lib/text_component/comfortable_words.svelte';
	import Offertory from '$lib/text_component/offertory.svelte';
	import ThePeace from '$lib/text_component/the_peace.svelte';
	import Sanctus from '$lib/text_component/sanctus.svelte';
	import SursumCorda from '$lib/text_component/sursum_corda.svelte';
	import LordsPrayer from '$lib/text_component/lords_prayer.svelte';
	import KeepTheFeast from '$lib/text_component/keep_the_feast.svelte';
	import OrThis from '$lib/text_component/or_this.svelte';
	import HumbleAccess from '$lib/prayers/humble_access.svelte';
</script>

<!-- Content from page 131 -->
<ComfortableWords from={3} />
<ThePeace />
<Offertory />
<PageMarker page={131} text="holy eucharist | Renewed ancient text" />

<!-- Content from page 132 -->
<SursumCorda />
<Sanctus />
<SectionTitle>The prayer of consecration</SectionTitle>
<Rubric>The People stand or kneel. The Celebrant continues</Rubric>
<p class="mb-4">
	Holy and gracious Father: In your infinite love you made us for yourself; and when we had sinned
	against you and become<PageMarker page={132} text="the holy eucharist" />subject to evil and
	death, you, in your mercy, sent your only Son Jesus Christ into the world for our salvation. By
	the Holy Spirit and the Virgin Mary he became flesh and dwelt among us. In obedience to your will,
	he stretched out his arms upon the Cross and offered himself once for all, that by his suffering
	and death we might be saved. By his resurrection he broke the bonds of death, trampling Hell and
	Satan under his feet. As our great high priest, he ascended to your right hand in glory, that we
	might come with confidence before the throne of grace.
</p>
<Rubric>At the following words concerning the bread, the Celebrant is to hold it, or lay
a hand upon it, and here* may break the bread; and at the words concerning the
cup, to hold or place a hand upon the cup and any other vessel containing the wine
to be consecrated.</Rubric>
<TextBlock>On the night that he was betrayed, our Lord Jesus Christ took
bread; and when he had given thanks, he broke it,* and gave
it to his disciples, saying, &quot;Take, eat; this is my Body, which is
given for you: Do this in remembrance of me.&quot;</TextBlock>
<TextBlock>Likewise, after supper, Jesus took the cup, and when he had
given thanks, he gave it to them, saying, &quot;Drink this, all of you;
for this is my Blood of the New Covenant, which is shed for
you, and for many, for the forgiveness of sins: Whenever you
drink it, do this in remembrance of me.&quot;</TextBlock>
<Line text="Therefore we proclaim the mystery of faith:" />
<Rubric>Celebrant and People</Rubric>
<Line indent bold text="Christ has died." />
<Line indent bold text="Christ is risen." />
<Line indent bold text="Christ will come again." />
<TextBlock>We celebrate the memorial of our redemption, O Father, in this
sacrifice of praise and thanksgiving, and we offer you these gifts.</TextBlock>
<PageMarker page={133} text="holy eucharist | Renewed ancient text" />

<!-- Content from page 134 -->
<TextBlock>Sanctify them by your Word and Holy Spirit to be for your
people the Body and Blood of your Son Jesus Christ. Sanctify
us also, that we may worthily receive this holy Sacrament, and
be made one body with him, that he may dwell in us and we in
him. In the fullness of time, put all things in subjection under
your Christ, and bring us with all your saints into the joy of your
heavenly kingdom, where we shall see our Lord face to face.</TextBlock>
<TextBlock>All this we ask through your Son Jesus Christ: By him, and with
him, and in him, in the unity of the Holy Spirit, all honor and
glory is yours, Almighty Father, now and for ever. Amen.</TextBlock>
<SectionTitle>the lord's prayer</SectionTitle>
<Rubric>The Celebrant then says</Rubric>
<Line text="And now as our Savior Christ has taught us, we are bold to pray:" />
<Rubric>Celebrant and People together pray</Rubric>
<LordsPrayer />
<PageMarker page={134} text="the holy eucharist" />

<!-- Content from page 135 -->
<SectionTitle>the fraction</SectionTitle>
<Rubric>If the consecrated Bread was not broken earlier, the Celebrant breaks it now.</Rubric>
<Rubric>A period of silence is kept.</Rubric>
<Rubric>Then may be sung or said</Rubric>
<Versical celebrant text="[Alleluia.] Christ our Passover is sacrificed for us." />
<KeepTheFeast />
<OrThis />
<Versical
	celebrant
	text="[Alleluia.] Christ our Passover Lamb has been sacrificed, once for all upon the Cross."
/>
<KeepTheFeast />
<Rubric>In Lent, Alleluia is omitted, and may be omitted at other times except during Easter Season.</Rubric>
<HumbleAccess />
<PageMarker page={135} text="holy eucharist | Renewed ancient text" />
