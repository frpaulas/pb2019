# DPB File Format Improvements

## Current Highlighting Issues Fixed

### 1. Grammar Enhancements
The grammar now exposes structured fields for better highlighting:

- **Command modifiers** (`b`, `i`, `o`) are captured as `@attribute`
- **Page numbers** and **ranges** are captured as `@constant.numeric`
- **Speaker labels** in versicals (people, celebrant, etc.) are captured as `@label`
- **Content text** is captured as `@string`
- **Citations** in references are captured as `@string.special`
- **Button links** are captured as `@markup.link`

### 2. Enhanced Highlighting Scheme

The new `highlights.scm` provides:
- **Keywords**: Command prefixes (`pg`, `tp`, `st`, `tb`, `r`, `v`, etc.)
- **Attributes**: Formatting modifiers (b/i/o)
- **Constants**: Numeric values (page numbers, levels)
- **Labels**: Speaker identifiers in versicals
- **Strings**: Text content
- **Links**: Button destinations

## Suggestions to Make DPB Files Easier to Work With

### 1. Add File Headers
Consider adding standardized headers to DPB files:

```dpb
# Service: Holy Baptism
# Pages: 161-170
# Last Modified: 2024-11-24
# Description: The liturgy for Holy Baptism

pg: 161-170
tp: Holy Baptism
```

### 2. Use Consistent Spacing
Add blank lines between major sections for readability:

```dpb
st:1: The Exhortation
r: The Celebrant then says to the People

bt: Dearly beloved, Scripture teaches...

# Blank line before next section
st:1: The Presentation
```

### 3. Comment Complex Sections
Add explanatory comments for conditional or complex sections:

```dpb
# Adults and older children who can answer for themselves
st:1: Adults and Older Children
r: The Candidates who are able to answer for themselves...

# Infants and younger children presented by sponsors
st:1: Infants and Younger Children
r: Then the Candidates who are unable to answer...
```

### 4. Standardize Speaker Labels
Use consistent capitalization and naming:

```dpb
v:people: And blessed be his kingdom, now and for ever. Amen.
v:celebrant: The Lord be with you.
v:people: And with your spirit.
```

Common speakers: `people`, `celebrant`, `minister`, `priest`, `bishop`, `all`

### 5. Group Related Content
Keep multi-line content together with continuation lines:

```dpb
bt: This is a longer text block that continues
across multiple lines. Each continuation line
should not start with a command prefix.
```

### 6. Use Descriptive Button Text
Make button links clear and actionable:

```dpb
button:additional_directions: See Additional Directions
button:: Return to Table of Contents
```

### 7. Document Modifier Usage
Add comments explaining modifier combinations:

```dpb
# b = bold, i = indent, o = optional
tb:bio: This text is bold, indented, and optional
```

### 8. Validate Before Committing
Basic validation checklist:
- All commands have proper syntax (`command:args:content`)
- Page ranges are sequential
- No orphaned continuation lines
- Matching opening/closing sections
- Button links reference valid locations

### 9. Consider a Linter
Create a simple linter that checks:
- Valid command syntax
- Required page range at start
- Proper modifier format (`b`, `i`, `o` only)
- No duplicate page breaks
- Speaker labels are recognized

Example linter rules:
```javascript
// Check for valid command syntax
const validCommands = ['pg', 'tp', 'st', 'tb', 'bt', 'r', 'ref', 'ref+', 'v', 'pb', 'l', 'button', 'lords_prayer'];
const commandPattern = /^(pg|tp|st|tb|bt|r|ref\+?|v|pb|l|button|lords_prayer):/;

// Check for valid modifiers
const modifierPattern = /^[bio]+$/;

// Check for recognized speakers
const validSpeakers = ['people', 'celebrant', 'minister', 'priest', 'bishop', 'all', ''];
```

### 10. Create Templates
Provide templates for common patterns:

```dpb
# Template: Versical Exchange
v:celebrant: [Leader's part]
v:people: [People's response]

# Template: Rubric with Text Block
r: [Instructional text]

bt: [Prayer or reading text]

# Template: Section with Optional Content
st:1: [Section Title]
r:o: [Optional instruction]
tb: [Main content]
```

## Testing the Improvements

After rebuilding the grammar, test highlighting on various patterns:
1. Commands with modifiers: `tb:bio:`, `st:2:b:`
2. Versicals with speakers: `v:people:`, `v:celebrant:`
3. References: `ref:Psalm 23`, `ref+:John 3:16:Additional context`
4. Buttons: `button:link:Text`, `button::Placeholder`
5. Complex section titles: `st:2:bi:Title Text`

## Building the WASM Grammar

To build the WASM grammar for Zed, you need emscripten:

```bash
# Install emscripten (one-time setup)
cd /tmp
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# Build the grammar
cd /home/frpaulas/pb2019/zed-dpb-extension/grammars/dpb
tree-sitter build --wasm
```

## Next Steps

1. ✅ Enhanced grammar with field captures
2. ✅ Updated highlights.scm with comprehensive patterns
3. ⏳ Build WASM grammar (requires emscripten)
4. Test highlighting in Zed editor
5. Consider implementing a DPB linter
6. Create DPB file templates
7. Add validation to build pipeline
