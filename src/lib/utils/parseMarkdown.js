/**
 * Parse markdown for bold (**text** or __text__), italic (*text* or _text_), and lowercase (~text~)
 * @param {string} input - The text to parse
 * @returns {string} - HTML string with markdown converted to HTML tags
 */
export function parseMarkdown(input) {
	if (!input) return '';

	let result = input;

	// Handle lowercase override: ~text~
	result = result.replace(/~(.+?)~/g, '<span class="normal-case">$1</span>');

	// Handle bold first: **text** or __text__
	result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	result = result.replace(/__(.+?)__/g, '<strong>$1</strong>');

	// Handle italic: *text* or _text_
	// Use negative lookbehind/lookahead to avoid matching ** or __ (bold markers)
	result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
	result = result.replace(/(?<!_)_([^_]+?)_(?!_)/g, '<em>$1</em>');

	return result;
}
