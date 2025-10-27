#!/usr/bin/env node

/**
 * Check tmp.txt for formatting issues and show specific problem areas
 */

const fs = require('fs');
const path = require('path');

const TMP_PATH = path.join(__dirname, '../src/lib/db/tmp.txt');

function main() {
  const input = fs.readFileSync(TMP_PATH, 'utf-8');
  const lines = input.split('\n');

  let entryKey = '';
  let entryStartLine = 0;
  let lineBuffer = [];
  let issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    if (line.startsWith('===')) {
      // Check previous entry
      if (entryKey && lineBuffer.length > 0 && lineBuffer.length % 3 !== 0) {
        issues.push({
          psalm: entryKey,
          startLine: entryStartLine,
          lines: [...lineBuffer],
          total: lineBuffer.length,
          remainder: lineBuffer.length % 3
        });
      }

      const match = line.match(/^===\s*([^|]+)\|/);
      entryKey = match ? match[1].trim() : 'unknown';
      entryStartLine = lineNum;
      lineBuffer = [];
    } else if (entryKey) {
      const trimmed = line.trim();
      // Skip Hebrew section markers (all uppercase, 2+ chars)
      if (trimmed && /^[A-Z]+$/.test(trimmed) && trimmed.length > 1) {
        continue;
      }
      if (trimmed) {
        lineBuffer.push({lineNum, text: trimmed});
      }
    }
  }

  // Check last entry
  if (entryKey && lineBuffer.length > 0 && lineBuffer.length % 3 !== 0) {
    issues.push({
      psalm: entryKey,
      startLine: entryStartLine,
      lines: [...lineBuffer],
      total: lineBuffer.length,
      remainder: lineBuffer.length % 3
    });
  }

  if (issues.length === 0) {
    console.log('✅ No formatting issues found!');
    console.log('All entries have complete verses (lines divisible by 3).');
    return;
  }

  console.log(`Found ${issues.length} psalm(s) with incomplete verses:\n`);

  // Show first few issues with detail
  const showCount = Math.min(3, issues.length);

  for (let i = 0; i < showCount; i++) {
    const issue = issues[i];
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Psalm ${issue.psalm} (header at line ${issue.startLine})`);
    console.log(`Total verse lines: ${issue.total} (${issue.remainder} extra line${issue.remainder > 1 ? 's' : ''})`);
    console.log(`${'='.repeat(60)}`);

    // Show the incomplete verse at the end
    const incompleteStart = issue.total - issue.remainder - 3;
    const showStart = Math.max(0, incompleteStart);
    const showLines = issue.lines.slice(showStart);

    console.log('\nLast complete verse + incomplete lines:');
    showLines.forEach((l, idx) => {
      const pos = showStart + idx;
      const marker = pos >= incompleteStart + 3 ? ' ⚠️  INCOMPLETE' : '';
      console.log(`  Line ${l.lineNum}: ${l.text}${marker}`);
    });
  }

  if (issues.length > showCount) {
    console.log(`\n... and ${issues.length - showCount} more issue(s).`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Summary of all issues:');
  console.log('='.repeat(60));
  issues.forEach(issue => {
    console.log(`  Psalm ${issue.psalm.padEnd(4)} - Line ${issue.startLine.toString().padStart(5)} - ${issue.remainder} extra line(s)`);
  });
}

main();
