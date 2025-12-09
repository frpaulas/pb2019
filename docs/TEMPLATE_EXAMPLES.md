# Template System - Conversion Examples

This document shows how to convert existing italicized text to use the new template system.

## Converting Existing Italicized Pronouns

### Before (Old Format)
```json
{
  "text": "Defend, O Lord, this your servant _N_. with your heavenly grace, that _he_ may continue yours for ever, and daily increase in your Holy Spirit more and more until he comes into the fullness of your everlasting kingdom."
}
```

### After (New Template Format)
```json
{
  "text": "Defend, O Lord, this your servant __N.__ with your heavenly grace, that __he|she|they__ may continue yours for ever, and daily increase in your Holy Spirit more and more until __he|she|they__ comes into the fullness of your everlasting kingdom."
}
```

**Note:** The second "he" (not italicized) should also be converted to maintain consistency.

## Baptism Example

### Before
```json
{
  "text": "Today, on behalf of this child, you shall make vows to renounce the devil and all his works, to trust God wholeheartedly, and to serve him faithfully. It is your task to see that this child is taught, as soon as he is able to learn, the meaning of all these vows, and of the Faith that you will profess as revealed in the Holy Scriptures. He must come to put his faith in Jesus Christ, and learn the Creeds, the Lord's Prayer, the Ten Commandments, and all other things that a Christian ought to know, believe, and do for the welfare of his soul."
}
```

### After
```json
{
  "text": "Today, on behalf of this child, you shall make vows to renounce the devil and all __his|her|their__ works, to trust God wholeheartedly, and to serve __him|her|them__ faithfully. It is your task to see that this child is taught, as soon as __he|she|they__ is able to learn, the meaning of all these vows, and of the Faith that you will profess as revealed in the Holy Scriptures. __He|She|They__ must come to put __his|her|their__ faith in Jesus Christ, and learn the Creeds, the Lord's Prayer, the Ten Commandments, and all other things that a Christian ought to know, believe, and do for the welfare of __his|her|their__ soul."
}
```

## Burial/Committal Example

### Before
```json
{
  "text": "In sure and certain hope of the resurrection to eternal life through our Lord Jesus Christ, we commend to Almighty God our _brother N._, and we commit his body to the ground [_or_ the deep _or_ its resting place]; earth to earth, ashes to ashes, dust to dust. The Lord bless _him_ and keep _him_, the Lord make his face to shine upon _him_ and be gracious unto _him_, the Lord lift up his countenance upon _him_ and give _him_ peace. **Amen.**"
}
```

### After
```json
{
  "text": "In sure and certain hope of the resurrection to eternal life through our Lord Jesus Christ, we commend to Almighty God our __brother|sister|sibling__ __N.__, and we commit __his|her|their__ body to the ground [_or_ the deep _or_ its resting place]; earth to earth, ashes to ashes, dust to dust. The Lord bless __him|her|them__ and keep __him|her|them__, the Lord make __his|her|their__ face to shine upon __him|her|them__ and be gracious unto __him|her|them__, the Lord lift up __his|her|their__ countenance upon __him|her|them__ and give __him|her|them__ peace. **Amen.**"
}
```

## Confirmation Example

### Before
```json
{
  "text": "Strengthen, O Lord, with your Holy Spirit, your servant _N_.; empower _him_ for your service; and sustain _him_ all the days of _his_ life."
}
```

### After
```json
{
  "text": "Strengthen, O Lord, with your Holy Spirit, your servant __N.__; empower __him|her|them__ for your service; and sustain __him|her|them__ all the days of __his|her|their__ life."
}
```

## Multiple Candidates Example

### Before
```json
{
  "text": "Let us now pray for _these Candidates_ who _are_ to receive the Sacrament of Baptism."
}
```

### After
```json
{
  "text": "Let us now pray for __this Candidate|these Candidates__ who __is|are__ to receive the Sacrament of Baptism."
}
```

## DPB Format Examples

The same patterns apply to `.dpb` files:

### Before
```
tb: Defend, O Lord, this your servant _N_. with your heavenly grace,
that _he_ may continue yours for ever...
```

### After
```
tb: Defend, O Lord, this your servant __N.__ with your heavenly grace,
that __he|she|they__ may continue yours for ever...
```

## Conversion Tips

1. **Find italicized pronouns:** Search for `_he_`, `_him_`, `_his_`, etc.
2. **Convert to templates:** Replace with `__he|she|they__`, `__him|her|them__`, `__his|her|their__`
3. **Check non-italicized:** Look for pronouns that should have been italicized but weren't
4. **Gender nouns:** Convert `_brother_` to `__brother|sister|sibling__`
5. **Name placeholders:** Convert `_N_.` to `__N.__` and `_N.N._` to `__N.N.__`
6. **Number agreement:** Look for pairs like "is/are", "has/have", "this/these" and convert to `__is|are__`

## Quick Find/Replace Patterns

You can use these regex patterns to help with conversion:

- `_he_` → `__he|she|they__`
- `_him_` → `__him|her|them__`
- `_his_` → `__his|her|their__`
- `_brother_` → `__brother|sister|sibling__`
- `_N_\.` → `__N.__`
- `_N\.N\._` → `__N.N.__`

**Warning:** Always manually review conversions to ensure:
- Correct grammatical agreement
- Proper context (some "his" are possessive pronouns, others are possessive adjectives)
- Appropriate number agreement (singular/plural)
