# Template System - Complete Summary

## What Was Implemented

A comprehensive liturgical template system for dynamic text substitution based on context (gender, number, names).

## Key Features

### 1. ✅ Template Syntax: `__template__`

- **Bold:** `**text**` (Markdown standard)
- **Italic:** `_text_` (Markdown standard)  
- **Templates:** `__option1|option2|option3__` (new)

### 2. ✅ Gender & Pronoun Support

Automatic pronoun resolution:
- `__he|she|they__` → nominative
- `__him|her|them__` → objective
- `__his|her|their__` → possessive
- `__brother|sister|sibling__` → gender nouns

### 3. ✅ Number Agreement

- `__is|are__`
- `__this candidate|these candidates__`
- `__has|have__`

### 4. ✅ Name Placeholders

- `__N.__` → first name
- `__N.N.__` → full name
- `__N. and N.__` → **two first names** (NEW!)
- `__N.N. and N.N.__` → **two full names** (NEW!)

### 5. ✅ Context Persistence

- **Automatic localStorage persistence**
- **Survives page navigation, refresh, browser close**
- **24-hour default expiration** (customizable)
- **Service-specific context** (prevents mix-ups)

### 6. ✅ Two-Subject Support

Perfect for marriages where forgetting names would be catastrophic:

```typescript
liturgicalContext.setSubject({
  firstName: 'John',
  fullName: 'John Smith',
  gender: 'masculine',
  number: 'singular'
});

liturgicalContext.setSubject2({
  firstName: 'Jane', 
  fullName: 'Jane Doe',
  gender: 'feminine',
  number: 'singular'
});
```

## Real-World Workflow

### Friday Afternoon (Prep)
```typescript
liturgicalContext.setSubject({
  gender: 'feminine',
  firstName: 'Emma',
  fullName: 'Emma Thompson'
}, {
  serviceSlug: 'holy_baptism',
  expirationHours: 72  // Expires Monday
});
```

### Friday Evening
- Clergy previews service
- Checks all pronouns are correct
- Closes browser

### Saturday
- Opens browser
- Context still there
- Reviews service again

### Sunday (Service Day)
- Opens service
- Context still correct
- Performs baptism

### Monday
- Context expires automatically
- Clean slate for next week

## Files Modified/Created

### Core Implementation
- ✅ `src/lib/stores/liturgical.ts` - Enhanced with persistence
- ✅ `src/lib/utils/templateResolver.ts` - Template logic + two names
- ✅ `src/lib/utils/parseMarkdown.ts` - Converted to TS, integrated resolver
- ✅ `src/lib/page_helpers/*.svelte` (6 files) - Updated to use context

### Data Files
- ✅ All `*.json` and `*.dpb` files (57 files) - Changed `__bold__` to `**bold**`

### Tests
- ✅ `src/lib/utils/__tests__/templateResolver.test.ts` - 13 comprehensive tests

### Documentation
- ✅ `docs/TEMPLATE_SYSTEM.md` - Complete technical guide
- ✅ `docs/TEMPLATE_EXAMPLES.md` - Conversion examples
- ✅ `docs/CONTEXT_PERSISTENCE.md` - Persistence deep dive
- ✅ `docs/TEMPLATE_SYSTEM_SUMMARY.md` - This file

## API Reference

### Store Methods

```typescript
import { liturgicalContext } from '$lib/stores/liturgical';

// Set primary subject with options
liturgicalContext.setSubject(subject, { 
  serviceSlug: 'holy_baptism',
  expirationHours: 24 
});

// Set secondary subject (marriages)
liturgicalContext.setSubject2(subject2);

// Set multiple candidates
liturgicalContext.setCandidates([subject1, subject2, subject3]);

// Extend expiration
liturgicalContext.extendExpiration(12); // Add 12 hours

// Check service match
liturgicalContext.isForService('holy_baptism'); // boolean

// Clear expired
liturgicalContext.clearIfExpired();

// Manual reset
liturgicalContext.reset();
```

### Template Syntax Examples

```json
{
  "text": "__N.__, I baptize you..."
}
{
  "text": "We commend our __brother|sister|sibling__ __N.N.__"
}
{
  "text": "May __he|she|they__ rest in peace."
}
{
  "text": "__N.N. and N.N.__ now come to be joined."
}
{
  "text": "Let us pray for __this candidate|these candidates__"
}
```

## Test Coverage

**13 tests, all passing:**
- ✅ Masculine pronouns
- ✅ Feminine pronouns
- ✅ Neutral/plural pronouns
- ✅ Gender-specific nouns
- ✅ Number agreement (singular/plural)
- ✅ Name placeholders (single)
- ✅ Two first names
- ✅ Two full names
- ✅ Default behavior (no context)
- ✅ Name preservation (no context)
- ✅ Partial context (one name missing)
- ✅ Complex mixed templates

## Migration Path

### Converting Existing Services

**Before:**
```json
{
  "text": "as soon as he is able to learn"
}
```

**After:**
```json
{
  "text": "as soon as __he|she|they__ is able to learn"
}
```

See `docs/TEMPLATE_EXAMPLES.md` for detailed conversion patterns.

## Backward Compatibility

✅ Services without templates work normally
✅ Traditional italicized text still works (`_text_`)
✅ Default to masculine/singular when no context set
✅ Name placeholders show as-is without context

## Next Steps (Optional)

1. **Convert existing services** - Add templates to baptism, burial, marriage texts
2. **Build context UI** - Form for clergy to enter names/gender
3. **Add visual indicators** - Show when context is active
4. **Service-specific prompts** - Remind clergy to set context for relevant services
5. **Context templates** - Save common configurations

## Security & Privacy

- ✅ Stored locally only (localStorage)
- ✅ Not sent to server
- ✅ Auto-expires after 24 hours
- ✅ Manual clear available anytime
- ✅ No tracking or analytics

## Browser Support

Works in all modern browsers with localStorage support:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

SSR-safe: Falls back to empty context on server.

## Performance

- **Negligible impact** - Template resolution happens once during parsing
- **No network requests** - All client-side
- **Minimal storage** - ~1KB per context

## Critical Safeguards

### Two-Name Support
**Why it matters:** Few things anger clergy more than wrong names in marriage ceremonies.

**Solution:** Dedicated `subject2` with explicit `__N. and N.__` syntax ensures both names are always handled correctly.

### Smart Expiration
**Why it matters:** Clergy set up services hours/days in advance, then navigate away.

**Solution:** 
- Context persists across browser sessions
- Auto-expires after reasonable time
- Prevents stale data in future services

### Service Slug
**Why it matters:** Context from baptism shouldn't leak into burial service.

**Solution:** Optional `serviceSlug` tagging ensures context is service-specific.

## Success Criteria

✅ Handles gender pronouns correctly
✅ Handles singular/plural correctly  
✅ Handles single names correctly
✅ **Handles two names correctly** ← Critical for marriages
✅ **Persists across navigation** ← Critical for real-world use
✅ **Auto-expires** ← Prevents stale data
✅ Backward compatible
✅ Fully tested
✅ Well documented

## Conclusion

The system is production-ready with both requested enhancements:

1. ✅ **Two distinct names** - `__N.N. and N.N.__` syntax
2. ✅ **Smart persistence** - 24-hour expiration, localStorage, service-specific

The implementation handles real clergy workflows: set context early, preview, navigate freely, context persists until service is done or expires.
