# DPB Continuation Marker Migration Guide

## Breaking Change

The DPB format now **requires explicit continuation markers** for multiline content. This eliminates ambiguity in parsing and makes the format clearer for future maintainers.

## What Changed

### Before (Implicit Continuation)

```dpb
tb: This is a long prayer that
continues on the next line
and finishes here.
r: Next rubric
```

The parser had to *guess* where the text block ended.

### After (Explicit Continuation)

```dpb
tb: This is a long prayer that \
continues on the next line \
and finishes here.
r: Next rubric
```

The backslash `\` explicitly marks continuation.

## Migration Steps

### 1. Run the Linter

```bash
npm run lint:dpb
```

Look for errors like:
- `Line missing colon separator (not a valid directive). Did you forget \ on previous line?`

### 2. Fix Each Multiline Block

For every `r:`, `tb:`, or `l:` that spans multiple lines:

**Add `\` at the end of each line except the last:**

```dpb
# Before
tb: Almighty God, we thank you for the gift of water. Over it the
Holy Spirit moved in the beginning of creation. Through it you
led the children of Israel out of their bondage in Egypt.

# After
tb: Almighty God, we thank you for the gift of water. Over it the \
Holy Spirit moved in the beginning of creation. Through it you \
led the children of Israel out of their bondage in Egypt.
```

### 3. Use Find and Replace (Carefully)

This is **not** a simple find/replace task because you need to identify multiline blocks. However, you can use the linter output to guide you.

**Pattern:**
1. Linter reports: `Line 50: Line missing colon separator`
2. Look at line 49 - if it's `r:`, `tb:`, or `l:` without `\`, add it
3. Check if line 50 is a continuation - if yes, add `\` to line 49

### 4. Re-run Linter

```bash
npm run lint:dpb
```

Repeat until no continuation errors remain.

## Which Directives Support Continuation?

**✅ These support `\` continuation:**
- `r:` - Rubric
- `tb:` - Text block
- `l:` - Line

**❌ These do NOT support `\` continuation:**
- `v:` - Versical (must be single line)
- `st:` - Section title (must be single line)
- `button:` - Button (must be single line)
- `pg:`, `pb:`, `tp:`, etc. (all single line)

## Example Conversions

### Rubric

**Before:**
```dpb
r: The Celebrant then examines the Candidates who can speak for themselves, and
the Godparents and Sponsoring Parents who will speak on behalf of infants or
young children, saying
```

**After:**
```dpb
r: The Celebrant then examines the Candidates who can speak for themselves, and \
the Godparents and Sponsoring Parents who will speak on behalf of infants or \
young children, saying
```

### Text Block

**Before:**
```dpb
tb: Dearly beloved, Scripture teaches that we were all dead in our
sins and trespasses, but by grace we may be saved through faith.
Our Savior Jesus Christ said, "Unless one is born of water
and the Spirit, he cannot enter the kingdom of God"
```

**After:**
```dpb
tb: Dearly beloved, Scripture teaches that we were all dead in our \
sins and trespasses, but by grace we may be saved through faith. \
Our Savior Jesus Christ said, "Unless one is born of water \
and the Spirit, he cannot enter the kingdom of God"
```

### Line

**Before:**
```dpb
l: I present N.N. to receive the Sacrament of Baptism and to be
confirmed as a member of Christ's Church.
```

**After:**
```dpb
l: I present N.N. to receive the Sacrament of Baptism and to be \
confirmed as a member of Christ's Church.
```

## Why This Change?

### 1. **Unambiguous Parsing**

**Before:** Parser had to guess when multiline ended
```dpb
tb: Long prayer text
continues here
r: Is this a new rubric or part of the prayer? 🤔
```

**After:** Explicit markers eliminate ambiguity
```dpb
tb: Long prayer text \
continues here
r: Clearly a new rubric ✓
```

### 2. **Better Error Messages**

The linter can now tell you exactly where you forgot a continuation marker.

### 3. **Future Maintainer Clarity**

Someone reading the DPB file can immediately see which lines are continuations.

### 4. **Prevents Accidental Errors**

A line that *looks* like a directive won't accidentally be parsed as one if it's actually a continuation.

## Common Mistakes

### ❌ Forgetting backslash on intermediate lines

```dpb
tb: Line one \
Line two
Line three \
Line four
```

Error: `Line 3: Line missing colon separator`

**Fix:** Add `\` to line 2

### ❌ Using backslash on single-line directives

```dpb
v:celebrant: The Lord be with you \
```

Error: `Directive 'v' does not support multiline continuation`

**Fix:** Remove the `\`

### ❌ Backslash with no continuation

```dpb
tb: This is the last line \

r: Next section
```

Error: `Line ends with \ but next line is empty/comment`

**Fix:** Remove the `\` from the tb line

## Automation Script (Optional)

If you have many files to migrate, you could write a script to:
1. Parse each file
2. Track which lines are in multiline blocks
3. Add `\` where needed

However, manual review is recommended for accuracy.

## Timeline

- **Now:** Linter enforces continuation markers
- **Next:** Update all existing DPB files
- **Future:** All new DPB files must use continuation markers

## Questions?

This is a breaking change but improves the format significantly. The explicit markers make the format self-documenting and eliminate parsing ambiguity.
