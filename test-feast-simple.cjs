/**
 * Simple test script for feast day transfer logic
 * Run with: node test-feast-simple.cjs
 */

// Helper to check if a date is Sunday
function isSunday(year, month, day) {
	const date = new Date(year, month - 1, day);
	return date.getDay() === 0;
}

// Helper to format dates
function formatDate(year, month, day) {
	const date = new Date(year, month - 1, day);
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} (${dayNames[date.getDay()]})`;
}

console.log('Testing Feast Day Transfer Logic\n');
console.log('='.repeat(80));

// Test basic Sunday detection
console.log('\n1. SUNDAY DETECTION');
console.log('-'.repeat(80));
console.log(`Christmas 2022 (12/25): ${formatDate(2022, 12, 25)} - is Sunday: ${isSunday(2022, 12, 25)}`);
console.log(`Epiphany 2024 (1/6): ${formatDate(2024, 1, 6)} - is Sunday: ${isSunday(2024, 1, 6)}`);
console.log(`All Saints 2026 (11/1): ${formatDate(2026, 11, 1)} - is Sunday: ${isSunday(2026, 11, 1)}`);

// Test dates that should transfer
console.log('\n\n2. DATES TO CHECK FOR TRANSFER');
console.log('-'.repeat(80));

const testDates = [
	{ year: 2029, month: 3, day: 25, name: 'The Annunciation', note: 'Sunday in Lent - should transfer' },
	{ year: 2023, month: 8, day: 6, name: 'The Transfiguration', note: 'Sunday outside restricted seasons - may stay' },
	{ year: 2028, month: 1, day: 30, name: 'Charles, King and Martyr', note: 'ANG on Sunday - should transfer' },
	{ year: 2026, month: 3, day: 1, name: 'David, Bishop of Wales', note: 'ANG on Sunday - should transfer' },
];

for (const test of testDates) {
	console.log(`\n${test.name} - ${formatDate(test.year, test.month, test.day)}`);
	console.log(`Note: ${test.note}`);
	console.log(`Is Sunday: ${isSunday(test.year, test.month, test.day)}`);
}

console.log('\n' + '='.repeat(80));
console.log('\nTo fully test the implementation, you can use the calendar functions');
console.log('directly in the application or write unit tests.\n');
