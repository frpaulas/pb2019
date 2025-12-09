# DPB Linter

A validation tool for `*.dpb` (Digital Prayer Book) files that checks for syntax errors, formatting issues, and common mistakes.

## Usage

### Lint All DPB Files

```bash
npm run lint:dpb
```

### Lint Specific Files

```bash
node scripts/lint-dpb.cjs src/lib/data/services/dpb/holy_baptism.dpb
node scripts/lint-dpb.cjs src/lib/data/services/dpb/*.dpb
```

## What It Checks

### ✅ Valid Prefixes

The linter validates all line prefixes:

- `pg:` - Page range (must be first line)
- `tp:` - Title page
- `pb:` - Page break (must have increasing page numbers)
- `r:` - Rubric (can be multiline)
- `st:` - Section title (optional size: `st:1:`, `st:2:`, `st:3:`)
- `tb:` - Text block (can be multiline)
- `l:` - Line (can be multiline)
- `v:` - Versical (format: `v:speaker:text`)
- `button:` - Button (format: `button:link:text`)
- `lords_prayer:` - Lords Prayer insertion
- `ref:` - Biblical reference
- `ref+:` - Biblical reference with additional text
- `use:` - Include directive (format: `use:type:name`)
- `scripture:` - Scripture verse (format: `scripture:reference::text`)
- `footnote:` - Footnote text

### ✅ Global Arguments

Validates argument modifiers:
- `b` - Bold
- `o` - Optional (shows with left border)
- `i` - Indent

Example: `l:i:b:` = indented, bold line

### ✅ Formatting Issues

- **Mismatched markers**: Checks for unclosed `_italic_`, `**bold**`, `__template__`
- **Unclosed quotes**: Detects odd number of `"` marks
- **Old bold syntax**: Warns about `__text__` that should be `**text**` or `__opt1|opt2__`

### ✅ Template Syntax

Validates new template system:
- Empty options in templates: `__option1||option3__` ❌
- Pronoun templates: Should have 2-3 options
- Number agreement: Should have exactly 2 options
- Name placeholders: Must be `N.`, `N.N.`, `N. and N.`, or `N.N. and N.N.`

### ✅ Page Numbers

- First line must be `pg:` directive
- Page breaks (`pb:`) must have increasing page numbers
- Page ranges must have valid format: `pg: 161-170`

### ✅ Versical Format

- Checks speaker format: `v:speaker:text`
- Common speakers: `people`, `celebrant`, `officiant`, `priest`, etc.
- Warns about unusual speaker names

### ✅ Button Format

- Checks button format: `button:link:text`
- Warns about placeholder buttons (no link)
- Errors on buttons with no text

## Output Format

### Success
```
✓ holy_baptism.dpb
```

### With Issues
```
holy_baptism.dpb:
  ❌ Line 37: Page break 162 is not greater than previous 162
  ⚠️  Line 361: Button has no link (placeholder button)
```

### Summary
```
============================================================
Checked 48 file(s)
Errors: 10
Warnings: 5
```

## Error Types

### ❌ Errors (Exit Code 1)

Critical issues that prevent proper parsing:
- Unknown prefix
- Invalid format for known prefix
- Missing required content
- Non-increasing page numbers
- Mismatched formatting markers

### ⚠️ Warnings (Exit Code 0)

Style issues or potential problems:
- Unusual speaker names
- Placeholder buttons
- Old `__bold__` syntax (ambiguous with templates)
- Excessive blank line lengths
- Unclosed quotation marks

## Common Issues and Fixes

### Issue: Unknown prefix

```
❌ Line 45: Unknown prefix: 'use'
```

**Fix:** Check that the prefix is in the key file and properly formatted.

### Issue: Multiline continuation error

```
❌ Line 46: Line missing colon separator
```

**Fix:** Ensure multiline blocks (r:, tb:, l:) have proper continuation without colons on following lines.

**Correct:**
```
tb: This is a long prayer that
continues on the next line
and the line after that.
```

**Incorrect:**
```
tb: This is a long prayer that
continues: on the next line  # ❌ Don't add colons!
```

### Issue: Mismatched formatting

```
⚠️  Line 85: Mismatched italic markers (_)
```

**Fix:** Ensure every opening `_` has a closing `_`:
```
This is _italic text_ and this is _also italic_.
```

### Issue: Template syntax warning

```
⚠️  Line 120: Found __text__ - should this be **text** (bold) or __opt1|opt2__ (template)?
```

**Fix:** If bold, use `**text**`. If template, use `__option1|option2__`.

## Integration with CI/CD

The linter exits with code 1 if errors are found, making it suitable for CI:

```bash
# In CI script
npm run lint:dpb || exit 1
```

## Extending the Linter

To add new prefix types, edit `scripts/lint-dpb.cjs`:

```javascript
const VALID_PREFIXES = {
  // Add new prefix
  mynewprefix: /^mynewprefix:\s*.+$/
};
```

Then add validation in `lintLineType()` switch statement.

## Known Limitations

1. **Multiline detection**: The linter can have false positives on complex multiline blocks
2. **Context-aware validation**: Doesn't validate that page breaks match `pg:` range
3. **Reference validation**: Doesn't validate biblical reference format
4. **Link validation**: Doesn't check if button links are valid routes

## See Also

- [DPB Format Key](../src/lib/data/services/dpb/key.txt) - Complete format specification
- [Template System](./TEMPLATE_SYSTEM.md) - Template syntax details
- [Conversion Scripts](../scripts/) - DPB to JSON conversion tools
