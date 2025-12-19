// src/features/api/tmdbApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Your TMDB API Key
const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";

// Create API service
export const tmdbApi = createApi({
  reducerPath: "tmdbApi", // name for redux store
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    // ✅ Popular Movies
    getPopularMovies: builder.query({
      query: () => `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    }),

    // ✅ Search Movies
    searchMovies: builder.query({
      query: (query) =>
        `search/movie?api_key=${API_KEY}&language=en-US&query=${query}`,
    }),

    // ✅ Top Rated Movies
    getTopRatedMovies: builder.query({
      query: () => `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    }),

    // ✅ Movie Details (by ID)
    getMovieDetails: builder.query({
      query: (movieId) =>
        `movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    }),
  }),
});

// Auto-generated hooks for usage in components
export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;
