# Feast Day Transfer Feature

## Overview

The feast day transfer feature automatically handles the liturgical rule that Sundays take precedence over most feast days. When certain feast days fall on a Sunday, they are transferred to the next available weekday.

## Implementation

The feature is implemented in `src/lib/calendar/rlds.ts` with the following key functions:

### Main Functions

1. **`shouldTransferFeast(year, month, day)`** - Determines if a feast should be transferred
2. **`getFeastDay(month, day, year?)`** - Gets the feast for a date, accounting for transfers
3. **`findNextAvailableDay(year, month, day)`** - Finds the next available day for transfer

### Transfer Rules

#### Principal Feasts - Type "PF" (NEVER transfer, even on Sunday)
- Easter Day (always Sunday)
- Ascension Day (always Thursday)
- The Day of Pentecost (always Sunday)
- Trinity Sunday (always Sunday)
- Christmas Day (December 25) - Type: PF
- The Epiphany (January 6) - Type: PF
- All Saints' Day (November 1) - Type: PF

#### Holy Days - Type "RLD" (ALWAYS transfer when on Sunday)
- Transfer to the following weekday whenever they fall on Sunday
- This ensures Sunday observances take precedence
- Examples: 
  - The Circumcision and Holy Name (1/1)
  - Confession of Peter the Apostle (1/18)
  - Conversion of Paul the Apostle (1/25)
  - The Annunciation (3/25)
  - The Transfiguration (8/6)
  - All Apostle and Evangelist feasts
  - And other Holy Days listed in BCP 2019
- Note: While BCP 2019 allows Holy Days to be observed on Sunday, this implementation always transfers them for consistency

#### Other RLD Feasts (MUST transfer when on Sunday)
- All other Red Letter Day (RLD) feasts that are NOT Holy Days must move when they fall on Sunday

#### ANG/ECU Commemorations (MUST transfer when on Sunday)
- Anglican (ANG) and Ecumenical (ECU) commemorations transfer when on Sunday

### Blocked Dates

Feasts cannot be transferred TO:
- Any Sunday
- Ash Wednesday
- Holy Week (Palm Sunday through Easter Eve)
- Easter Week (Easter Day through the following Saturday)
- Any date already occupied by another feast (cascading transfers)

## Usage Examples

### Example 1: Principal Feast on Sunday (No Transfer)
```typescript
// Christmas 2022 falls on Sunday - does NOT transfer
const result = shouldTransferFeast(2022, 12, 25);
// result.shouldTransfer === false

const feast = getFeastDay(12, 25, 2022);
// feast.name === "The Nativity of our Lord Jesus Christ Christmas"
```

### Example 2: Holy Day on Sunday (Always Transfers)
```typescript
// The Annunciation 2029 falls on Sunday - transfers
const result = shouldTransferFeast(2029, 3, 25);
// result.shouldTransfer === true
// result.transferredDate === { month: 3, day: 26 }

const feastOnOriginal = getFeastDay(3, 25, 2029);
// feastOnOriginal === null (transferred away)

const feastOnTransferred = getFeastDay(3, 26, 2029);
// feastOnTransferred.name === "The Annunciation..."
```

### Example 3: Confession of Peter on Sunday (Transfers)
```typescript
// Confession of Peter, Jan 18, 2026 falls on Sunday - transfers to Monday
const result = shouldTransferFeast(2026, 1, 18);
// result.shouldTransfer === true
// result.transferredDate === { month: 1, day: 19 }

const feastOnOriginal = getFeastDay(1, 18, 2026);
// feastOnOriginal === null (transferred away)

const feastOnTransferred = getFeastDay(1, 19, 2026);
// feastOnTransferred.name === "Confession of Peter the Apostle"
```

### Example 4: Cascading Transfer
```typescript
// Charles (Jan 30, 2028 - Sunday) transfers
// Jan 31 has Samuel Shoemaker, so Charles moves to Feb 1
const result = shouldTransferFeast(2028, 1, 30);
// result.transferredDate === { month: 2, day: 1 }

const feastOnFeb1 = getFeastDay(2, 1, 2028);
// feastOnFeb1.name === "Charles"
```

## Backward Compatibility

To maintain backward compatibility, the `year` parameter is optional:

```typescript
// Without year - returns feast without transfer logic
const feast = getFeastDay(12, 25);
// Works as before

// With year - applies transfer logic
const feastWithTransfer = getFeastDay(12, 25, 2022);
// Accounts for Sunday transfers
```

## Testing

Run the test suite with:
```bash
npm test -- rlds.test.ts
```

All 16 tests should pass, covering:
- Principal Feasts (never transfer)
- Holy Days in restricted seasons (must transfer)
- Holy Days outside restricted seasons (may stay)
- ANG/ECU commemorations (must transfer)
- Cascading transfers
- Edge cases

## Integration

The updated functions are exported from `src/lib/calendar/rlds.ts`:
- `getFeastDay(month, day, year?)` - Updated to handle transfers
- `isRedLetterDay(month, day, year?)` - Updated to use transfer-aware lookup
- `getObservances(month, day, year?)` - Updated to use transfer-aware lookup
- `shouldTransferFeast(year, month, day)` - New function to check transfer status
