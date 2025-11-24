# Service File Processing Scripts

This directory contains tools for working with service files in the Prayer Book 2019 project.

## DPB Source Format → JSON Workflow

Instead of manually writing JSON files (which is error-prone and tedious), you can write service files in the simpler DPB source format (`.dpb` files) and automatically convert them to JSON.

### Benefits of This Workflow

1. **Faster authoring** - Raw format is much quicker to type
2. **Fewer errors** - No missing commas, brackets, or quotes
3. **Easier to maintain** - Cleaner, more readable source files
4. **Automated conversion** - No manual transcription errors

## Available Scripts

### 1. `validate-raw-format.cjs`

Validates DPB source format files for syntax errors.

**Usage:**
```bash
# Validate a single file
node scripts/validate-raw-format.cjs src/lib/data/services/source/baptism.dpb

# Validate all files in a directory
node scripts/validate-raw-format.cjs src/lib/data/services/source/

# Or use the npm script
npm run validate:source
```

**What it checks:**
- Valid line types (pg, tp, st, tb, r, ref, v, pb, l, button)
- Proper colon syntax
- Valid modifiers (b, o, i)
- Type-specific format rules
- Missing content

**Exit codes:**
- `0` - All files valid
- `1` - Validation errors found

### 2. `convert-raw-to-json.cjs`

Converts DPB source format files to JSON.

**Usage:**
```bash
# Convert a single file
node scripts/convert-raw-to-json.cjs src/lib/data/services/source/baptism.dpb

# Specify output location
node scripts/convert-raw-to-json.cjs src/lib/data/services/source/baptism.dpb src/lib/data/services/baptism.json

# Convert all files in a directory
node scripts/convert-raw-to-json.cjs src/lib/data/services/source/

# Or use the npm script
npm run convert:source
```

**Output:**
- Creates JSON files in the parent directory of the raw files
- Preserves formatting and metadata
- Automatically generates slugs from titles

## Automatic Page Link Detection

The converter automatically detects page references in `tb:` and `r:` content and converts them to clickable page links.

**Pattern:** `on page n` or `on pages n-m`

**Example raw format:**
```
r: The Celebrant may begin with sentences on page 140 or use seasonal greetings on pages 145-146.
```

**Converts to:**
```json
{
  "type": "rubric",
  "content": [
    {"type": "text", "value": "The Celebrant may begin with sentences "},
    {"type": "page_link", "page": 140, "text": "140"},
    {"type": "text", "value": " or use seasonal greetings "},
    {"type": "page_link", "page": 145, "text": "145-146"},
    {"type": "text", "value": "."}
  ]
}
```

**In your Svelte component:**
```svelte
{#if item.content}
  {#each item.content as segment}
    {#if segment.type === 'text'}
      {segment.value}
    {:else if segment.type === 'page_link'}
      <button on:click={() => goToPage(segment.page)}>
        {segment.text}
      </button>
    {/if}
  {/each}
{:else}
  {item.text}
{/if}
```

**Notes:**
- For page ranges (e.g., `145-146`), button shows both numbers but links to first page
- Only detects the pattern "on page(s) n" - use this format consistently
- Works in both text blocks and rubrics

## DPB Source Format Reference

See `src/lib/data/services/source/key.dpb` for complete syntax reference.

### Quick Reference

```
# Metadata
pg: 161-170                    # Page range
tp: Holy Baptism               # Title (also generates slug)

# Content Types
st: Section Title              # Section title
st:1: Large Title             # Section title with size (1=largest, 3=smallest)
tb: Text block content        # Text block (can span multiple lines)
r: Rubric instructions        # Rubric
ref: Reference text           # Reference
l: Line of text               # Single line

# Versicals (call and response)
v:: Text with no speaker      # Anonymous versical
v:celebrant: Text             # With speaker
v:people: Response            # People response (auto-bold)
v:b: Bold text                # Bold, no speaker

# Other
pb: 162                       # Page break marker
button:link: Button Text      # Button with link
button:: Placeholder Button   # Button placeholder

# Global Modifiers (add after type)
:b - Make text bold           # Example: tb:b: Bold text
:o - Mark as optional         # Example: r:o: Optional rubric
:i - Indent text              # Example: l:i: Indented line
```

### Examples

**Versical with speaker:**
```
v:celebrant: The Lord be with you.
v:people: And with your spirit.
```

Converts to:
```json
{
  "type": "versical",
  "who": "celebrant",
  "text": "The Lord be with you."
},
{
  "type": "versical",
  "who": "people",
  "text": "And with your spirit."
}
```

**Text block with modifiers:**
```
tb:i:o: This text is indented and optional.
```

Converts to:
```json
{
  "type": "text_block",
  "text": "This text is indented and optional.",
  "indent": true,
  "optional": true
}
```

## Recommended Workflow

### For New Services

1. **Create DPB source file:**
   ```bash
   touch src/lib/data/services/source/my_service.dpb
   ```

2. **Write content in DPB format** (much faster!)

3. **Validate:**
   ```bash
   npm run validate:source
   ```

4. **Convert to JSON:**
   ```bash
   npm run convert:source
   ```

5. **Commit both files** (.dpb + JSON) to version control

### For Editing Existing Services

1. **Edit the DPB source file** (not the JSON!)

2. **Validate your changes:**
   ```bash
   npm run validate:source
   ```

3. **Re-convert to JSON:**
   ```bash
   npm run convert:source
   ```

4. **Commit both files**

### Build Integration (Optional)

You can add these to your `package.json` scripts:

```json
{
  "scripts": {
    "validate:source": "node scripts/validate-raw-format.cjs src/lib/data/services/source/",
    "convert:source": "node scripts/convert-raw-to-json.cjs src/lib/data/services/source/",
    "prebuild": "npm run validate:source && npm run convert:source"
  }
}
```

Then the conversion happens automatically before every build:
```bash
npm run build  # Automatically validates and converts source files first
```

## Troubleshooting

### "node: not found"

If `node` is not in your PATH, try:
- Using the full path: `/usr/bin/node scripts/...`
- Using nvm: `nvm use && node scripts/...`
- Installing node: Check your system package manager

### Validation Errors

The validator provides line numbers and specific error messages. Common issues:
- Missing colons
- Invalid type names
- Typos in modifiers
- Empty content after type declaration

### Conversion Issues

If the JSON output doesn't look right:
1. Validate the source file first
2. Check that your syntax matches `key.dpb`
3. Look for special characters that might need escaping
4. Compare with working examples in the `source/` directory

## File Structure

```
src/lib/data/services/
├── source/                   # Source files (edit these!)
│   ├── key.dpb              # Format reference
│   ├── baptism.dpb          # DPB source format
│   └── confirmation.dpb     # DPB source format
├── baptism.json             # Generated (don't edit directly)
├── confirmation.json        # Generated (don't edit directly)
└── ...
```

## Tips

1. **Always edit .dpb files, not JSON** - JSON files are generated
2. **Validate before converting** - Catch errors early
3. **Keep key.dpb handy** - Reference for syntax
4. **Use version control** - Commit both .dpb and JSON files
5. **Test incrementally** - Validate/convert as you write

## Need Help?

- Check `key.dpb` for syntax reference
- Look at existing `.dpb` files in `source/` for examples
- Run validator to get specific error messages
- Check this README for workflow guidance
