# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prayer Book 2019 (PB2019) is a digital liturgical reference application built with SvelteKit. It renders the entire Book of Common Prayer 2019 (806 pages) with support for infinite scroll navigation, personalized liturgical contexts, and calendar-aware content.

## Common Commands

### Development
```bash
npm run dev              # Start development server (Vite)
npm run dev -- --open    # Start dev server and open browser
npm run build            # Build production version
npm run preview          # Preview production build
```

### Desktop App (Tauri)
```bash
npm run tauri:dev        # Start Tauri desktop app in dev mode
npm run tauri:build      # Build production desktop app
```

### Code Quality
```bash
npm run check            # Run svelte-check for type checking
npm run lint             # Run ESLint and Prettier checks
npm run format           # Auto-format code with Prettier
npm test                 # Run all tests
npm run test:unit        # Run unit tests in watch mode
```

### DPB File Processing
```bash
npm run lint:dpb                                              # Validate all DPB files
node scripts/lint-dpb.cjs src/lib/data/services/dpb/file.dpb  # Lint specific DPB file

# Convert DPB to JSON (run after editing .dpb files)
for file in src/lib/data/services/dpb/*.dpb; do
  node scripts/convert-raw-to-json.cjs "$file"
done

node scripts/build-service-pages.cjs                          # Build service page index
npm run rebuild:check                                         # Find outdated JSON files
```

### Psalm Database
```bash
node scripts/add-psalm.cjs                    # Interactive psalm entry
node scripts/bulk-import-psalms.cjs           # Batch import psalms
node scripts/test-psalm-db.cjs                # Validate psalm database
```

## Architecture Overview

### Rendering Pipeline: DPB → JSON → Svelte

The application uses a three-tier content pipeline:

**1. DPB Files (Source)** - `src/lib/data/services/dpb/*.dpb`
- Custom text format for liturgical content
- Human-editable source of truth
- Commands: `pg:`, `tp:`, `st:`, `tb:`, `r:`, `v:`, `ref:`, `button:`, etc.
- See `src/lib/data/services/dpb/key.txt` for complete format specification

**2. JSON Data (Build Output)**
- **`service_pages.json`** - Maps page numbers to renderable content blocks
- **`psalm_pages.json`** - Maps page numbers to psalm metadata and verses
- Pre-built during DPB conversion for fast runtime performance

**3. Svelte Renderers**
- **`ServicePageRenderer.svelte`** - Renders 50+ block types from `service_pages.json`
- **`PsalmPageRenderer.svelte`** - Renders psalms from `psalm_pages.json`
- Dynamic component imports for collects, canticles, occasional prayers

### Infinite Scroll System

**Core Component:** `InfiniteScroll.svelte`
- Bidirectional loading (loads next/previous pages)
- Page order defined in `PAGE_ORDER` array (661 pages: Roman numerals iii-vii, then 2-782)
- Scroll position preservation when loading previous pages
- IntersectionObserver tracks visible pages with 5 thresholds [0, 0.25, 0.5, 0.75, 1.0]
- Updates `currentVisiblePage` store in real-time without URL changes

**Deduplication:**
- `page_content_map.ts` - Handles consolidated pages (e.g., pages 131-135 rendered by single component)
- Prevents duplicate loads for page ranges

### State Management

**Stores** (`src/lib/stores/`)

1. **`currentPage.js`** - Tracks currently visible page number
   ```typescript
   export const currentVisiblePage = writable('iii');
   ```

2. **`liturgical.ts`** - Liturgical context with localStorage persistence
   ```typescript
   {
     actualDateTime: Date,
     selectedDate: Date,
     season: LiturgicalSeason,
     colors: LiturgicalColor[],
     liturgicalContext: {
       subject?: { gender, number, name, firstName, lastName },
       subject2?: ...,
       candidates?: [...],
       _metadata: { setAt, expiresAt, serviceSlug }
     }
   }
   ```
   - Persists to localStorage
   - Auto-expires at midnight
   - Gender-aware (masculine/feminine/neutral)
   - Number-aware (singular/plural)
   - Scoped by service

### Template Resolution

**Dynamic Text Substitution** (`src/lib/utils/templateResolver.ts`)

- Gender variants: `__brother|sister|sibling__`
- Number variants: `__singular|plural__`
- Pronouns: `__he|she|they__`, `__him|her|them__`, `__his|her|their__`, `__himself|herself|themselves__`
- Name placeholders: `N.`, `N.N.`
- Resolved at render time based on `liturgicalContext` store

**Markdown Parsing** (`src/lib/utils/parseMarkdown.ts`)
- Bold: `**text**`
- Italic: `_italic_`
- Lowercase: `~text~` (renders as lowercase, used for rubrics)
- Preserves whitespace and line breaks

### Routing Structure

```
/                           → Redirects to /pg/iii
/pg/[page_number]           → Main page viewer (infinite scroll)
/calendar                   → Liturgical calendar view
/psalter                    → Grid-based psalm selector (150 psalms)
/toc                        → Table of contents
/readings/[month]/[day]     → Daily scripture readings
```

### Calendar System

**Liturgical Calendar** (`src/lib/calendar/`)
- **Red Letter Days**: 250+ feast days in `rld_eucharist.json`
- **Sunday Lectionary**: Year A/B/C cycle with 29 Propers
- **Daily Lectionary**: OT/Psalm/Epistle/Gospel for each day
- **Psalm Cycle**: 30-day and 60-day cycles for daily office
- **Easter Calculation**: Complex lunar-based algorithm

**Key Files:**
- `rlds.ts`, `rld_eucharist.json` - Feast days
- `sunday_lectionary.json` - Sunday readings
- `daily_lectionary.json` - Daily readings
- `psalm_cycle.ts`, `psalm_cycle_60.json` - Psalm assignments

### Component Organization

**Page Helpers** (`src/lib/page_helpers/`)
- Reusable rendering components: `rubric.svelte`, `versical.svelte`, `text_block.svelte`, etc.

**Text Components** (`src/lib/text_component/`)
- Static liturgical text: creeds, prayers
- 150+ collect SVG components
- 125+ occasional prayer SVG components
- 20+ canticle SVG components

**Occasional Prayers** (`src/lib/occasional_prayer/`)
- 125+ numbered prayer components (1.svelte, 2.svelte, ..., 125.svelte)

## Development Workflow

### Adding/Editing a Service

1. **Edit DPB file** in `src/lib/data/services/dpb/`
   - Follow format in `key.txt`
   - Use multiline continuation with indentation

2. **Lint for errors**
   ```bash
   npm run lint:dpb
   # or for specific file:
   node scripts/lint-dpb.cjs src/lib/data/services/dpb/your_file.dpb
   ```

3. **Convert to JSON**
   ```bash
   node scripts/convert-raw-to-json.cjs src/lib/data/services/dpb/your_file.dpb
   ```

4. **Rebuild service pages**
   ```bash
   node scripts/build-service-pages.cjs
   ```

### Working with Psalms

**Database:** `src/lib/db/psalms.json` (read-only)

**API** (`src/lib/db/psalms.ts`):
```typescript
import { psalm, getPsalmMeta, getPsalm, getVerse } from '$lib/db/psalms';

// Get specific verse range
const verses = psalm(23, 1, 6);  // Psalm 23, verses 1-6

// Get metadata only
const meta = getPsalmMeta(23);  // { number, name, title }

// Get all verses
const fullPsalm = getPsalm(23);

// Get single verse
const verse = getVerse(23, 5);
```

**Adding Psalms:**
```bash
node scripts/add-psalm.cjs                              # Interactive entry
node scripts/bulk-import-psalms.cjs                     # Batch import
node scripts/test-psalm-db.cjs                          # Validate database
```

### Testing

**Unit Tests:** Vitest with Svelte component support
```bash
npm test                                                # Run all tests
npm run test:unit                                       # Watch mode
npm test -- templateResolver.test.ts                    # Specific test file
```

**Type Checking:**
```bash
npm run check                                           # svelte-check
npm run check:watch                                     # Watch mode
```

## Important Patterns

### Page Loading Priority

When rendering a page, the system checks in this order:

1. `psalm_pages.json` - Is this a psalm page (270+)?
2. `service_pages.json` - Is this in pre-built service pages?
3. Dynamic import from `src/lib/page/[page_number].svelte` - Legacy fallback

### Content Block Types

`ServicePageRenderer.svelte` supports 50+ block types:
- **Structural**: `section_title`, `page_break`, `ordered_list`, `unordered_list`
- **Text**: `text_block`, `line`, `rubric`, `footnote`
- **Liturgical**: `versical`, `antiphon`, `canticle`, `collect`, `occasional_prayer`
- **References**: `reference`, `scripture`
- **Interactive**: `button`
- **Special**: `lords_prayer`, `decalogue`, `calendar`, `lectionary`, `holy_days`

### Liturgical Context Usage

When rendering personalized content:

1. **Set context** (usually in service +page.svelte):
   ```typescript
   import { setLiturgicalContext } from '$lib/stores/liturgical';

   setLiturgicalContext({
     subject: {
       gender: 'masculine',
       number: 'singular',
       firstName: 'John',
       lastName: 'Doe'
     }
   });
   ```

2. **Templates auto-resolve** during rendering:
   - `__brother|sister|sibling__` → "brother"
   - `N.` → "John"
   - `__he|she|they__` → "he"

3. **Context expires** at midnight (automatic cleanup)

### Page Number Handling

- **Roman numerals** (iii-vii) map to negative numbers (-4 to 0)
- **Arabic numerals** start at 2 (page 1 doesn't exist in BCP 2019)
- **Gaps exist** (pages 10-13, 57, 61, etc. are intentionally missing)
- **PAGE_ORDER** array defines canonical order (661 total pages)

### Script Dependencies

When modifying DPB files, always run in this order:
1. Edit `.dpb` file
2. `npm run lint:dpb` (validate syntax)
3. `node scripts/convert-raw-to-json.cjs` (DPB → JSON)
4. `node scripts/build-service-pages.cjs` (build page index)

## Technology Stack

- **Framework**: SvelteKit 2.22 (adapter-static for SPA)
- **Styling**: Tailwind CSS 4.0 + Typography plugin
- **Desktop**: Tauri 2.9 (Rust-based native wrapper)
- **Build**: Vite 7
- **Testing**: Vitest 3.2 + Vitest Browser (Playwright)
- **Type Checking**: TypeScript 5.0 + svelte-check
- **Code Quality**: ESLint 9, Prettier 3.4

## Key Files Reference

### Configuration
- `svelte.config.js` - SvelteKit config (adapter-static)
- `vite.config.ts` - Vite config with devtools-json plugin
- `tsconfig.json` - TypeScript config
- `src-tauri/tauri.conf.json` - Tauri desktop app config

### Core Components
- `src/routes/+layout.svelte` - App shell with Header
- `src/routes/pg/[page_number]/+page.svelte` - Page viewer with InfiniteScroll
- `src/lib/components/InfiniteScroll.svelte` - Main infinite scroll logic
- `src/lib/components/ServicePageRenderer.svelte` - Service content renderer
- `src/lib/components/PsalmPageRenderer.svelte` - Psalm renderer

### Data Files
- `src/lib/data/services/service_pages.json` - Page content index (944KB)
- `src/lib/data/services/psalm_pages.json` - Psalm page index (52KB)
- `src/lib/db/psalms.json` - Psalm database (469KB)
- `src/lib/calendar/rld_eucharist.json` - Feast days and readings

### Utilities
- `src/lib/utils/templateResolver.ts` - Gender/number/name substitution
- `src/lib/utils/parseMarkdown.ts` - Markdown parsing
- `src/lib/utils/page_content_map.ts` - Page deduplication
- `src/lib/stores/liturgical.ts` - Liturgical state management
