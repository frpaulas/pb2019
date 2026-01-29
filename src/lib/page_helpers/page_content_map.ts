/**
 * Maps page numbers to their content files.
 * For consolidated files, multiple page numbers map to the same file.
 */

type PageContentMap = {
	[key: string]: {
		file: string;
		isConsolidated: boolean;
		consolidatedRange?: string[]; // All pages included in this consolidated file
	};
};

export const PAGE_CONTENT_MAP: PageContentMap = {
	// All content now comes from service_pages.json - no consolidation needed
};

/**
 * Get the content file for a given page number
 */
export function getContentFile(pageNum: string): string {
	const mapping = PAGE_CONTENT_MAP[pageNum];
	return mapping ? mapping.file : pageNum; // Default to pageNum if not in map
}

/**
 * Check if a page is part of a consolidated file
 */
export function isConsolidatedPage(pageNum: string): boolean {
	return PAGE_CONTENT_MAP[pageNum]?.isConsolidated ?? false;
}

/**
 * Get all pages in the same consolidated range as the given page
 */
export function getConsolidatedRange(pageNum: string): string[] | null {
	return PAGE_CONTENT_MAP[pageNum]?.consolidatedRange ?? null;
}

/**
 * Given a list of page numbers to load, deduplicate consolidated files
 * Returns unique content files to load with their display page numbers
 */
export function deduplicatePageLoads(
	pageNums: string[]
): Array<{ file: string; displayPage: string }> {
	const seen = new Set<string>();
	const result: Array<{ file: string; displayPage: string }> = [];

	for (const pageNum of pageNums) {
		const file = getContentFile(pageNum);
		if (!seen.has(file)) {
			seen.add(file);
			result.push({ file, displayPage: pageNum });
		}
	}

	return result;
}
