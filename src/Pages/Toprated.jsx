import React, { useEffect, useState } from "react";
import { api } from "../Services/axiosConfig";
import CardUi from "../Components/CardUi";

const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl mt-20 font-bold mb-6 text-center max-sm:text-2xl">
        🌟 Top Rated Movies
      </h1>

      {loading ? (
        <p className="text-center text-neutral-400 mt-10">Loading movies...</p>
      ) : movies.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {movies.map((movie) => (
            <CardUi key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-400 mt-10">No movies found.</p>
      )}
    </div>
  );
};

export default TopRatedMovies;
