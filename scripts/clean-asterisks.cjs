#!/usr/bin/env node

/**
 * Script to remove trailing " *" from ln1 fields in psalms.json
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/lib/db/psalms.json');

console.log('Cleaning trailing " *" from ln1 fields...\n');

// Load database
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

let changeCount = 0;

// Process each psalm
for (const [psalmNum, psalm] of Object.entries(db)) {
  for (const verse of psalm.verses) {
    // Check if ln1 ends with " *"
    if (verse.ln1.endsWith(' *')) {
      const oldValue = verse.ln1;
      verse.ln1 = verse.ln1.slice(0, -2); // Remove last 2 characters
      console.log(`Psalm ${psalmNum}:${verse.vs}`);
      console.log(`  Before: "${oldValue}"`);
      console.log(`  After:  "${verse.ln1}"`);
      changeCount++;
    }
  }
}

if (changeCount === 0) {
  console.log('No changes needed. Database is clean! ✅');
} else {
  // Write back to file
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  console.log(`\n✅ Cleaned ${changeCount} verses!`);
}
