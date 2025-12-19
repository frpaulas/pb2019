<script>
	import SectionTitle from '$lib/page_helpers/section_title.svelte';
	import TOC from '$lib/page_helpers/toc.svelte';
	import NewPage from '$lib/page_helpers/new_page.svelte';
</script>

<SectionTitle size="4xl" fancyOf>table of contents</SectionTitle>
<TOC text="preface" page={1} />
<TOC text="concerning the divine service of the church" page={6} />
<SectionTitle size="3xl">daily office</SectionTitle>
<TOC text="morning prayer" page={11} />
<TOC text="midday prayer" page={33} />
<TOC text="evening prayer" page={41} />
<TOC text="compline" page={57} />
<TOC text="family prayer" page={67} />
<TOC text="supplemental canticles for worship" page={79} />
<TOC text="great litany and supplication" page={91} />
<TOC text="decalogue" page={100} />
<SectionTitle size="3xl">holy eucharist</SectionTitle>
<TOC text="holy eucharist: Anglican Standard Text" page={105} />
<TOC text="holy eucharist: Renewed Ancient Text" page={123} />
<TOC text="additional directions" page={139} />
<TOC text="supplemental eucharistic texts" />
<TOC text="seasonal greetings" page={145} indent />
<TOC text="the exhortation" page={147} indent />
<TOC text="offertory sentences" page={149} indent />
<TOC text="proper prefaces" page={152} indent />
<NewPage />
