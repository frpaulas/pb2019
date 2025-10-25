#!/usr/bin/env node

/**
 * Script to add a new psalm to the JSON database
 *
 * Usage:
 *   1. Run the script: node scripts/add-psalm.cjs
 *   2. Enter psalm details when prompted
 *   3. For each verse, enter data in format: verse_number|line1|line2|hebrew (hebrew optional)
 *   4. Type 'done' when finished adding verses
 */

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/lib/db/psalms.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('=== Add New Psalm to Database ===\n');

  // Load existing database
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

  // Get psalm details
  const psalmNumber = await question('Psalm number: ');
  const name = await question('Name (e.g., "Beatus vir qui non abiit"): ');
  const title = await question('Title (e.g., "psalm 1"): ');

  if (db[psalmNumber]) {
    console.log(`\n⚠ WARNING: Psalm ${psalmNumber} already exists!`);
    const overwrite = await question('Overwrite? (yes/no): ');
    if (overwrite.toLowerCase() !== 'yes') {
      console.log('Cancelled.');
      rl.close();
      return;
    }
  }

  const verses = [];

  console.log('\nEnter verses (format: verse_number|line1|line2|hebrew)');
  console.log('Hebrew is optional. Type "done" when finished.\n');

  while (true) {
    const input = await question('Verse: ');

    if (input.trim().toLowerCase() === 'done') {
      break;
    }

    const parts = input.split('|');
    if (parts.length < 3) {
      console.log('❌ Invalid format. Need at least: verse_number|line1|line2');
      continue;
    }

    verses.push({
      vs: parseInt(parts[0].trim()),
      ln1: parts[1].trim(),
      ln2: parts[2].trim(),
      hebrew: parts[3] ? parts[3].trim() : ''
    });

    console.log(`✓ Added verse ${parts[0]}`);
  }

  if (verses.length === 0) {
    console.log('No verses added. Cancelled.');
    rl.close();
    return;
  }

  // Sort verses by number
  verses.sort((a, b) => a.vs - b.vs);

  // Add to database
  db[psalmNumber] = {
    number: parseInt(psalmNumber),
    name,
    title,
    verses
  };

  // Write back to file
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');

  console.log(`\n✅ Psalm ${psalmNumber} added successfully with ${verses.length} verses!`);

  rl.close();
}

main().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
