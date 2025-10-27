#!/usr/bin/env node

/**
 * Export psalms.json to normalized text format
 * This allows you to review/edit all data in one place before re-importing
 *
 * Usage:
 *   node scripts/export-to-normalized.cjs > existing_psalms.txt
 *
 * Or to prepend to tmp.txt:
 *   node scripts/export-to-normalized.cjs | cat - src/lib/db/tmp.txt > src/lib/db/tmp_complete.txt
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/lib/db/psalms.json');

function main() {
  // Load database
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

  // Sort keys numerically where possible, then alphabetically
  const sortedKeys = Object.keys(db).sort((a, b) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum; // Both numbers, sort numerically
    }
    if (!isNaN(aNum)) return -1; // a is number, b is not - numbers first
    if (!isNaN(bNum)) return 1;  // b is number, a is not - numbers first
    return a.localeCompare(b);   // Both non-numbers, sort alphabetically
  });

  let output = [];
  let currentHebrew = '';

  for (const key of sortedKeys) {
    const entry = db[key];

    // Entry header
    output.push(`=== ${key}|${entry.name}|${entry.title}`);

    // Process verses
    for (const verse of entry.verses) {
      // Check if Hebrew section changed
      if (verse.hebrew !== currentHebrew) {
        if (verse.hebrew) {
          output.push(verse.hebrew);
        }
        currentHebrew = verse.hebrew;
      }

      // Verse data
      output.push(verse.vs.toString());
      output.push(verse.ln1);
      output.push(verse.ln2);
    }

    // Reset Hebrew for next entry
    currentHebrew = '';
  }

  // Output to stdout
  console.log(output.join('\n'));
}

main();
