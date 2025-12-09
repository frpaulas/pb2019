# Liturgical Template System

## Overview

The Digital Prayer Book now supports dynamic text substitution based on context (gender, number, and names). This allows liturgical texts to adapt to the specific person or people being prayed for/about.

## Syntax

### Template Markers: `__option1|option2|option3__`

Use double underscores to mark text that should be substituted based on context:

- `**text**` = bold (standard Markdown)
- `_text_` = italic (standard Markdown)
- `__template__` = dynamic substitution

## Supported Patterns

### 1. Pronouns (automatically detected)

```
__he|she|they__       → Nominative (subject)
__him|her|them__      → Objective
__his|her|their__     → Possessive
__his|hers|theirs__   → Possessive pronoun
__himself|herself|themselves__ → Reflexive
```

**Example:**
```json
{
  "text": "We commend to God our __brother|sister|sibling__ N., and we commit __his|her|their__ body to the ground."
}
```

### 2. Gender-Specific Nouns

```
__brother|sister|sibling__
__son|daughter|child__
__father|mother|parent__
__husband|wife|spouse__
```

### 3. Number Agreement (Singular|Plural)

```
__this candidate|these candidates__
__is|are__
__has|have__
```

**Example:**
```json
{
  "text": "Let us now pray for __this candidate|these candidates__ who __is|are__ to receive the Sacrament of Baptism."
}
```

### 4. Name Placeholders

```
__N.__              → First name only
__N.N.__            → Full name
__N. and N.__       → Two first names (for marriages)
__N.N. and N.N.__   → Two full names (for marriages)
```

**Examples:**
```json
{
  "text": "__N.__, I baptize you in the Name of the Father, and of the Son, and of the Holy Spirit."
}
```

```json
{
  "text": "Into this holy union __N.N. and N.N.__ now come to be joined."
}
```

## Setting Context

### In Your Svelte Component

```typescript
import { liturgicalContext } from '$lib/stores/liturgical';

// Before rendering a service
liturgicalContext.setSubject({
  gender: 'feminine',
  number: 'singular',
  firstName: 'Mary',
  fullName: 'Mary Johnson'
}, {
  serviceSlug: 'holy_baptism',
  expirationDays: 1  // Optional: 0=today, 1=tomorrow (default), 2,3...
});

// For marriages, set both subjects
liturgicalContext.setSubject2({
  gender: 'masculine',
  number: 'singular',
  firstName: 'John',
  fullName: 'John Smith'
});

// Reset when done
liturgicalContext.reset();
```

### Persistence & Expiration

Context is **automatically saved** to localStorage and persists across:
- Page navigation
- Browser refresh
- Browser close/reopen

Context **automatically expires** at midnight on the specified day (customizable, default = midnight tomorrow) to prevent stale data.

See [CONTEXT_PERSISTENCE.md](./CONTEXT_PERSISTENCE.md) for detailed persistence documentation.

### Context Options

```typescript
interface SubjectContext {
  gender: 'masculine' | 'feminine' | 'neutral';
  number: 'singular' | 'plural';
  firstName?: string;
  lastName?: string;
  fullName?: string;
}
```

## Examples

### Baptism (Feminine, Singular)

**Context:**
```typescript
liturgicalContext.setSubject({
  gender: 'feminine',
  number: 'singular',
  firstName: 'Jane',
  fullName: 'Jane Smith'
});
```

**Input:**
```
Today, on behalf of this child, you shall make vows...
as soon as __he|she|they__ is able to learn...
__He|She|They__ must come to put __his|her|their__ faith in Jesus Christ...
```

**Output:**
```
Today, on behalf of this child, you shall make vows...
as soon as she is able to learn...
She must come to put her faith in Jesus Christ...
```

### Burial (Masculine, Singular)

**Context:**
```typescript
liturgicalContext.setSubject({
  gender: 'masculine',
  number: 'singular',
  firstName: 'John',
  fullName: 'John Doe'
});
```

**Input:**
```
We commend to Almighty God our __brother|sister|sibling__ __N.N.__,
and we commit __his|her|their__ body to the ground.
The Lord bless __him|her|them__ and keep __him|her|them__.
```

**Output:**
```
We commend to Almighty God our brother John Doe,
and we commit his body to the ground.
The Lord bless him and keep him.
```

### Multiple Candidates (Plural)

**Context:**
```typescript
liturgicalContext.setSubject({
  gender: 'neutral',  // Mixed group
  number: 'plural'
});
```

**Input:**
```
Let us now pray for __these candidates__ who __are__ to receive the Sacrament of Baptism.
That __they__ may continue in the apostles' teaching.
```

**Output:**
```
Let us now pray for these candidates who are to receive the Sacrament of Baptism.
That they may continue in the apostles' teaching.
```

### Marriage (Two Names)

**Context:**
```typescript
liturgicalContext.setSubject({
  gender: 'masculine',
  number: 'singular',
  firstName: 'Michael',
  fullName: 'Michael Anderson'
}, {
  serviceSlug: 'holy_matrimony'
});

liturgicalContext.setSubject2({
  gender: 'feminine',
  number: 'singular',
  firstName: 'Sarah',
  fullName: 'Sarah Williams'
});
```

**Input:**
```
Into this holy union __N.N. and N.N.__ now come to be joined.
If any of you can show just cause why __N. and N.__ may not be married, speak now.
```

**Output:**
```
Into this holy union Michael Anderson and Sarah Williams now come to be joined.
If any of you can show just cause why Michael and Sarah may not be married, speak now.
```

## Default Behavior

When **no context is set**, the system defaults to:
- First option (traditionally masculine/singular)
- Name placeholders remain as-is (N., N.N.)

This preserves traditional printed prayer book text when context isn't specified.

## Migration from Old Format

Previously, `__text__` was used for bold. This has been changed to:
- **Bold:** `**text**` (standard Markdown)
- **Templates:** `__template__` (new system)

All existing files have been automatically updated.

## Technical Implementation

1. **Store:** `/src/lib/stores/liturgical.ts` - Context storage
2. **Resolver:** `/src/lib/utils/templateResolver.ts` - Template logic
3. **Parser:** `/src/lib/utils/parseMarkdown.ts` - Integration with markdown
4. **Components:** All text-rendering components automatically use the context

## Future Enhancements

- Multiple subjects (e.g., bride and groom in marriage)
- UI for setting context before services
- Auto-reset on navigation
- Context presets for common scenarios
