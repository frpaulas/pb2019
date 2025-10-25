#!/usr/bin/env node

/**
 * Simple test script to verify the psalm database structure
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/lib/db/psalms.json');

console.log('Testing Psalm Database...\n');

// Load database
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

// Test 1: Check structure
console.log('✓ Database loaded successfully');
console.log(`  Found ${Object.keys(db).length} psalms\n`);

// Test 2: Check Psalm 1
const psalm1 = db['1'];
if (!psalm1) {
  console.error('✗ Psalm 1 not found');
  process.exit(1);
}

console.log('✓ Psalm 1 found');
console.log(`  Number: ${psalm1.number}`);
console.log(`  Name: ${psalm1.name}`);
console.log(`  Title: ${psalm1.title}`);
console.log(`  Verses: ${psalm1.verses.length}\n`);

// Test 3: Verify verse structure
const verse1 = psalm1.verses[0];
if (!verse1.vs || !verse1.ln1 || !verse1.ln2 || verse1.hebrew === undefined) {
  console.error('✗ Verse structure invalid');
  console.error('  Expected: vs, ln1, ln2, hebrew');
  console.error('  Got:', Object.keys(verse1));
  process.exit(1);
}

console.log('✓ Verse structure valid');
console.log(`  Verse ${verse1.vs}:`);
console.log(`    ln1: ${verse1.ln1.substring(0, 50)}...`);
console.log(`    ln2: ${verse1.ln2.substring(0, 50)}...\n`);

// Test 4: Check all psalms have required fields
let errors = 0;
for (const [key, psalm] of Object.entries(db)) {
  if (!psalm.number || !psalm.name || !psalm.title || !psalm.verses) {
    console.error(`✗ Psalm ${key} missing required fields`);
    errors++;
  }

  for (const verse of psalm.verses) {
    if (!verse.vs || !verse.ln1 || !verse.ln2 || verse.hebrew === undefined) {
      console.error(`✗ Psalm ${key} verse ${verse.vs} has invalid structure`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n✗ Found ${errors} errors`);
  process.exit(1);
}

console.log('✓ All psalms validated');
console.log('\n=== Test Summary ===');
console.log('All tests passed! ✅');
console.log(`\nPsalms in database: ${Object.keys(db).map(k => parseInt(k)).sort((a,b) => a-b).join(', ')}`);
