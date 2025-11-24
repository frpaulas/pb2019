; DPB (Digital Prayer Book) Syntax Highlighting

; Keywords - Command prefixes
(page_range "pg" @keyword)
(title_page "tp" @keyword)
(section_title "st" @keyword)
(text_block ["tb" "bt"] @keyword)
(rubric "r" @keyword)
(reference "ref" @keyword)
(reference_plus "ref+" @keyword)
(versical "v" @keyword)
(page_break "pb" @keyword)
(line "l" @keyword)
(button "button" @keyword)
(lords_prayer "lords_prayer" @function)

; Punctuation
":" @punctuation.delimiter

; Comments
(comment) @comment

; Page numbers
(page_range) @number
(page_break) @number

; Titles and headings
(title_page) @title
(section_title) @title

; Text content
(text_block) @string
(line) @string

; Rubrics (liturgical instructions) - special emphasis
(rubric) @emphasis

; References (biblical)
(reference) @link
(reference_plus) @link

; Versicals (call and response)
(versical) @string

; Buttons/Links
(button) @function.method
