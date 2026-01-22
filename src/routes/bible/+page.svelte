<script lang="ts">
	import { base } from '$app/paths';
	import { getAllBooks } from '$lib/db/bible';
	import { scriptureModal } from '$lib/stores/scriptureModal';

	const allBooks = getAllBooks();

	type BookOption = {
		code: string;
		name: string;
		shortName: string;
		chapters: number;
	};

	// Combined book list with section info for color coding
	type BookWithSection = BookOption & { section: 'ot' | 'nt' | 'ap' };
	const allBooksFlat: BookWithSection[] = [
		...allBooks.ot.map((b) => ({ ...b, section: 'ot' as const })),
		...allBooks.nt.map((b) => ({ ...b, section: 'nt' as const })),
		...allBooks.apocrypha.map((b) => ({ ...b, section: 'ap' as const }))
	];

	// Background colors by section
	function getBookBgColor(section: 'ot' | 'nt' | 'ap', isHovered: boolean): string {
		if (isHovered) return 'bg-blue-400 border-blue-600 text-white';
		switch (section) {
			case 'ot':
				return 'bg-white border-gray-300 text-gray-700';
			case 'nt':
				return 'bg-blue-50 border-blue-200 text-gray-700';
			case 'ap':
				return 'bg-amber-50 border-amber-200 text-gray-700';
		}
	}

	// State for two-stage selection: book first, then chapter
	let selectedBook = $state<BookOption | null>(null);
	let hoveredBook = $state<BookOption | null>(null);
	let hoveredChapter = $state<number | null>(null);
	let hasInteractedBooks = $state(false);
	let hasInteractedChapters = $state(false);
	let isTouchDevice = $state(false);
	let isFingerOverGrid = $state(true);

	// Calculate grid columns based on number of chapters
	function getChapterGridCols(chapters: number): number {
		if (chapters <= 10) return Math.min(chapters, 5);
		if (chapters <= 30) return 6;
		if (chapters <= 50) return 8;
		return 10;
	}

	// Book grid handlers
	function handleBookHover(book: BookOption) {
		hasInteractedBooks = true;
		hoveredBook = book;
	}

	function handleBookTouchStart(book: BookOption, event: TouchEvent) {
		event.preventDefault();
		isTouchDevice = true;
		hasInteractedBooks = true;
		hoveredBook = book;
		isFingerOverGrid = true;
	}

	function handleBookTouchMove(event: TouchEvent) {
		if (!isTouchDevice) return;
		event.preventDefault();

		const touch = event.touches[0];
		const element = document.elementFromPoint(touch.clientX, touch.clientY);

		if (element) {
			const button = element.closest('button[data-book]');
			if (button) {
				const bookCode = button.getAttribute('data-book');
				if (bookCode) {
					const book = allBooksFlat.find((b) => b.code === bookCode);
					if (book) {
						hoveredBook = book;
						isFingerOverGrid = true;
					}
				}
			} else {
				isFingerOverGrid = false;
			}
		} else {
			isFingerOverGrid = false;
		}
	}

	function handleBookTouchEnd() {
		if (isTouchDevice && hoveredBook && isFingerOverGrid) {
			selectBook(hoveredBook);
		}
		isFingerOverGrid = true;
	}

	function handleBookClick(book: BookOption) {
		if (!isTouchDevice) {
			selectBook(book);
		}
	}

	function selectBook(book: BookOption) {
		selectedBook = book;
		hoveredChapter = null;
		hasInteractedChapters = false;
	}

	function goBackToBooks() {
		selectedBook = null;
		hoveredBook = null;
		hasInteractedBooks = false;
	}

	// Chapter grid handlers
	function handleChapterHover(chapter: number) {
		hasInteractedChapters = true;
		hoveredChapter = chapter;
	}

	function handleChapterTouchStart(chapter: number, event: TouchEvent) {
		event.preventDefault();
		isTouchDevice = true;
		hasInteractedChapters = true;
		hoveredChapter = chapter;
		isFingerOverGrid = true;
	}

	function handleChapterTouchMove(event: TouchEvent) {
		if (!isTouchDevice) return;
		event.preventDefault();

		const touch = event.touches[0];
		const element = document.elementFromPoint(touch.clientX, touch.clientY);

		if (element) {
			const button = element.closest('button[data-chapter]');
			if (button) {
				const chapterAttr = button.getAttribute('data-chapter');
				if (chapterAttr) {
					hoveredChapter = parseInt(chapterAttr);
					isFingerOverGrid = true;
				}
			} else {
				isFingerOverGrid = false;
			}
		} else {
			isFingerOverGrid = false;
		}
	}

	function handleChapterTouchEnd() {
		if (isTouchDevice && hoveredChapter && isFingerOverGrid && selectedBook) {
			openChapter(hoveredChapter);
		}
		isFingerOverGrid = true;
	}

	function handleChapterClick(chapter: number) {
		if (!isTouchDevice) {
			openChapter(chapter);
		}
	}

	function openChapter(chapter: number) {
		if (!selectedBook) return;
		// Use shortName (e.g., "Gen", "1 Sam") which the parser recognizes
		const reference = `${selectedBook.shortName} ${chapter}`;
		scriptureModal.open(reference, null);
	}
</script>

<div class="flex h-full w-full flex-col items-center gap-4 bg-white p-4">
	<!-- Header -->
	<h1 class="text-3xl font-bold text-gray-900">Bible</h1>

	{#if !selectedBook}
		<!-- BOOK SELECTION VIEW -->

		<!-- Display Area for hovered book - fixed height to prevent jumping -->
		<div class="flex h-16 flex-col items-center justify-center text-center">
			{#if hoveredBook}
				<div class="text-2xl font-bold text-gray-900">{hoveredBook.name}</div>
				<div class="text-sm text-gray-500">{hoveredBook.chapters} chapters</div>
			{:else if !hasInteractedBooks}
				<div class="text-xl text-gray-400">Point to a book</div>
			{:else}
				<div class="text-xl text-gray-400">&nbsp;</div>
			{/if}
		</div>

		<!-- Single unified book grid with color-coded sections -->
		<div class="w-full">
			<div class="grid grid-cols-8 gap-1 sm:grid-cols-11">
				{#each allBooksFlat as book}
					<button
						data-book={book.code}
						class="rounded border px-1 py-2 text-xs font-medium transition-colors {getBookBgColor(
							book.section,
							hoveredBook?.code === book.code
						)}"
						onmouseenter={() => handleBookHover(book)}
						onmouseleave={() => !isTouchDevice && (hoveredBook = null)}
						ontouchstart={(e) => handleBookTouchStart(book, e)}
						ontouchmove={handleBookTouchMove}
						ontouchend={handleBookTouchEnd}
						onclick={() => handleBookClick(book)}
					>
						{book.shortName}
					</button>
					{#if book.code === 'PSA'}
						<!-- BCP Psalter link right after Psalms -->
						<a
							href="{base}/psalter"
							class="flex items-center justify-center rounded border border-red-300 bg-red-50 px-1 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
						>
							BCP Ps
						</a>
					{/if}
				{/each}
			</div>
			<!-- Legend -->
			<div class="mt-2 flex justify-center gap-4 text-xs text-gray-500">
				<span class="flex items-center gap-1">
					<span class="inline-block h-3 w-3 rounded border border-gray-300 bg-white"></span> OT
				</span>
				<span class="flex items-center gap-1">
					<span class="inline-block h-3 w-3 rounded border border-blue-200 bg-blue-50"></span> NT
				</span>
				<span class="flex items-center gap-1">
					<span class="inline-block h-3 w-3 rounded border border-amber-200 bg-amber-50"></span> Apocrypha
				</span>
			</div>
		</div>
	{:else}
		<!-- CHAPTER SELECTION VIEW -->

		<!-- Back button and book name -->
		<button onclick={goBackToBooks} class="text-blue-600 hover:underline">
			&larr; Back to books
		</button>

		<!-- Display Area -->
		<div class="text-center">
			<div class="text-lg font-medium text-gray-700">{selectedBook.name}</div>
			{#if hoveredChapter}
				<div class="text-5xl font-bold text-gray-900">
					Chapter {hoveredChapter}
				</div>
			{:else if !hasInteractedChapters}
				<div class="text-xl text-gray-400">Select a chapter</div>
			{:else}
				<div class="text-xl text-gray-400">&nbsp;</div>
			{/if}
		</div>

		<!-- Chapter Grid -->
		<div
			class="grid gap-1"
			style="grid-template-columns: repeat({getChapterGridCols(
				selectedBook.chapters
			)}, minmax(0, 1fr));"
		>
			{#each Array(selectedBook.chapters) as _, index}
				{@const chapter = index + 1}
				<button
					data-chapter={chapter}
					class="flex aspect-square min-w-10 items-center justify-center rounded border border-gray-300 bg-white text-sm transition-colors hover:bg-blue-50 active:bg-blue-100 {hoveredChapter ===
					chapter
						? 'border-blue-600 bg-blue-400 font-bold text-white'
						: 'text-gray-600'}"
					onmouseenter={() => handleChapterHover(chapter)}
					onmouseleave={() => !isTouchDevice && (hoveredChapter = null)}
					ontouchstart={(e) => handleChapterTouchStart(chapter, e)}
					ontouchmove={handleChapterTouchMove}
					ontouchend={handleChapterTouchEnd}
					onclick={() => handleChapterClick(chapter)}
				>
					{chapter}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Home link -->
	<a href="{base}/pg/iii" class="mt-4 text-blue-600 hover:underline">&larr; Back to Home</a>
</div>
