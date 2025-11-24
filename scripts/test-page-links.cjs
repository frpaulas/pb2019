#!/usr/bin/env node
/**
 * Test page link parsing
 */

const { RawToJsonConverter } = require('./convert-raw-to-json.cjs');

const converter = new RawToJsonConverter();

// Test cases
const testCases = [
	'The Celebrant may begin with the sentences on page 140.',
	'Use one of the seasonal greetings on pages 145-146.',
	'The Celebrant says this or a seasonal greeting on pages 145-146 or another option on page 99.',
	'No page links in this text.',
	'See page 100 and also on page 200 for more.'
];

console.log('Testing page link detection:\n');

testCases.forEach((text, i) => {
	console.log(`Test ${i + 1}: "${text}"`);
	const result = converter.parsePageLinks(text);
	console.log(JSON.stringify(result, null, 2));
	console.log('');
});
