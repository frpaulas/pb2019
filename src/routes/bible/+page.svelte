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
					const book = [...allBooks.ot, ...allBooks.nt, ...allBooks.apocrypha].find(
						(b) => b.code === bookCode
					);
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
		const reference = `${selectedBook.name} ${chapter}`;
		scriptureModal.open(reference, null);
	}
</script>

<div class="flex h-full w-full flex-col items-center gap-4 bg-white p-4">
	<!-- Header -->
	<h1 class="text-3xl font-bold text-gray-900">Bible</h1>

	{#if !selectedBook}
		<!-- BOOK SELECTION VIEW -->

		<!-- Display Area for hovered book -->
		<div class="text-center">
			{#if hoveredBook}
				<div class="text-2xl font-bold text-gray-900">{hoveredBook.name}</div>
				<div class="text-sm text-gray-500">{hoveredBook.chapters} chapters</div>
			{:else if !hasInteractedBooks}
				<div class="text-xl text-gray-400">Point to a book</div>
				<div class="text-sm text-gray-400">&nbsp;</div>
			{:else}
				<div class="text-xl text-gray-400">&nbsp;</div>
				<div class="text-sm text-gray-400">&nbsp;</div>
			{/if}
		</div>

		<!-- Old Testament Grid -->
		<div class="w-full">
			<div class="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
				Old Testament
			</div>
			<div class="grid grid-cols-8 gap-1 sm:grid-cols-10">
				{#each allBooks.ot as book}
					<button
						data-book={book.code}
						class="rounded border border-gray-300 bg-white px-1 py-2 text-xs font-medium transition-colors hover:bg-blue-50 active:bg-blue-100 {hoveredBook?.code ===
						book.code
							? 'border-blue-600 bg-blue-400 text-white'
							: 'text-gray-700'}"
						onmouseenter={() => handleBookHover(book)}
						onmouseleave={() => !isTouchDevice && (hoveredBook = null)}
						ontouchstart={(e) => handleBookTouchStart(book, e)}
						ontouchmove={handleBookTouchMove}
						ontouchend={handleBookTouchEnd}
						onclick={() => handleBookClick(book)}
					>
						{book.shortName}
					</button>
				{/each}
			</div>
		</div>

		<!-- New Testament Grid -->
		<div class="w-full">
			<div class="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
				New Testament
			</div>
			<div class="grid grid-cols-8 gap-1 sm:grid-cols-10">
				{#each allBooks.nt as book}
					<button
						data-book={book.code}
						class="rounded border border-gray-300 bg-white px-1 py-2 text-xs font-medium transition-colors hover:bg-blue-50 active:bg-blue-100 {hoveredBook?.code ===
						book.code
							? 'border-blue-600 bg-blue-400 text-white'
							: 'text-gray-700'}"
						onmouseenter={() => handleBookHover(book)}
						onmouseleave={() => !isTouchDevice && (hoveredBook = null)}
						ontouchstart={(e) => handleBookTouchStart(book, e)}
						ontouchmove={handleBookTouchMove}
						ontouchend={handleBookTouchEnd}
						onclick={() => handleBookClick(book)}
					>
						{book.shortName}
					</button>
				{/each}
			</div>
		</div>

		<!-- Apocrypha Grid (if present) -->
		{#if allBooks.apocrypha.length > 0}
			<div class="w-full">
				<div class="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
					Apocrypha
				</div>
				<div class="grid grid-cols-8 gap-1 sm:grid-cols-10">
					{#each allBooks.apocrypha as book}
						<button
							data-book={book.code}
							class="rounded border border-gray-300 bg-white px-1 py-2 text-xs font-medium transition-colors hover:bg-blue-50 active:bg-blue-100 {hoveredBook?.code ===
							book.code
								? 'border-blue-600 bg-blue-400 text-white'
								: 'text-gray-700'}"
							onmouseenter={() => handleBookHover(book)}
							onmouseleave={() => !isTouchDevice && (hoveredBook = null)}
							ontouchstart={(e) => handleBookTouchStart(book, e)}
							ontouchmove={handleBookTouchMove}
							ontouchend={handleBookTouchEnd}
							onclick={() => handleBookClick(book)}
						>
							{book.shortName}
						</button>
					{/each}
				</div>
			</div>
		{/if}
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
