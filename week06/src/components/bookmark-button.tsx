import { useBookmarkStore } from "../stores/bookmark-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      className={`mt-6 inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        isBookmarked
          ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
          : "border-[#d8dde5] bg-white text-[#343b45] hover:bg-[#f1f4f8]"
      }`}
      type="button"
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      <img
        className="size-4"
        src={`/icons/movie-icons/bookmark${isBookmarked ? "" : "-outline"}.svg`}
        alt=""
      />
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
