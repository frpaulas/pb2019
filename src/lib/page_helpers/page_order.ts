// Complete ordered list of all pages in the book
export const PAGE_ORDER = [
	'iii', 'iv', 'v', 'vi', 'vii',
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
	'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
	'21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
	'31', '33', '34', '35', '36', '37', '38', '39',
	'41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
	'51', '52', '53', '54', '55', '56', '57', '58', '59'
] as const;

export function getNextPage(currentPage: string): string | null {
	const index = PAGE_ORDER.indexOf(currentPage);
	if (index === -1 || index === PAGE_ORDER.length - 1) return null;
	return PAGE_ORDER[index + 1];
}

export function getPrevPage(currentPage: string): string | null {
	const index = PAGE_ORDER.indexOf(currentPage);
	if (index <= 0) return null;
	return PAGE_ORDER[index - 1];
}

export function sortPages(pages: string[]): string[] {
	return [...pages].sort((a, b) => {
		const aIndex = PAGE_ORDER.indexOf(a);
		const bIndex = PAGE_ORDER.indexOf(b);
		return aIndex - bIndex;
	});
}
