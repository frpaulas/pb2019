# Liturgical Context - Quick Reference

## Setting Context for a Service

```typescript
import { liturgicalContext } from '$lib/stores/liturgical';

// Single person (Baptism, Burial, Confirmation)
liturgicalContext.setSubject({
  gender: 'feminine',        // 'masculine' | 'feminine' | 'neutral'
  number: 'singular',        // 'singular' | 'plural'
  firstName: 'Mary',
  fullName: 'Mary Johnson'
}, {
  serviceSlug: 'holy_baptism',  // Optional: identify service
  expirationDays: 1             // Optional: see below
});

// Two people (Marriage)
liturgicalContext.setSubject({
  gender: 'masculine',
  number: 'singular',
  firstName: 'John',
  fullName: 'John Smith'
}, {
  serviceSlug: 'holy_matrimony',
  expirationDays: 2
});

liturgicalContext.setSubject2({
  gender: 'feminine',
  number: 'singular',
  firstName: 'Jane',
  fullName: 'Jane Doe'
});
```

## Expiration Days

Think in terms of **which day's service**:

| Days | Expires | Use Case |
|------|---------|----------|
| `0` | Midnight **today** | Same-day service preparation |
| `1` | Midnight **tomorrow** | **Default** - Next-day service |
| `2` | Midnight **day after tomorrow** | Sunday service (set Friday/Saturday) |
| `3` | Midnight **3 days from now** | Multi-day advance prep |

### Examples:

```typescript
// Setting up TODAY (Tuesday) for service THIS AFTERNOON
expirationDays: 0  // Expires at midnight Tuesday

// Setting up TODAY (Saturday) for service TOMORROW (Sunday)
expirationDays: 1  // Expires at midnight Sunday (default)

// Setting up FRIDAY for service SUNDAY
expirationDays: 2  // Expires at midnight Sunday

// Setting up THURSDAY for service SUNDAY
expirationDays: 3  // Expires at midnight Sunday
```

## Template Syntax in Service Files

### Pronouns
```json
{
  "text": "Bless __him|her|them__ and keep __him|her|them__."
}
```

### Names
```json
{
  "text": "__N.__, I baptize you..."
}
{
  "text": "We commend __N.N.__ to God."
}
{
  "text": "Into this union __N.N. and N.N.__ now come."
}
```

### Number Agreement
```json
{
  "text": "We pray for __this candidate|these candidates__ who __is|are__ present."
}
```

### Gender Nouns
```json
{
  "text": "We commend our __brother|sister|sibling__ __N.N.__."
}
```

## Common Workflows

### 📅 Friday Prep for Sunday Baptism
```typescript
liturgicalContext.setSubject({
  gender: 'feminine',
  firstName: 'Emma',
  fullName: 'Emma Thompson'
}, {
  serviceSlug: 'holy_baptism',
  expirationDays: 2  // Expires midnight Sunday
});
// Preview service → Close browser → Return Sunday → Service!
```

### 💒 Saturday Wedding
```typescript
// Morning of wedding day
liturgicalContext.setSubject({
  firstName: 'Michael',
  fullName: 'Michael Anderson',
  gender: 'masculine',
  number: 'singular'
}, {
  serviceSlug: 'holy_matrimony',
  expirationDays: 0  // Expires midnight today
});

liturgicalContext.setSubject2({
  firstName: 'Sarah',
  fullName: 'Sarah Williams',
  gender: 'feminine',
  number: 'singular'
});
```

### ⚰️ Funeral Service Today
```typescript
liturgicalContext.setSubject({
  gender: 'masculine',
  firstName: 'Robert',
  fullName: 'Robert Chen'
}, {
  serviceSlug: 'burial',
  expirationDays: 0  // Expires midnight today
});
```

## Manual Control

```typescript
// Clear context immediately after service
liturgicalContext.reset();

// Extend expiration (e.g., service postponed)
liturgicalContext.extendExpiration(2);  // Extend to midnight 2 days from now

// Check if expired
liturgicalContext.clearIfExpired();
```

## What Gets Saved

✅ **Persists** (survives browser close, refresh, navigation):
- Names (first, full)
- Gender selection
- Singular/plural
- Expiration timestamp
- Service slug

❌ **Does NOT persist**:
- After expiration time
- After manual `reset()`
- If localStorage cleared

## Viewing Active Context

```svelte
<script>
  import { liturgicalContext } from '$lib/stores/liturgical';
  
  $: hasContext = $liturgicalContext.subject !== undefined;
  $: name = $liturgicalContext.subject?.fullName;
  $: name2 = $liturgicalContext.subject2?.fullName;
  $: expires = $liturgicalContext._metadata?.expiresAt 
    ? new Date($liturgicalContext._metadata.expiresAt).toLocaleString()
    : '';
</script>

{#if hasContext}
  <div class="alert">
    Active: {name}
    {#if name2}and {name2}{/if}
    <br>
    Expires: {expires}
  </div>
{/if}
```

## Gender Options

| Value | Pronouns | Gender Nouns |
|-------|----------|--------------|
| `'masculine'` | he/him/his | brother/son/father |
| `'feminine'` | she/her/hers | sister/daughter/mother |
| `'neutral'` | they/them/their | sibling/child/parent |

## Privacy & Security

- ✅ Stored locally on device only
- ✅ Not sent to server
- ✅ Auto-expires at midnight
- ✅ Can be manually cleared
- ✅ SSR-safe (server gets empty context)
