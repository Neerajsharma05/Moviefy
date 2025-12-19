import React, { useEffect, useState } from "react";
import { api } from "../Services/axiosConfig";
import CardUi from "../Components/CardUi";

const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";

const PopularMovies = () => {
  const [industry, setIndustry] = useState("Hollywood"); // Bollywood or Hollywood
  const [movies, setMovies] = useState([]);

  const fetchPopularMovies = async (selectedIndustry) => {
    const language = selectedIndustry === "Bollywood" ? "hi" : "en";
    const region = selectedIndustry === "Bollywood" ? "IN" : "US";

    try {
      const response = await api.get(
        `/movie/popular?api_key=${API_KEY}&language=${language}&region=${region}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    fetchPopularMovies(industry);
  }, [industry]);

  const handleIndustrySelect = (selectedIndustry) => {
    setIndustry(selectedIndustry);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl mt-20 font-bold mb-6 text-center max-sm:text-2xl">
        🎬 Popular Movies
      </h1>

      {/* Industry Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {["Hollywood", "Bollywood"].map((ind) => (
          <button
            key={ind}
            onClick={() => handleIndustrySelect(ind)}
            className={`px-6 py-2 rounded-full text-lg transition max-sm:text-sm ${
              industry === ind
                ? "bg-blue-500 text-white"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Movie Results */}
      <div className="flex flex-wrap justify-center gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <CardUi key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center w-full text-neutral-400 mt-10">
            No popular movies found for {industry}.
          </p>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
