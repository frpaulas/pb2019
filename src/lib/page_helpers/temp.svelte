<script>
	import PageNumber from '$lib/page_helpers/page_number.svelte';
	import Psalm from '$lib/page_helpers/psalm.svelte';
	import Rubric from '$lib/page_helpers/rubric.svelte';
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import Versical from '$lib/page_helpers/versical.svelte';
	import Kyrie from '$lib/text_component/kyrie.svelte';
	import WordOfTheLord from '$lib/text_component/word_of_the_lord.svelte';
	import TextBlock from '$lib/page_helpers/text_block.svelte';
</script>

<SectionTitle size="3xl" text="concerning family prayer" />
<PageNumber page={98} text="great litany & decalogue" />
<ShowContent text="Show Collect" getContent={() => 'Collect content goes here'} />
let {(text, page)} = $props(); If highlighting still doesn't work after restart, Zed may need to compile
the Tree-sitter grammar. You might need to run `zed: reload extensions` from the command palette (Ctrl+Shift+P).

"":{
	"name": "",
	"ot": "",
	"psalm": "",
	"epistle": "",
	"gospel": "",
	"color": ""
},
