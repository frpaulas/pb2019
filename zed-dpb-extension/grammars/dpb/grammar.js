module.exports = grammar({
	name: 'dpb',

	extras: ($) => [/[ \t]/],

	rules: {
		source_file: ($) => repeat(choice(seq($._line, '\n'), '\n')),

		_line: ($) =>
			choice(
				$.comment,
				$.page_range,
				$.title_page,
				$.section_title,
				$.text_block,
				$.rubric,
				$.reference,
				$.reference_plus,
				$.versical,
				$.page_break,
				$.line,
				$.button,
				$.lords_prayer,
				prec(-1, $.continuation_line)
			),

		// Continuation line - matches lines that don't look like commands
		// Commands have specific prefixes followed by colon
		// This matches any line that doesn't start with a command pattern
		continuation_line: ($) => /[^ptrsvlb#\n].*|[ptrsvlb][^ptrsvlb:\n].*/,

		comment: ($) => seq(/\s*#/, /.*/),

		page_range: ($) => seq('pg', ':', field('range', /\d+(-\d+)?/)),

		title_page: ($) => seq('tp', ':', field('content', /.+/)),

		section_title: ($) =>
			seq(
				'st',
				optional(seq(':', field('level', /[123]/))),
				optional(seq(':', field('modifiers', /[bio]+/))),
				':',
				field('content', /.+/)
			),

		text_block: ($) =>
			seq(
				field('command', choice('tb', 'bt')),
				optional(seq(':', field('modifiers', /[bio]+/))),
				':',
				field('content', /.*/)
			),

		rubric: ($) =>
			seq('r', optional(seq(':', field('modifiers', /[bio]+/))), ':', field('content', /.*/)),

		reference: ($) => seq('ref', ':', field('citation', /.+/)),

		reference_plus: ($) =>
			seq('ref+', ':', field('citation', /[^:]+/), ':', field('content', /.+/)),

		versical: ($) =>
			seq('v', ':', field('speaker', optional(/[^:]*/)), ':', field('content', /.*/)),

		page_break: ($) => seq('pb', ':', field('page_number', /\d+/)),

		line: ($) =>
			seq('l', optional(seq(':', field('modifiers', /[bio]+/))), ':', field('content', /.*/)),

		button: ($) =>
			seq('button', ':', field('link', optional(/[^:]*/)), ':', field('content', /.*/)),

		lords_prayer: ($) => seq('lords_prayer', ':')
	}
});
