import { describe, it, expect } from 'vitest';
import { resolveTemplate } from '../templateResolver';
import type { LiturgicalContextState } from '$lib/stores/liturgical';

describe('templateResolver', () => {
	it('should resolve masculine pronouns correctly', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'masculine',
				number: 'singular',
				firstName: 'John',
				fullName: 'John Doe'
			}
		};

		const input = 'Bless __him|her|them__ and keep __him|her|them__.';
		const expected = 'Bless him and keep him.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should resolve feminine pronouns correctly', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'feminine',
				number: 'singular',
				firstName: 'Jane',
				fullName: 'Jane Smith'
			}
		};

		const input = 'We pray for __her|his|their__ family.';
		const expected = 'We pray for her family.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should resolve neutral/plural pronouns correctly', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'neutral',
				number: 'plural'
			}
		};

		const input = 'May __they|he|she__ be blessed.';
		const expected = 'May they be blessed.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should resolve gender-specific nouns', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'feminine',
				number: 'singular'
			}
		};

		const input = 'We commend our __brother|sister|sibling__ to God.';
		const expected = 'We commend our sister to God.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should resolve number agreement (singular|plural)', () => {
		const contextSingular: LiturgicalContextState = {
			subject: {
				gender: 'masculine',
				number: 'singular'
			}
		};

		const contextPlural: LiturgicalContextState = {
			subject: {
				gender: 'neutral',
				number: 'plural'
			}
		};

		const input = 'Let us pray for __this candidate|these candidates__ who __is|are__ present.';

		expect(resolveTemplate(input, contextSingular)).toBe(
			'Let us pray for this candidate who is present.'
		);
		expect(resolveTemplate(input, contextPlural)).toBe(
			'Let us pray for these candidates who are present.'
		);
	});

	it('should resolve name placeholders', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'feminine',
				number: 'singular',
				firstName: 'Mary',
				fullName: 'Mary Johnson'
			}
		};

		expect(resolveTemplate('__N.__, I baptize you...', context)).toBe('Mary, I baptize you...');
		expect(resolveTemplate('I present __N.N.__ for baptism.', context)).toBe(
			'I present Mary Johnson for baptism.'
		);
	});

	it('should default to first option when no context provided', () => {
		const context: LiturgicalContextState = {};

		const input = 'Bless __him|her|them__ and keep __his|her|their__ family.';
		const expected = 'Bless him and keep his family.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should preserve name placeholders when no context', () => {
		const context: LiturgicalContextState = {};

		const input = '__N.__, receive this blessing.';
		const expected = 'N., receive this blessing.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should handle complex mixed templates', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'feminine',
				number: 'singular',
				firstName: 'Sarah',
				fullName: 'Sarah Williams'
			}
		};

		const input =
			'__N.__, you are sealed by the Holy Spirit. May __she|he|they__ grow in __her|his|their__ faith.';
		const expected = 'Sarah, you are sealed by the Holy Spirit. May she grow in her faith.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should handle two first names (N. and N.)', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'masculine',
				number: 'singular',
				firstName: 'John'
			},
			subject2: {
				gender: 'feminine',
				number: 'singular',
				firstName: 'Jane'
			}
		};

		const input = '__N. and N.__ now come to be joined in Holy Matrimony.';
		const expected = 'John and Jane now come to be joined in Holy Matrimony.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should handle two full names (N.N. and N.N.)', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'masculine',
				number: 'singular',
				firstName: 'John',
				fullName: 'John Smith'
			},
			subject2: {
				gender: 'feminine',
				number: 'singular',
				firstName: 'Jane',
				fullName: 'Jane Doe'
			}
		};

		const input = 'Into this holy union __N.N. and N.N.__ now come to be joined.';
		const expected = 'Into this holy union John Smith and Jane Doe now come to be joined.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should preserve two-name placeholders when no context', () => {
		const context: LiturgicalContextState = {};

		const input = '__N.N. and N.N.__ now come to be joined.';
		const expected = 'N.N. and N.N. now come to be joined.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});

	it('should handle partial context for two names', () => {
		const context: LiturgicalContextState = {
			subject: {
				gender: 'masculine',
				number: 'singular',
				firstName: 'John',
				fullName: 'John Smith'
			}
			// subject2 is missing
		};

		const input = 'Therefore, __N. and N.__ have come before us.';
		const expected = 'Therefore, John and N. have come before us.';
		expect(resolveTemplate(input, context)).toBe(expected);
	});
});
