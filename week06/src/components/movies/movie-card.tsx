import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

type MovieCardProps = { movie: Movie; onToggleBookmark?: (id: number) => void };

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {getTmdbPosterUrl(movie.posterPath) ? (
            <img className="poster" src={getTmdbPosterUrl(movie.posterPath)!} alt={`${movie.title} 포스터`} />
          ) : (
            <div className="poster grid place-items-center bg-[#e6e8ec] text-sm text-[#737b87]" role="img" aria-label={`${movie.title} 포스터 이미지 없음`}>이미지 없음</div>
          )}
        </Link>
        <button className={`bookmark-button${movie.isBookmarked ? " is-bookmarked" : ""}`} type="button" aria-label={movie.isBookmarked ? `${movie.title} 북마크 해제` : `${movie.title} 북마크`} aria-pressed={movie.isBookmarked} onClick={() => onToggleBookmark?.(movie.id)}>
          <img src={`/icons/movie-icons/bookmark${movie.isBookmarked ? "" : "-outline"}.svg`} alt="" />
        </button>
      </div>
      <h2 className="movie-title" title={movie.title}>
        <Link to="/movies/$movieId" 
        params={{ movieId: String(movie.id) }}>
              {movie.title}
        </Link>
      </h2>
      <p className="release-date">{movie.releaseDate}</p>
    </article>
  );
}
