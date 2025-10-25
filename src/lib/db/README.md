# Psalm Database

This directory contains the read-only psalm database and related utilities.

## Files

- **`psalms.json`** - The main database file containing all psalm text
- **`psalms.ts`** - TypeScript interface and getter functions

## Database Structure

The database is stored as JSON with the following structure:

```json
{
  "1": {
    "number": 1,
    "name": "Beatus vir qui non abiit",
    "title": "psalm 1",
    "verses": [
      {
        "vs": 1,
        "ln1": "First line text",
        "ln2": "Second line text",
        "hebrew": ""
      }
    ]
  }
}
```

## Usage in Svelte Components

### Import the functions

```typescript
import { psalm, getPsalmMeta, getPsalm, getVerse } from '$lib/db/psalms';
```

### Get psalm metadata and verses

```typescript
// Get metadata (number, name, title)
const psalmMeta = getPsalmMeta(1);

// Get specific verse range
const verses = psalm(1, 1, 7);  // Psalm 1, verses 1-7

// Get all verses
const fullPsalm = getPsalm(1);

// Get single verse
const verse = getVerse(1, 5);  // Psalm 1, verse 5
```

### Example in a Svelte component

```svelte
<script>
  import Psalm from '$lib/page_helpers/psalm.svelte';
  import { psalm, getPsalmMeta } from '$lib/db/psalms';

  const meta = getPsalmMeta(23);
  const verses = psalm(23, 1, 6);
</script>

<h2>{meta.name}</h2>

{#each verses as verse}
  <Psalm vs={verse.vs.toString()} ln1={verse.ln1} ln2={verse.ln2} />
{/each}
```

## API Reference

### `psalm(psalmNumber, vs_from, vs_to): Verse[]`

Get verses from a psalm within a specific range.

**Parameters:**
- `psalmNumber` (number) - The psalm number (e.g., 1, 23, 119)
- `vs_from` (number) - Starting verse number (inclusive)
- `vs_to` (number) - Ending verse number (inclusive)

**Returns:** Array of verses in the specified range

**Throws:** Error if psalm not found

---

### `getPsalm(psalmNumber): Psalm`

Get complete psalm data including all verses.

**Parameters:**
- `psalmNumber` (number) - The psalm number

**Returns:** Complete psalm object with metadata and all verses

**Throws:** Error if psalm not found

---

### `getPsalmMeta(psalmNumber): {number, name, title}`

Get psalm metadata without verses.

**Parameters:**
- `psalmNumber` (number) - The psalm number

**Returns:** Object with `number`, `name`, and `title`

**Throws:** Error if psalm not found

---

### `getVerse(psalmNumber, verseNumber): Verse`

Get a single verse from a psalm.

**Parameters:**
- `psalmNumber` (number) - The psalm number
- `verseNumber` (number) - The verse number

**Returns:** Single verse object

**Throws:** Error if psalm or verse not found

---

### `listPsalms(): number[]`

List all available psalm numbers.

**Returns:** Sorted array of psalm numbers

## Adding New Psalms

### Method 1: Interactive Script

Use the interactive script to add psalms:

```bash
node scripts/add-psalm.cjs
```

Follow the prompts to enter:
1. Psalm number
2. Name (Latin title)
3. Title (e.g., "psalm 23")
4. Verses (format: `verse_number|line1|line2|hebrew`)

Type `done` when finished adding verses.

### Method 2: Import from Text File

If you have psalm text in a structured format:

```bash
# Format: alternating verse numbers and text lines
# verse_number
# line1
# line2
# verse_number
# line1
# line2
# ...

node scripts/import-psalm-from-text.cjs 10 "Ut quid, Domine?" "psalm 10" < psalm10.txt
```

### Method 3: Manual JSON Editing

You can directly edit `psalms.json` following the structure above.

## Testing

Run the database validator:

```bash
node scripts/test-psalm-db.cjs
```

This will verify:
- Database loads correctly
- All psalms have required fields
- All verses have correct structure
- No data corruption

## Current Database

As of now, the database contains Psalms 1-9 extracted from pages 270-277.
