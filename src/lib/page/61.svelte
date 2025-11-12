<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Psalm from '$lib/page_helpers/psalm.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import Scripture from '$lib/page_helpers/scripture.svelte';
	import Gloria from '$lib/text_component/gloria.svelte';
</script>

<Psalm
	vs="7"
	ln1="You have put gladness in my heart, *"
	ln2="more than when others’ grain and wine and oil increased."
/>
2 3 4
<Psalm
	vs="2"
	ln1="You that stand by night in the house of the Lord, *"
	ln2="even in the courts of the house of our God."
/>
<Psalm vs="3" ln1="Lift up your hands in the sanctuary *" ln2="and sing praises unto the Lord." />
<Psalm vs="4" ln1="The Lord who made heaven and earth *" ln2="give you blessing out of Zion." />
<Rubric text="At the end of the Psalms the Gloria Patri (Glory be...) is sung or said" />
<Gloria />
<Rubric text="One of the following, or some other suitable passage of Scripture, is read" />
<Scripture
	text="You, O Lord, are in the midst of us, and we are called by your name; do not leave
    us."
	ref="jeremiah 14:9"
/>
<Scripture
	text="Come to me, all who labor and are heavy laden, and I will give you rest. Take my yoke
upon you, and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls.
For my yoke is easy, and my burden is light."
	ref="matthew 11:28‑30"
/>
<Scripture
	text="Now may the God of peace who brought again
from the dead our Lord Jesus, the great shepherd of the sheep, by the blood of the eternal covenant,
equip you with everything good that you may do his will, working in us that which is pleasing in his
sight, through Jesus Christ, to whom be glory forever and ever. Amen."
	ref="hebrews 13:20-21"
/>
<Scripture
	text="Be sober-minded; be watchful.
    Your adversary the devil prowls around like a roaring lion, seeking someone to devour. Resist
him, firm in your faith."
	ref="1 peter 5:8‑9"
/>
<PageNumber page={61} text="Compline" />
