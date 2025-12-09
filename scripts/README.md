# Scripts Documentation

This directory contains utility scripts for working with the Prayer Book 2019 project.

## 📝 DPB File Scripts

### lint-dpb.cjs
**Purpose:** Validate `*.dpb` files for syntax errors and common issues

**Usage:**
```bash
npm run lint:dpb                                    # Lint all DPB files
node scripts/lint-dpb.cjs path/to/file.dpb         # Lint specific file
node scripts/lint-dpb.cjs src/lib/data/services/dpb/*.dpb  # Lint multiple files
```

**What it checks:**
- ✅ Valid prefixes (pg, tp, pb, r, st, tb, l, v, button, etc.)
- ✅ Formatting (mismatched `_italic_`, `**bold**`, `__template__`)
- ✅ Template syntax validation
- ✅ Page number ordering
- ✅ Multiline block continuations
- ✅ Versical and button formats

**Documentation:** [DPB_LINTER.md](../docs/DPB_LINTER.md)

### convert-raw-to-json.cjs
**Purpose:** Convert raw service text to JSON format

**Usage:**
```bash
node scripts/convert-raw-to-json.cjs src/lib/data/services/source/
```

### convert-json-to-dpb.cjs
**Purpose:** Convert JSON format to DPB format

**Usage:**
```bash
node scripts/convert-json-to-dpb.cjs input.json output.dpb
```

### validate-raw-format.cjs
**Purpose:** Validate raw service text format before conversion

**Usage:**
```bash
npm run validate:source
```

### build-service-pages.cjs
**Purpose:** Build service page index from DPB files

**Usage:**
```bash
node scripts/build-service-pages.cjs
```

## 🔄 Common Workflows

### Adding a New Service

1. **Create DPB file:**
   ```bash
   touch src/lib/data/services/dpb/new_service.dpb
   ```

2. **Edit DPB file** following [key.txt](../src/lib/data/services/dpb/key.txt) format

3. **Lint for errors:**
   ```bash
   node scripts/lint-dpb.cjs src/lib/data/services/dpb/new_service.dpb
   ```

4. **Convert to JSON:**
   ```bash
   node scripts/convert-raw-to-json.cjs src/lib/data/services/dpb/new_service.dpb
   ```

5. **Rebuild service pages:**
   ```bash
   node scripts/build-service-pages.cjs
   ```

### Updating Multiple Services

```bash
# 1. Edit DPB files
# 2. Lint all
npm run lint:dpb

# 3. Convert all
for file in src/lib/data/services/dpb/*.dpb; do
  node scripts/convert-raw-to-json.cjs "$file"
done

# 4. Rebuild index
node scripts/build-service-pages.cjs
```

## 🧪 Testing

The linter has its own test suite:
```bash
npm test -- templateResolver.test.ts  # Tests template syntax validation
```

## 📚 File Formats

### DPB Format (.dpb)
Human-readable format for editing services:
```
pg: 161-170
tp: Holy Baptism

r: The People standing, the Celebrant says...
v:celebrant: The Lord be with you.
v:people: And with your spirit.
```

See: [dpb/key.txt](../src/lib/data/services/dpb/key.txt)

### JSON Format (.json)
Structured format for application use:
```json
{
  "holy_baptism": {
    "title": "Holy Baptism",
    "slug": "holy_baptism",
    "pb_pages": [161, 170],
    "sections": [...]
  }
}
```

## 🚨 Error Handling

All scripts use exit codes:
- `0` - Success
- `1` - Errors found (linter) or conversion failed

## 🔍 Related Documentation

- [Template System](../docs/TEMPLATE_SYSTEM.md) - Template syntax for dynamic text
- [DPB Linter](../docs/DPB_LINTER.md) - Detailed linter documentation
- [DPB Key](../src/lib/data/services/dpb/key.txt) - Complete DPB format specification
