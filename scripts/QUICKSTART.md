# Quick Start: DPB Source Format → JSON

## Why Use This?

Writing JSON by hand is tedious and error-prone. The DPB source format (`.dpb` files) is:
- **10x faster** to write
- **Fewer errors** (no missing commas, brackets)
- **Easier to read** and maintain

## Simple Example

Instead of writing this JSON:
```json
{
  "type": "versical",
  "who": "celebrant",
  "text": "The Lord be with you."
}
```

Just write this:
```
v:celebrant: The Lord be with you.
```

## Basic Usage

### 1. Create a DPB source file

```bash
# Create your file in the source directory
touch src/lib/data/services/source/my_service.dpb
```

### 2. Write your content

```
pg: 100-105
tp: My Service Title

st: Introduction
tb: This is a text block with instructions or content.

r: This is a rubric (instruction for the liturgy).

v:celebrant: The Lord be with you.
v:people: And with your spirit.
```

### 3. Validate it

```bash
npm run validate:source
```

### 4. Convert to JSON

```bash
npm run convert:source
```

That's it! Your JSON file is created automatically.

## Common Patterns

### Versicals (Call and Response)

```
v:celebrant: The Lord be with you.
v:people: And with your spirit.
v:celebrant: Let us pray.
```

### Text with Modifiers

```
tb:b: This text is bold
tb:i: This text is indented
tb:i:b: This is indented AND bold
r:o: This rubric is optional
```

### Section Titles

```
st: Regular Section Title
st:1: Large Title
st:2: Medium Title
st:3: Small Title
```

### Page Breaks

```
pb: 101
# Content for page 101 goes here
pb: 102
# Content for page 102 goes here
```

## Cheat Sheet

```
pg: n-n          Page range
tp: Title        Title page
st: Text         Section title
tb: Text         Text block
r: Text          Rubric
v:who: Text      Versical with speaker
v:: Text         Versical without speaker
pb: n            Page break
l: Text          Single line
ref: Text        Reference

Modifiers:
:b   Bold
:i   Indent
:o   Optional
```

## Automatic Page Links

The converter automatically detects page references and converts them to clickable buttons:

**In raw format:**
```
r: The Celebrant may use the seasonal greetings on pages 145-146.
tb: Or use the sentences on page 140.
```

**Converts to:**
```json
{
  "type": "rubric",
  "content": [
    {"type": "text", "value": "The Celebrant may use the seasonal greetings "},
    {"type": "page_link", "page": 145, "text": "145-146"},
    {"type": "text", "value": "."}
  ]
}
```

**Pattern recognized:** `on page n` or `on pages n-m`
- Button shows the page number(s)
- Links to the first page for ranges

## Tips

1. **Always validate first** - Catch errors before converting
2. **Edit .dpb files, not JSON** - JSON is auto-generated
3. **Check key.dpb** - Full syntax reference
4. **Look at examples** - Check other .dpb files in source/
5. **Use "on page" format** - For automatic page link detection

## Example Workflow

```bash
# 1. Edit your DPB source file
vim src/lib/data/services/source/baptism.dpb

# 2. Validate
npm run validate:source

# 3. Convert
npm run convert:source

# 4. Done! Use the JSON file in your app
```

## Full Documentation

See `scripts/README.md` for complete documentation.
