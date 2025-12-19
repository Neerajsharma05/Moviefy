import React, { useState, useEffect } from "react";
import { moodGenreMap } from "../Services/moodGenreMap";
import { api } from "../Services/axiosConfig";
import CardUi from "../Components/CardUi";

const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";

const EmotionRecommend = () => {
  const [industry, setIndustry] = useState("Hollywood"); // Bollywood or Hollywood
  const [mood, setMood] = useState("Happy");
  const [movies, setMovies] = useState([]);

  // Fetch movies whenever mood or industry changes
  const fetchMovies = async (selectedMood, selectedIndustry) => {
    const genres = moodGenreMap[selectedMood];
    if (!genres) return;

    // Determine language/region
    const language =
      selectedIndustry === "Bollywood" ? "hi" : "en"; // simple approach
    const region = selectedIndustry === "Bollywood" ? "IN" : "US";

    try {
      const response = await api.get(
        `/discover/movie?api_key=${API_KEY}&with_genres=${genres.join(
          ","
        )}&with_original_language=${language}&region=${region}&sort_by=popularity.desc`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Run once when component mounts
  useEffect(() => {
    fetchMovies(mood, industry);
  }, [mood, industry]);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
  };

  const handleIndustrySelect = (selectedIndustry) => {
    setIndustry(selectedIndustry);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl mt-20 font-bold mb-6 text-center max-sm:mt-25 max-sm:text-2xl">
        🎭 Movie Recommendations Based on Mood
      </h1>

      {/* Industry Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        {["Hollywood", "Bollywood"].map((ind) => (
          <button
            key={ind}
            onClick={() => handleIndustrySelect(ind)}
            className={`px-6 py-2 rounded-md text-lg transition max-sm:text-sm ${
              industry === ind
                ? "bg-blue-500 text-white"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Mood Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(moodGenreMap).map((m) => (
          <button
            key={m}
            onClick={() => handleMoodSelect(m)}
            className={`px-6 py-2 rounded-full text-lg transition max-sm:text-sm ${
              mood === m
                ? "bg-blue-500 text-white"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Movie Results */}
      <div className="flex flex-wrap justify-center gap-2">
        {movies.length > 0 ? (
          movies.map((movie) => <CardUi key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center w-full text-neutral-400 mt-10">
            No movies found for {mood} in {industry}.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmotionRecommend;
