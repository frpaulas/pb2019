<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
</script>

<SectionTitle size="3xl">opening sentences of scripture</SectionTitle>
<SectionTitle>advent</SectionTitle>
<Scripture
	text="Therefore stay awake—for you do not know when the master of
the house will come, in the evening, or at midnight, or when the
rooster crows, or in the morning—lest he come suddenly and
find you asleep."
	ref="mark 13:35-36"
/>
<SectionTitle>christmas</SectionTitle>
<Scripture
	text="Behold, the dwelling place of God is with man. He will dwell
with them, and they will be his people, and God himself will be
with them as their God."
	ref="revelation 21:3"
/>
<SectionTitle>epiphany</SectionTitle>
<Scripture
	text="Nations shall come to your light, and kings to the brightness of
    your rising."
	ref="isaiah 60:3"
/>
<SectionTitle fancyAnd>lent and other penitential occasions</SectionTitle>
<Scripture
	text="If we say we have no sin, we deceive ourselves, and the truth is
not in us. If we confess our sins, he is faithful and
just to forgive us our sins and to cleanse us from
all unrighteousness."
	ref="1 john 1:8-9"
/>
<Scripture
	text="For I acknowledge my faults,
    and my sin is ever before me."
	ref="psalm 51:3"
/>
<Scripture
	text="To the Lord our God belong mercy and forgiveness, for we have
    rebelled against him."
	ref="daniel 9:9"
/>
<PageNumber page={54} text="Daily office" />
