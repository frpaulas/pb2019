# Zed Editor Configuration

This directory contains Zed editor tasks and configurations for the PB2019 project.

## Tasks

Tasks can be run via the Command Palette (`cmd+shift+p` / `ctrl+shift+p`) → "task: spawn"

### Available Tasks

#### 1. Format Psalm
- **Purpose**: Formats psalm files
- **Trigger**: Manual
- **Scope**: Current file
- **Output**: Silent (no terminal shown)

#### 2. Lint DPB File
- **Purpose**: Lints the currently open DPB file
- **Trigger**: Manual
- **Scope**: Current file only (`${ZED_FILE}`)
- **Output**: Shows terminal with errors/warnings

**Usage:**
1. Open a `.dpb` file
2. Open Command Palette (`cmd+shift+p`)
3. Type "task: spawn"
4. Select "Lint DPB File"

**Output Example:**
```
holy_baptism.dpb:
  ❌ Line 13: Line missing colon separator (not a valid directive). Did you forget \ on previous line?
  ⚠️  Line 361: Button has no link (placeholder button)

============================================================
Checked 1 file(s)
Errors: 1
Warnings: 1
```

#### 3. Lint All DPB Files
- **Purpose**: Lints all DPB files in the project
- **Trigger**: Manual
- **Scope**: All `*.dpb` files in `src/lib/data/services/dpb/`
- **Output**: Shows terminal with all errors/warnings

**Usage:**
1. Open Command Palette (`cmd+shift+p`)
2. Type "task: spawn"
3. Select "Lint All DPB Files"

## Keyboard Shortcuts (Optional)

You can add keyboard shortcuts for tasks in your Zed `keymap.json`:

```json
[
  {
    "context": "Editor && VimControl && !menu",
    "bindings": {
      "space l f": "task::Spawn(Lint DPB File)",
      "space l a": "task::Spawn(Lint All DPB Files)"
    }
  }
]
```

This would allow:
- `space l f` - Lint current file
- `space l a` - Lint all files

## Auto-Lint on Save

To automatically lint DPB files when you save them, you can use Zed's task system with a custom trigger.

### Option 1: Use Tasks with Custom Keybinding

Map save-and-lint to a keybinding:

```json
{
  "context": "Editor && vim_mode == normal",
  "bindings": {
    "ctrl-s": [
      "editor::Save",
      "task::Spawn(Lint DPB File)"
    ]
  }
}
```

### Option 2: Use Zed's Format on Save

In your Zed `settings.json`, you can configure format-on-save behavior:

```json
{
  "languages": {
    "DPB": {
      "format_on_save": "off",
      "tab_size": 2,
      "hard_tabs": false
    }
  }
}
```

Note: Zed doesn't currently support running arbitrary linters on save, but you can use tasks as shown above.

## Files

- `tasks.json` - Task definitions for running scripts
- `format-psalm.cjs` - Custom formatter for psalm files
- `README.md` - This file

## See Also

- [DPB Linter Documentation](../docs/DPB_LINTER.md)
- [DPB Format Key](../src/lib/data/services/dpb/key.txt)
- [Zed Tasks Documentation](https://zed.dev/docs/tasks)
