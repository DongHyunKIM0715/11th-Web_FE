import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useBookmarkStore } from "../../stores/bookmark-store";
import type { Movie } from "../../types/movie";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";

function toMovie(movie: TmdbMovieListItem, isBookmarked: boolean): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: getTmdbPosterUrl(movie.poster_path),
    backdropPath: getTmdbBackdropUrl(movie.backdrop_path),
    genres: movie.genre_ids.map(String),
    runtime: "상영 시간 정보가 없어요.",
    tagline: "",
    overview: movie.overview,
    isBookmarked,
  };
}

export function MovieListPage() {
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [page, setPage] = useState(1);
  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });
  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 0, 500);
  const errorMessage = moviesQuery.error?.message.includes("Access Token")
    ? moviesQuery.error.message
    : "영화 목록을 불러오지 못했어요.";

  return (
    <>
      <main className="mx-auto w-[calc(100%-48px)] max-w-[1280px] flex-1 pt-6 max-sm:w-[calc(100%-36px)] max-sm:pt-[22px]">
        <h1 className="mb-3 text-[23px] leading-[1.4] font-bold tracking-[-0.65px]">영화 목록</h1>
        {moviesQuery.isPending ? <p role="status">영화 목록을 불러오는 중이에요.</p> : moviesQuery.isError ? <p role="alert">{errorMessage}</p> : movies.length === 0 ? <p>조건에 맞는 영화가 없어요.</p> : <MovieGrid movies={movies.map((movie) => toMovie(movie, bookmarkedMovieIds.includes(movie.id)))} onToggleBookmark={toggleBookmark} />}
        {moviesQuery.isSuccess && movies.length > 0 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
      </main>
      <footer className="mx-auto flex min-h-[34px] w-[calc(100%-48px)] max-w-[1280px] items-center justify-end gap-1.5 border-t border-[#e8eaee] text-[9px] text-[#9299a2] max-sm:w-[calc(100%-36px)] max-sm:justify-center">
        <img className="h-auto w-[42px]" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
      </footer>
    </>
  );
}
