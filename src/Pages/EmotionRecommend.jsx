import React, { useState, useEffect } from "react";
import { moodGenreMap } from "../Services/moodGenreMap";
import { api } from "../Services/axiosConfig";
import CardUi from "../Components/CardUi";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMessageSquare, FiTrendingUp, FiPlus } from "react-icons/fi"; // Added FiPlus

const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";

const EmotionRecommend = () => {
  const [industry, setIndustry] = useState("Hollywood");
  const [mood, setMood] = useState("Happy");
  const [userInput, setUserInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Added page state
  const [isMoreLoading, setIsMoreLoading] = useState(false); // Added secondary loading state

  const analyzeMood = (input) => {
    const text = input.toLowerCase();
    if (/sad|lonely|deep|cry|emotional|depression|broken|heartbreak|mourn/.test(text)) return "Sad";
    if (/love|romantic|date|sweet|couple|marriage|valentine|crush/.test(text)) return "Romantic";
    if (/scary|dark|horror|ghost|spooky|creepy|mysterious|blood|death/.test(text)) return "Scary";
    if (/excited|action|fast|hype|thrill|adventure|energy|fight|racing/.test(text)) return "Excited";
    if (/happy|funny|comedy|joke|laugh|chill|relax|smile|bright/.test(text)) return "Happy";
    return "Happy"; 
  };

  const fetchMovies = async (selectedMood, selectedIndustry, currentPage = 1) => {
    if (currentPage === 1) setLoading(true);
    else setIsMoreLoading(true);

    const genres = moodGenreMap[selectedMood] || [28];
    const language = selectedIndustry === "Bollywood" ? "hi" : "en";
    const region = selectedIndustry === "Bollywood" ? "IN" : "US";

    try {
      const response = await api.get(
        `/discover/movie?api_key=${API_KEY}&with_genres=${genres.join(",")}&with_original_language=${language}&region=${region}&sort_by=popularity.desc&page=${currentPage}` // Added page param
      );
      
      // If it's the first page, replace results. If not, append them.
      setMovies(prev => currentPage === 1 ? response.data.results : [...prev, ...response.data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsMoreLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;
    
    const detectedMood = analyzeMood(userInput);
    setPage(1); // Reset page on new search
    setMood(detectedMood);
  };

  // Trigger when mood, industry, OR page changes
  useEffect(() => {
    fetchMovies(mood, industry, page);
  }, [mood, industry, page]);

  // Reset page when switching industry directly
  useEffect(() => {
    setPage(1);
  }, [industry]);

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-600">
      
      {/* --- AMBIENT GLOW SYSTEM --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      {/* --- HERO SEARCH SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.3em] uppercase mb-6 text-purple-400"
          >
            <FiMessageSquare /> AI Emotion Engine
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]"
          >
            How are you <br /> <span className="text-neutral-600 italic">feeling?</span>
          </motion.h1>

          <form 
            onSubmit={handleSearch}
            className="relative max-w-3xl mx-auto group"
          >
            <input 
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ex: I'm lonely and want a deep story..."
              className="w-full bg-neutral-900/40 border-2 border-white/5 backdrop-blur-3xl px-8 py-7 rounded-[2.5rem] text-xl md:text-2xl outline-none focus:border-purple-600/50 transition-all duration-500 placeholder:text-neutral-700 font-medium group-hover:bg-neutral-900/60"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black h-[80%] aspect-square rounded-[2rem] flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-2xl active:scale-95"
            >
              <FiSearch size={28} />
            </button>
          </form>

          <div className="mt-12 flex justify-center gap-10">
            {["Hollywood", "Bollywood"].map(ind => (
              <button 
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`text-xs tracking-[0.4em] uppercase font-black transition-all duration-500 ${
                  industry === ind ? "text-white border-b-2 border-purple-600 pb-2" : "text-neutral-600 hover:text-neutral-400"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESULTS AREA --- */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-20 pb-40">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight capitalize">
              {mood} <span className="text-neutral-600 font-light">Collection</span>
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-purple-600 to-transparent hidden md:block" />
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs font-black tracking-widest uppercase">
            <FiTrendingUp className="text-purple-500" /> Top Matches
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-14">
          {loading && page === 1 ? (
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[2/3] bg-neutral-900 rounded-[2.5rem] animate-pulse" />
                <div className="h-3 bg-neutral-900 rounded-full w-2/3 mx-auto" />
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {movies.map((movie, i) => (
                <motion.div
                  key={`${movie.id}-${i}`} // Updated key for unique entries
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (i % 12) * 0.04, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                >
                  <CardUi movie={movie} className="rounded-[2.5rem] border border-white/5 hover:border-purple-600/30 transition-colors duration-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* --- LOAD MORE BUTTON --- */}
        {!loading && movies.length > 0 && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={isMoreLoading}
              className="group flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-purple-600 hover:border-purple-600 transition-all duration-500 disabled:opacity-50"
            >
              {isMoreLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FiPlus className="group-hover:rotate-90 transition-transform duration-500" />
                  Load More
                </>
              )}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default EmotionRecommend;