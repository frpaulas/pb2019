const last_page: string = '802';

export function next_page(num: string): string {
	switch (true) {
		case num === 'iii':
			return 'iv';

		case num === 'iv':
			return 'v';

		case num === 'v':
			return 'vi';

		case num === 'vi':
			return 'vii';

		case num === 'vii':
			return 'viii';

		case num === 'viii':
			return '1';

		case num >= '1' && num < last_page:
			return (Number(num) + 1).toString();

		case num >= last_page:
			return last_page;

		default:
			return 'iii';
	}
}

export function prev_page(num: string): string {
	switch (true) {
		case num === 'iii':
			return 'iii';

		case num === 'iv':
			return 'iii';

		case num === 'v':
			return 'iv';

		case num === 'vi':
			return 'v';

		case num === 'vii':
			return 'vi';

		case num === 'viii':
			return 'vii';

		case num === '1':
			return 'viii';

		case num > '1' && num <= last_page:
			return (Number(num) - 1).toString();

		default:
			return 'iii';
	}
}

export function getPageName(num: string) {
	const n: number = Number(num);
	for (const [k, v] of pageNameMap) {
		if (n <= Number(k)) return v.toString().toUpperCase();
	}
	return '';
}

const pageNameMap = [
	[5, 'preface'],
	[10, 'concerning the divine service'],
	[32, 'Daily morning prayer'],
	[40, 'midday prayer'],
	[56, 'evening prayer'],
	[66, 'compline'],
	[78, 'family prayer'],
	[90, 'supplemental canticles'],
	[99, 'great litany'],
	[104, 'decalogue'],
	[122, 'HE: anglican standard text'],
	[138, 'HE: renewed ancient text'],
	[144, 'additional directions'],
	[146, 'seasonal greetings'],
	[148, 'the exhortation'],
	[151, 'offertory sentences'],
	[160, 'proper prefaces'],
	[174, 'holy baptism'],
	[182, 'confirmation, reception, and reaffirmation'],
	[193, 'baptism with confirmation'],
	[200, 'renewal of baptismal vows'],
	[214, 'holy matrimony'],
	[222, 'the birth or adoption of a child'],
	[224, 'reconciliation of penitents'],
	[226, 'ministry to the sick'],
	[230, 'communion to the sick'],
	[236, 'additional prayers for the sick'],
	[242, 'ministry to the dying'],
	[248, 'prayers for a vigil'],
	[268, 'burial of the dead'],
	[269, 'selection of psalms'],
	[471, 'psalms 1-150'],
	[482, 'ordination of a deacon'],
	[496, 'ordination of a priest'],
	[509, 'ordination and consecration of a bishop'],
	[514, 'litany for ordinations'],
	[524, 'institution of a rector'],
	[542, 'consecration and dedication of a place of worship'],
	[553, 'ash wednesday'],
	[559, 'palm sunday'],
	[564, 'maundy thursday'],
	[577, 'good friday'],
	[581, 'holy saturday'],
	[597, 'great vigil of easter'],
	[641, 'collects of the christian year'],
	[686, 'occasional prayers'],
	[690, 'calendar of the Christian year'],
	[712, 'calendar of holydays and commemorations'],
	[715, 'tables for finding the date of easter'],
	[733, 'sunday, holy day, and commenoration lectionary'],
	[765, 'daily office lectionary'],
	[767, 'fundamental declaration of the province'],
	[768, 'concerning the nicene creed'],
	[771, 'athanasian creed'],
	[790, 'thirty-nine articles of religion'],
	[793, 'jerusalem declaration'],
	[797, 'preface of the book of common prayer (1549)'],
	[802, 'preface of the book of common prayer (1662)']
];
