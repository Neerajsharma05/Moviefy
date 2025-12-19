// src/api/axiosConfig.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3", // TMDB base URL
});

export default api;
