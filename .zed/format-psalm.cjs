#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Force output to appear
console.log('Starting Format Psalm task...');

// Debug: write to a log file to see what's happening
const debugLog = `/tmp/psalm-debug-${Date.now()}.log`;

const input = process.env.ZED_SELECTED_TEXT || '';
fs.writeFileSync(debugLog, `Input: "${input}"\nLength: ${input.length}\n`);

const lines = input.trim().split('\n');
fs.appendFileSync(debugLog, `Lines count: ${lines.length}\n`);

if (lines.length < 3) {
	fs.appendFileSync(debugLog, 'ERROR: Less than 3 lines\n');
	console.error('ERROR: Please select 3 lines: verse number, line 1, and line 2');
	process.exit(1);
}

const vs = lines[0].trim();
const ln1 = lines[1].trim();
const ln2 = lines[2].trim();

console.log('Processing verse', vs);

const output = `<Psalm
\tvs="${vs}"
\tln1="${ln1}"
\tln2="${ln2}"
/>
`;

fs.appendFileSync(debugLog, `Output: "${output}"\n`);

console.log('Copying to clipboard...');

// Copy to clipboard - write to temp file to avoid xclip blocking
const tempFile = `/tmp/psalm-clip-${Date.now()}.txt`;
try {
	// Write output to temp file
	fs.writeFileSync(tempFile, output);

	// Copy from file using background process to avoid blocking
	execSync(`nohup sh -c 'cat "${tempFile}" | xclip -selection clipboard' > /dev/null 2>&1 &`);

	// Small delay to ensure clipboard is set
	execSync('sleep 0.1');

	// Clean up temp file
	fs.unlinkSync(tempFile);

	fs.appendFileSync(debugLog, 'Clipboard copy successful\n');
	console.log('✓ DONE! Press Ctrl+V to paste.');
} catch (err) {
	fs.appendFileSync(debugLog, `Clipboard error: ${err.message}\n`);
	console.error('✗ Clipboard error:', err.message);
	// Clean up temp file if it exists
	try {
		fs.unlinkSync(tempFile);
	} catch (e) {}
	process.exit(1);
}
