<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Psalm from '$lib/page_helpers/psalm.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
</script>

<SectionTitle text="day 1 : morning prayer" size="text-base" />
<PsalmNumber n="1" />
<SectionTitle fancy text="Beatus vir qui non abiit" latin_size />

<Psalm
	vs="1"
	ln1="Blessed is the man who has not walked in the counsel of the ungodly,"
	ln2="nor stood in the way of sinners, and has not sat in the seat of the scornful;"
/>
<Psalm
	vs="2"
	ln1="But his delight is in the law of the Lord,"
	ln2="and on his law will he meditate day and night."
/>
<Psalm
	vs="3"
	ln1="And he shall be like a tree planted by the waterside,"
	ln2="that will bring forth his fruit in due season."
/>
<Psalm
	vs="4"
	ln1="His leaf also shall not wither;"
	ln2="and look, whatever he does, it shall prosper."
/>
<Psalm
	vs="5"
	ln1="As for the ungodly, it is not so with them;"
	ln2="but they are like the chaff, which the wind scatters away from the face of the earth."
/>
<Psalm
	vs="6"
	ln1="Therefore the ungodly shall not be able to stand in the judgment,"
	ln2="neither the sinners in the congregation of the righteous."
/>
<Psalm
	vs="7"
	ln1="For the Lord knows the way of the righteous,"
	ln2="but the way of the ungodly shall perish."
/>
<br />
<PsalmNumber n="2" />
<SectionTitle fancy text="Quare fremuerunt gentes?" latin_size />

<Psalm
	vs="1"
	ln1="Why do the nations so furiously rage together?"
	ln2="And why do the peoples devise a vain thing?"
/>
<Psalm
	vs="2"
	ln1="The kings of the earth stand up, and the rulers take counsel together,"
	ln2="against the Lord and against his Anointed:"
/>
<Psalm vs="3" ln1="“Let us break their bonds asunder" ln2="and cast away their cords from us.”" />

<PageNumber page={270} text="The Psalter" />
