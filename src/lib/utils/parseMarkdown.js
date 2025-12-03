/**
 * Parse markdown for bold (**text** or __text__), italic (*text* or _text_), and lowercase (~text~)
 * @param {string} input - The text to parse
 * @returns {string} - HTML string with markdown converted to HTML tags
 */
export function parseMarkdown(input) {
	if (!input) return '';

	let result = input;

	// Handle blank lines FIRST: ___10___ creates a 10-character underscore blank
	// Replace with a temporary placeholder to avoid conflicts with bold/italic
	const blankPlaceholders = [];
	result = result.replace(/___(\d+)___/g, (match, length) => {
		const count = parseInt(length);
		const placeholder = `{{BLANK_${blankPlaceholders.length}}}`;
		// Create a solid underline using border-bottom, width based on character count
		const width = count * 0.6; // Approximate ch width
		blankPlaceholders.push(
			`<span style="display: inline-block; width: ${width}em; border-bottom: 1px solid currentColor; margin: 0 0.1em;"></span>`
		);
		return placeholder;
	});

	// Handle lowercase override: ~text~
	result = result.replace(/~(.+?)~/g, '<span class="normal-case">$1</span>');

	// Handle bold first: **text** or __text__
	result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	result = result.replace(/__(.+?)__/g, '<strong>$1</strong>');

	// Handle italic: *text* or _text_
	// Use negative lookbehind/lookahead to avoid matching ** or __ (bold markers)
	result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
	// For underscores, only match if there's actual text (not just underscores/spaces) between them
	result = result.replace(/(?<!_)_([^_\s][^_]*?[^_\s]|[^_\s])_(?!_)/g, '<em>$1</em>');

	// Replace blank placeholders with actual underscore sequences LAST
	blankPlaceholders.forEach((blank, index) => {
		result = result.replace(`{{BLANK_${index}}}`, blank);
	});

	return result;
}
