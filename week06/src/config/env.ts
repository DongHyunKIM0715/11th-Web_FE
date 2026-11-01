const tmdbApiBaseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;
const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const env = {
  tmdbApiBaseUrl: tmdbApiBaseUrl || "https://api.themoviedb.org/3",
  tmdbAccessToken,
};

export function hasTmdbAccessToken() {
  return Boolean(env.tmdbAccessToken);
}
