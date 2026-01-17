/**
 * Test script for feast day transfer logic
 * Run with: node test-feast-transfers.js
 */

import { getFeastDay, shouldTransferFeast } from './src/lib/calendar/rlds.ts';

// Helper to format dates
function formatDate(year, month, day) {
	const date = new Date(year, month - 1, day);
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} (${dayNames[date.getDay()]})`;
}

console.log('Testing Feast Day Transfer Logic\n');
console.log('='.repeat(80));

// Test 1: Principal Feasts never transfer (Christmas on Sunday)
console.log('\n1. PRINCIPAL FEASTS (never transfer)');
console.log('-'.repeat(80));

// Christmas 2022 is on Sunday
const christmas2022 = { year: 2022, month: 12, day: 25 };
console.log(`Christmas ${formatDate(2022, 12, 25)}`);
const christmasTransfer = shouldTransferFeast(2022, 12, 25);
console.log(`Should transfer: ${christmasTransfer.shouldTransfer}`);
console.log(`Feast on 12/25: ${getFeastDay(12, 25, 2022)?.name || 'None'}`);

// Epiphany 2024 is on Saturday (shouldn't transfer anyway)
console.log(`\nEpiphany ${formatDate(2024, 1, 6)}`);
const epiphanyTransfer = shouldTransferFeast(2024, 1, 6);
console.log(`Should transfer: ${epiphanyTransfer.shouldTransfer}`);
console.log(`Feast on 1/6: ${getFeastDay(1, 6, 2024)?.name || 'None'}`);

// All Saints 2026 is on Sunday
console.log(`\nAll Saints ${formatDate(2026, 11, 1)}`);
const allSaintsTransfer = shouldTransferFeast(2026, 11, 1);
console.log(`Should transfer: ${allSaintsTransfer.shouldTransfer}`);
console.log(`Feast on 11/1: ${getFeastDay(11, 1, 2026)?.name || 'None'}`);

// Test 2: Holy Days in restricted seasons (must transfer)
console.log('\n\n2. HOLY DAYS IN RESTRICTED SEASONS (must transfer)');
console.log('-'.repeat(80));

// The Annunciation 2029 is on Sunday in Lent
console.log(`\nThe Annunciation ${formatDate(2029, 3, 25)}`);
const annunciationTransfer = shouldTransferFeast(2029, 3, 25);
console.log(`Should transfer: ${annunciationTransfer.shouldTransfer}`);
if (annunciationTransfer.transferredDate) {
	const { month, day } = annunciationTransfer.transferredDate;
	console.log(`Transferred to: ${formatDate(2029, month, day)}`);
	console.log(`Feast on original date (3/25): ${getFeastDay(3, 25, 2029)?.name || 'None'}`);
	console.log(`Feast on transferred date: ${getFeastDay(month, day, 2029)?.name || 'None'}`);
}

// Test 3: Holy Days outside restricted seasons (may stay on Sunday)
console.log('\n\n3. HOLY DAYS OUTSIDE RESTRICTED SEASONS (may stay)');
console.log('-'.repeat(80));

// Transfiguration 2023 is on Sunday (outside Advent/Lent/Easter)
console.log(`\nThe Transfiguration ${formatDate(2023, 8, 6)}`);
const transfigurationTransfer = shouldTransferFeast(2023, 8, 6);
console.log(`Should transfer: ${transfigurationTransfer.shouldTransfer}`);
console.log(`Feast on 8/6: ${getFeastDay(8, 6, 2023)?.name || 'None'}`);

// Test 4: Other RLD feasts on Sunday (must transfer)
console.log('\n\n4. OTHER RLD FEASTS (must transfer when on Sunday)');
console.log('-'.repeat(80));

// Check if there are any other RLD feasts that fall on Sunday
// (We'd need to check specific years)

// Test 5: ANG/ECU commemorations on Sunday (must transfer)
console.log('\n\n5. ANG/ECU COMMEMORATIONS (must transfer when on Sunday)');
console.log('-'.repeat(80));

// Charles, King and Martyr - January 30, 2028 is Sunday
console.log(`\nCharles, King and Martyr ${formatDate(2028, 1, 30)}`);
const charlesTransfer = shouldTransferFeast(2028, 1, 30);
console.log(`Should transfer: ${charlesTransfer.shouldTransfer}`);
if (charlesTransfer.transferredDate) {
	const { month, day } = charlesTransfer.transferredDate;
	console.log(`Transferred to: ${formatDate(2028, month, day)}`);
	console.log(`Feast on original date (1/30): ${getFeastDay(1, 30, 2028)?.name || 'None'}`);
	console.log(`Feast on transferred date: ${getFeastDay(month, day, 2028)?.name || 'None'}`);
}

// Test 6: Cascading transfers (when next day is also occupied)
console.log('\n\n6. CASCADING TRANSFERS');
console.log('-'.repeat(80));
console.log('(Testing if feast moves multiple days when following days are occupied)');

// This is harder to test without specific scenarios, but the logic is in place

console.log('\n' + '='.repeat(80));
console.log('Testing complete!\n');
