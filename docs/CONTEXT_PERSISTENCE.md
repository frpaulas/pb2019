# Liturgical Context Persistence & Expiration

## Overview

The liturgical context system now includes **smart persistence** to handle real-world clergy workflows:

1. **Set context before the service** - Configure names, gender, etc.
2. **Preview and verify** - Check that substitutions are correct
3. **Navigate freely** - Go to other pages, close browser, come back
4. **Context persists** - Settings remain until expiration or manual reset
5. **Auto-expiration** - Context clears after 24 hours by default

## How It Works

### Automatic Persistence

Context is automatically saved to `localStorage` and restored on page load:

```typescript
liturgicalContext.setSubject({
  gender: 'feminine',
  number: 'singular',
  firstName: 'Mary',
  fullName: 'Mary Johnson'
}, {
  serviceSlug: 'holy_baptism',
  expirationHours: 24  // Optional, defaults to 24
});
```

### What Gets Persisted

- **Primary subject** (name, gender, number)
- **Secondary subject** (for marriages)
- **Metadata** (when set, expiration time, service slug)

### Expiration Behavior

**Default: Midnight Tomorrow**

Context expires at the end of the day (11:59:59 PM), aligned with how clergy think:
- **0 days** = Expires at midnight **today** (same-day service)
- **1 day** = Expires at midnight **tomorrow** (next-day service, default)
- **2 days** = Expires at midnight **day after tomorrow**
- **3 days** = Expires at midnight **3 days from now**

This prevents:
- Stale data from previous services
- Wrong names in future services
- Privacy concerns with long-term storage

**Custom expiration:**

```typescript
// Same-day service - expires at midnight today
liturgicalContext.setSubject(subject, { expirationDays: 0 });

// Tomorrow's service - expires at midnight tomorrow (default)
liturgicalContext.setSubject(subject, { expirationDays: 1 });

// Sunday service (prepared on Friday) - expires at midnight Sunday
liturgicalContext.setSubject(subject, { expirationDays: 2 });

// Extend existing context to midnight 2 days from now
liturgicalContext.extendExpiration(2);
```

## Workflow Examples

### Baptism Preparation (Days Before Service)

```typescript
// Friday afternoon - clergy prepares for Sunday baptism
liturgicalContext.setSubject({
  gender: 'feminine',
  number: 'singular',
  firstName: 'Emma',
  fullName: 'Emma Grace Thompson'
}, {
  serviceSlug: 'holy_baptism',
  expirationDays: 2  // Expires at midnight Sunday
});

// Clergy previews the service
// Context persists through:
// - Navigating to other pages
// - Closing the browser
// - Returning Saturday to review
// - Opening on Sunday for the actual service
// - Auto-expires at midnight Sunday (after service is done)
```

### Marriage Ceremony

```typescript
// Thursday - prepare for Saturday wedding
liturgicalContext.setSubject({
  gender: 'masculine',
  number: 'singular',
  firstName: 'Michael',
  fullName: 'Michael James Anderson'
}, {
  serviceSlug: 'holy_matrimony',
  expirationDays: 2  // Expires at midnight Saturday
});

liturgicalContext.setSubject2({
  gender: 'feminine',
  number: 'singular',
  firstName: 'Sarah',
  fullName: 'Sarah Elizabeth Williams'
});

// Service text will show: "Michael James Anderson and Sarah Elizabeth Williams"
// Expires automatically at midnight on wedding day
```

### Burial Service (Same Day)

```typescript
// Morning of service - expires at midnight today
liturgicalContext.setSubject({
  gender: 'masculine',
  number: 'singular',
  firstName: 'Robert',
  fullName: 'Robert William Chen'
}, {
  serviceSlug: 'burial',
  expirationDays: 0  // Expires at midnight today
});
```

## Service-Specific Context

Associate context with specific services to prevent mix-ups:

```typescript
// Set context for baptism
liturgicalContext.setSubject(subject, { serviceSlug: 'holy_baptism' });

// Later, check if context matches
if (liturgicalContext.isForService('holy_baptism')) {
  // Safe to use context
} else {
  // Wrong service - prompt clergy to re-enter
}
```

## Manual Control

### Reset Context

```typescript
// After service is complete
liturgicalContext.reset();
```

### Check and Clear Expired

```typescript
// Manually trigger expiration check
liturgicalContext.clearIfExpired();
```

## UI Considerations

### Display Context Status

Show clergy what context is active:

```svelte
<script>
  import { liturgicalContext } from '$lib/stores/liturgical';
  
  $: hasContext = $liturgicalContext.subject !== undefined;
  $: expiresAt = $liturgicalContext._metadata?.expiresAt;
  $: timeRemaining = expiresAt ? new Date(expiresAt).toLocaleString() : '';
</script>

{#if hasContext}
  <div class="context-banner">
    <strong>Context Active:</strong>
    {$liturgicalContext.subject?.fullName || 'Subject set'}
    {#if $liturgicalContext.subject2}
      and {$liturgicalContext.subject2.fullName}
    {/if}
    <br>
    <small>Expires: {timeRemaining}</small>
    <button on:click={() => liturgicalContext.reset()}>Clear</button>
  </div>
{/if}
```

### Context Entry Form

```svelte
<script>
  import { liturgicalContext } from '$lib/stores/liturgical';
  
  let firstName = '';
  let fullName = '';
  let gender = 'masculine';
  let expirationHours = 24;
  
  function saveContext() {
    liturgicalContext.setSubject({
      gender,
      number: 'singular',
      firstName,
      fullName
    }, {
      serviceSlug: 'holy_baptism',
      expirationHours
    });
  }
</script>

<form on:submit|preventDefault={saveContext}>
  <input bind:value={firstName} placeholder="First name" required />
  <input bind:value={fullName} placeholder="Full name" required />
  
  <select bind:value={gender}>
    <option value="masculine">He/Him</option>
    <option value="feminine">She/Her</option>
    <option value="neutral">They/Them</option>
  </select>
  
  <label>
    Expires:
    <select bind:value={expirationDays}>
      <option value={0}>Midnight today (same-day service)</option>
      <option value={1}>Midnight tomorrow (default)</option>
      <option value={2}>Midnight in 2 days</option>
      <option value={3}>Midnight in 3 days</option>
    </select>
  </label>
  
  <button type="submit">Save Context</button>
</form>
```

## Storage Details

### Location
- **Browser:** `localStorage` under key `liturgicalContext`
- **Server:** Not persisted (SSR gets empty state)

### Privacy
- Stored locally on clergy's device only
- Not sent to server
- Cleared on expiration
- Can be manually cleared anytime

### Storage Format

```json
{
  "subject": {
    "gender": "feminine",
    "number": "singular",
    "firstName": "Emma",
    "fullName": "Emma Grace Thompson"
  },
  "_metadata": {
    "setAt": 1704123456789,
    "expiresAt": 1704209856789,
    "serviceSlug": "holy_baptism"
  }
}
```

## Best Practices

### 1. Set Expiration Based on Service Day

- **Same-day service:** 0 days (expires at midnight today)
- **Next-day service:** 1 day (expires at midnight tomorrow) - **default**
- **2-day prep:** 2 days (expires at midnight day after tomorrow)
- **3-day prep:** 3 days (expires at midnight 3 days from now)

### 2. Always Verify Before Service

Even with persistence, show clergy a confirmation:
- "Using context for: [Name]"
- "Click to confirm or change"

### 3. Clear After Service

Prompt clergy to clear context when service is complete:
- Prevents wrong names in future services
- Maintains privacy

### 4. Service-Specific Context

Always include `serviceSlug` to prevent context from wrong service type being applied.

## Future Enhancements

Possible additions:
- Multiple saved contexts (dropdown selection)
- Context templates/presets
- Backup/restore contexts
- Sync across devices (optional cloud storage)
