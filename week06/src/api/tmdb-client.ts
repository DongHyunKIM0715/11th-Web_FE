import ky from "ky";
import { env, hasTmdbAccessToken } from "../config/env";

export const tmdbClient = ky.create({
  baseUrl: `${env.tmdbApiBaseUrl}/`,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        if (!hasTmdbAccessToken()) {
          throw new Error("TMDB API Read Access Token을 .env.local에 설정해 주세요.");
        }
        request.headers.set("Authorization", `Bearer ${env.tmdbAccessToken}`);
      },
    ],
  },
});
