// Quick test for January feasts
const data = require('./src/lib/calendar/rlds.json');

console.log('Checking feast types in January 2026:');
console.log('');
console.log('Jan 1 (Circumcision):', data['1-1'].type, '- Holy Day');
console.log('Jan 6 (Epiphany):', data['1-6'].type, '- Principal Feast');
console.log('Jan 18 (Confession of Peter):', data['1-18'].type, '- Holy Day');
console.log('Jan 25 (Conversion of Paul):', data['1-25'].type, '- Holy Day');
console.log('');
console.log('Expected behavior on Sundays:');
console.log('- PF (Principal Feasts): NEVER transfer');
console.log('- RLD (Holy Days) outside Advent/Lent/Easter: MAY stay on Sunday');
console.log('- RLD (Holy Days) during Advent/Lent/Easter: MUST transfer');
console.log('- RLD (other): MUST transfer');
console.log('- ANG/ECU: MUST transfer');
