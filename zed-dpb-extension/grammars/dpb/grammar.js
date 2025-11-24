module.exports = grammar({
	name: 'dpb',

	rules: {
		source_file: ($) => repeat($._line),

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
				$.blank_line
			),

		comment: ($) => seq(/\s*#/, /.*/, '\n'),

		page_range: ($) => seq('pg', ':', /\d+(-\d+)?/, '\n'),

		title_page: ($) => seq('tp', ':', /.+/, '\n'),

		section_title: ($) => seq('st', optional(/:[123]/), optional(/(:?[bio]:*)/), ':', /.+/, '\n'),

		text_block: ($) => seq(choice('tb', 'bt'), optional(/:[bio]*/), ':', /.*/, '\n'),

		rubric: ($) => seq('r', optional(/:[bio]*/), ':', /.*/, '\n'),

		reference: ($) => seq('ref', ':', /.+/, '\n'),

		reference_plus: ($) => seq('ref+', ':', /[^:]+/, ':', /.+/, '\n'),

		versical: ($) => seq('v', ':', optional(/[^:]*/), ':', /.*/, '\n'),

		page_break: ($) => seq('pb', ':', /\d+/, '\n'),

		line: ($) => seq('l', optional(/:[bio]*/), ':', /.*/, '\n'),

		button: ($) => seq('button', ':', optional(/[^:]*/), ':', /.*/, '\n'),

		lords_prayer: ($) => seq('lords_prayer', ':', '\n'),

		blank_line: ($) => /\s*\n/
	}
});
