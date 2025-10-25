#!/usr/bin/env node

/**
 * Script to import psalm verses from formatted text file
 *
 * Input format (one verse per 3 lines):
 * 1
 * First line text *
 * Second line text
 * 2
 * First line text *
 * Second line text
 * ...
 *
 * Usage:
 *   node scripts/import-psalm-from-text.cjs <psalm_number> <name> <title> < input.txt
 *
 * Example:
 *   node scripts/import-psalm-from-text.cjs 10 "Ut quid, Domine?" "psalm 10" < psalm10.txt
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/lib/db/psalms.json');

function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error('Usage: node import-psalm-from-text.cjs <psalm_number> <name> <title> < input.txt');
    process.exit(1);
  }

  const [psalmNumber, name, title] = args;

  // Read from stdin
  const input = fs.readFileSync(0, 'utf-8');
  const lines = input.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);

  if (lines.length % 3 !== 0) {
    console.error(`Error: Expected lines to be multiple of 3 (got ${lines.length})`);
    console.error('Format: verse_number, line1, line2, ...');
    process.exit(1);
  }

  const verses = [];
  for (let i = 0; i < lines.length; i += 3) {
    const vs = parseInt(lines[i]);
    const ln1 = lines[i + 1];
    const ln2 = lines[i + 2];

    if (isNaN(vs)) {
      console.error(`Error: Invalid verse number at line ${i + 1}: "${lines[i]}"`);
      process.exit(1);
    }

    verses.push({ vs, ln1, ln2, hebrew: '' });
  }

  // Load database
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

  if (db[psalmNumber]) {
    console.error(`Warning: Psalm ${psalmNumber} already exists and will be overwritten.`);
  }

  // Add psalm
  db[psalmNumber] = {
    number: parseInt(psalmNumber),
    name,
    title,
    verses
  };

  // Write back
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');

  console.log(`✅ Psalm ${psalmNumber} imported successfully with ${verses.length} verses!`);
}

main();
