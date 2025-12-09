import type { SubjectContext, LiturgicalContextState } from '$lib/stores/liturgical';

/**
 * Pronoun mapping for different genders and cases
 */
const PRONOUNS = {
	nominative: {
		masculine: { singular: 'he', plural: 'they' },
		feminine: { singular: 'she', plural: 'they' },
		neutral: { singular: 'they', plural: 'they' }
	},
	objective: {
		masculine: { singular: 'him', plural: 'them' },
		feminine: { singular: 'her', plural: 'them' },
		neutral: { singular: 'them', plural: 'them' }
	},
	possessive: {
		masculine: { singular: 'his', plural: 'their' },
		feminine: { singular: 'her', plural: 'their' },
		neutral: { singular: 'their', plural: 'their' }
	},
	possessivePronoun: {
		masculine: { singular: 'his', plural: 'theirs' },
		feminine: { singular: 'hers', plural: 'theirs' },
		neutral: { singular: 'theirs', plural: 'theirs' }
	},
	reflexive: {
		masculine: { singular: 'himself', plural: 'themselves' },
		feminine: { singular: 'herself', plural: 'themselves' },
		neutral: { singular: 'themselves', plural: 'themselves' }
	}
};

/**
 * Gender-specific nouns
 */
const GENDER_NOUNS = {
	brother: {
		masculine: 'brother',
		feminine: 'sister',
		neutral: 'sibling'
	},
	son: {
		masculine: 'son',
		feminine: 'daughter',
		neutral: 'child'
	},
	father: {
		masculine: 'father',
		feminine: 'mother',
		neutral: 'parent'
	},
	husband: {
		masculine: 'husband',
		feminine: 'wife',
		neutral: 'spouse'
	}
};

/**
 * Resolve a pronoun based on gender and number
 */
function resolvePronoun(pronounType: string, gender: string, number: string): string | null {
	const pronounMap = PRONOUNS[pronounType as keyof typeof PRONOUNS];
	if (!pronounMap) return null;

	const genderMap = pronounMap[gender as keyof typeof pronounMap];
	if (!genderMap) return null;

	return genderMap[number as keyof typeof genderMap] || null;
}

/**
 * Resolve a gender-specific noun
 */
function resolveGenderNoun(baseNoun: string, gender: string): string | null {
	const nounMap = GENDER_NOUNS[baseNoun.toLowerCase() as keyof typeof GENDER_NOUNS];
	if (!nounMap) return null;

	return nounMap[gender as keyof typeof nounMap] || null;
}

/**
 * Parse template options: __option1|option2|option3__
 * Returns array of options
 */
function parseTemplateOptions(template: string): string[] {
	return template.split('|').map((opt) => opt.trim());
}

/**
 * Select the appropriate option based on context
 * Options format: __singular|plural__ or __masculine|feminine|neutral__
 */
function selectOption(options: string[], context?: SubjectContext): string {
	if (!context) {
		// No context - return first option (default/masculine/singular)
		return options[0] || '';
	}

	// If we have 2 options, assume it's singular|plural
	if (options.length === 2) {
		return context.number === 'plural' ? options[1] : options[0];
	}

	// If we have 3 options, assume it's masculine|feminine|neutral
	if (options.length === 3) {
		if (context.gender === 'feminine') return options[1];
		if (context.gender === 'neutral') return options[2];
		return options[0]; // masculine default
	}

	// Default to first option
	return options[0] || '';
}

/**
 * Resolve name placeholders: N., N.N., N.N. and N.N., etc.
 */
function resolveName(
	placeholder: string,
	subject?: SubjectContext,
	subject2?: SubjectContext
): string {
	const trimmed = placeholder.trim();

	// Handle two names: "N.N. and N.N." or "N. and N."
	if (trimmed.includes(' and ')) {
		const parts = trimmed.split(' and ').map((p) => p.trim());

		if (parts.length === 2) {
			const firstPart = parts[0];
			const secondPart = parts[1];

			// N.N. and N.N.
			if (
				(firstPart === 'N.N.' || firstPart === 'N. N.') &&
				(secondPart === 'N.N.' || secondPart === 'N. N.')
			) {
				const name1 = subject?.fullName || subject?.firstName || firstPart;
				const name2 = subject2?.fullName || subject2?.firstName || secondPart;
				return `${name1} and ${name2}`;
			}

			// N. and N.
			if (firstPart === 'N.' && secondPart === 'N.') {
				const name1 = subject?.firstName || firstPart;
				const name2 = subject2?.firstName || secondPart;
				return `${name1} and ${name2}`;
			}
		}
	}

	// Single name handling
	if (!subject) return placeholder;

	if (trimmed === 'N.N.' || trimmed === 'N. N.') {
		// Full name
		return subject.fullName || subject.firstName || placeholder;
	}

	if (trimmed === 'N.') {
		// First name only
		return subject.firstName || placeholder;
	}

	return placeholder;
}

/**
 * Main template resolver
 * Processes __template__ syntax in text based on liturgical context
 *
 * Supported formats:
 * - __he|she|they__ - Pronouns based on gender
 * - __his|her|their__ - Possessive pronouns
 * - __him|her|them__ - Objective pronouns
 * - __brother|sister|sibling__ - Gender-specific nouns
 * - __this candidate|these candidates__ - Number agreement
 * - __N.__ - First name
 * - __N.N.__ - Full name
 */
export function resolveTemplate(text: string, context: LiturgicalContextState): string {
	if (!text) return '';

	// Use subject as default context
	const subjectContext = context.subject;
	const subject2Context = context.subject2;

	// Replace all __template__ patterns
	return text.replace(/__(.+?)__/g, (match, content) => {
		const trimmed = content.trim();

		// Check for name placeholders (including two-name patterns)
		if (
			trimmed === 'N.' ||
			trimmed === 'N.N.' ||
			trimmed === 'N. N.' ||
			trimmed === 'N. and N.' ||
			trimmed === 'N.N. and N.N.'
		) {
			return resolveName(trimmed, subjectContext, subject2Context);
		}

		// Check if it contains pipe character (multiple options)
		if (trimmed.includes('|')) {
			const options = parseTemplateOptions(trimmed);

			// Try to identify if these are pronouns or nouns
			const firstOption = options[0].toLowerCase();

			// Check if it's a known pronoun pattern
			for (const [pronounType, pronounMap] of Object.entries(PRONOUNS)) {
				for (const [gender, numberMap] of Object.entries(pronounMap)) {
					if (Object.values(numberMap).some((p) => p === firstOption)) {
						// It's a pronoun - resolve based on context
						if (subjectContext) {
							return (
								resolvePronoun(pronounType, subjectContext.gender, subjectContext.number) ||
								selectOption(options, subjectContext)
							);
						}
						return selectOption(options);
					}
				}
			}

			// Check if it's a known gender noun
			const genderNoun = resolveGenderNoun(firstOption, subjectContext?.gender || 'masculine');
			if (genderNoun) {
				return genderNoun;
			}

			// Otherwise, select based on number (singular|plural pattern)
			return selectOption(options, subjectContext);
		}

		// If no pipe and no special handling, return as-is
		return match;
	});
}
