# DPB Language Extension for Zed

Syntax highlighting for Digital Prayer Book (`.dpb`) source files in the Zed editor.

## Features

- Syntax highlighting for all DPB keywords
- Color coding for:
  - Type keywords (`pg:`, `tp:`, `st:`, `tb:`, `r:`, etc.)
  - Modifiers (`:b`, `:o`, `:i`)
  - Speakers in versicals (`celebrant`, `people`, `officiant`)
  - Page numbers and references
  - Text content
  - Comments (`#`)

## Installation

### Option 1: Local Development Extension

1. Copy this directory to Zed's extensions folder:
   ```bash
   mkdir -p ~/.config/zed/extensions/
   cp -r zed-dpb-extension ~/.config/zed/extensions/dpb
   ```

2. Restart Zed or run `zed: reload extensions` from the command palette

3. Open any `.dpb` file - syntax highlighting should be active!

### Option 2: Manual Installation

If you're developing the extension:

1. Open Zed
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Linux/Windows)
3. Type "zed: install dev extension"
4. Select the `zed-dpb-extension` directory

## File Association

The extension automatically activates for files with the `.dpb` extension.

## Supported Syntax

All DPB source format keywords are supported:

- `pg:` - Page range
- `tp:` - Title page
- `st:` - Section title (with optional size: `st:1:`, `st:2:`, `st:3:`)
- `tb:` - Text block
- `r:` - Rubric
- `ref:` - Biblical reference
- `ref+:` - Reference with additional text
- `v:` - Versical (with optional speaker)
- `pb:` - Page break
- `l:` - Line
- `button:` - Button
- `lords_prayer:` - Lord's Prayer component
- `#` - Comments

### Modifiers

- `:b` - Bold
- `:o` - Optional
- `:i` - Indent

## Color Theme

The extension uses standard TextMate scopes that work with any Zed theme:

- **Keywords** (type markers) - Theme's keyword color
- **Numbers** (pages) - Theme's number color
- **Strings** (content) - Theme's string color
- **Variables** (speakers) - Theme's variable color
- **Comments** - Theme's comment color
- **Functions** (special markers) - Theme's function color

## Development

To modify the syntax highlighting:

1. Edit `grammars/dpb.json` - TextMate grammar rules
2. Edit `languages/dpb/highlights.scm` - Tree-sitter highlighting queries (if using)
3. Reload extension in Zed

## Example

```dpb
# This is a comment
pg: 161-170
tp: Holy Baptism

st: the exhortation
r: The Celebrant says to the People

tb: Dearly beloved, Scripture teaches that we were all dead in our
sins and trespasses, but by grace we may be saved through faith.

v:celebrant: The Lord be with you.
v:people: And with your spirit.

lords_prayer:

pb: 162
```

## License

This extension is part of the PB2019 project.

## Issues

Report issues at: https://github.com/frpaulas/pb2019/issues
