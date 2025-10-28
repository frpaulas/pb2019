<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import PsalmNumber from '$lib/page_helpers/psalm_number.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import ShowPsalm from '$lib/page_helpers/show_psalm.svelte';
	import { getPsalmMeta } from '$lib/db/psalms';

	const psalm76 = getPsalmMeta(76);
</script>

<ShowPsalm ps={75} from={3} />

<PsalmNumber n={psalm76.number} />
<SectionTitle fancy text={psalm76.name} latin_size />
<ShowPsalm ps={76} to={3} />

<PageNumber page={365} text="Day 15: Morning Prayer | Psalm 76 |" />
