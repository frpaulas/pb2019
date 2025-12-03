; DPB (Digital Prayer Book) Syntax Highlighting

; Comments
(comment) @comment

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
(lords_prayer "lords_prayer" @keyword)

; Modifiers (b/i/o flags)
(modifiers) @attribute

; Level indicators (1/2/3 for section titles)
(level) @constant.numeric

; Numbers (page numbers, page ranges)
(range) @constant.numeric
(page_number) @constant.numeric

; Speaker labels in versicals
(versical
  (speaker) @label
  (#match? @label "^(people|celebrant|minister|all|priest|bishop)$"))

; Citations in references
(citation) @string.special

; Button links
(button
  (link) @markup.link)

; Content text
(content) @string

; Punctuation
":" @punctuation.delimiter
