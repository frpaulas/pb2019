import { resolveTemplate } from './templateResolver';
import type { LiturgicalContextState } from '$lib/stores/liturgical';

/**
 * Parse markdown for bold (**text**), italic (*text* or _text_), lowercase (~text~),
 * line breaks ({{br}}), and template substitutions (__template__)
 * @param input - The text to parse
 * @param context - Optional liturgical context for template resolution
 * @returns HTML string with markdown converted to HTML tags
 */
export function parseMarkdown(input: string, context?: LiturgicalContextState): string {
	if (!input) return '';

	let result = input;

	// FIRST: Resolve templates __template|options__ if context is provided
	if (context) {
		result = resolveTemplate(result, context);
	}

	// Handle line breaks: {br}
	result = result.replace(/\{br\}/g, '<br />');

	// Handle blank lines NEXT: ___10___ creates a 10-character underscore blank
	// Replace with a temporary placeholder to avoid conflicts with bold/italic
	const blankPlaceholders: string[] = [];
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

	// Handle bold: **text**
	result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

	// Handle italic: *text* or _text_
	// Use negative lookbehind/lookahead to avoid matching ** or __ (bold/template markers)
	result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
	// For underscores, only match single _ if there's actual text between them (not double __)
	result = result.replace(/(?<!_)_([^_\s][^_]*?[^_\s]|[^_\s])_(?!_)/g, '<em>$1</em>');

	// Replace blank placeholders with actual underscore sequences LAST
	blankPlaceholders.forEach((blank, index) => {
		result = result.replace(`{{BLANK_${index}}}`, blank);
	});

	return result;
}
