import React, { useEffect, useState } from "react";
import { api } from "../Services/axiosConfig";
import CardUi from "../Components/CardUi";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiTrendingUp, FiPlus, FiLoader } from "react-icons/fi";
import AboutSection from "../Components/Sections/AboutSection";

const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";

const PopularMovies = () => {
  const [industry, setIndustry] = useState("Hollywood");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPopularMovies = async (selectedIndustry, pageNum) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    const language = selectedIndustry === "Bollywood" ? "hi" : "en";
    const region = selectedIndustry === "Bollywood" ? "IN" : "US";

    try {
      const response = await api.get(
        `/movie/popular?api_key=${API_KEY}&language=${language}&region=${region}&page=${pageNum}`
      );
      
      setMovies((prev) => (pageNum === 1 ? response.data.results : [...prev, ...response.data.results]));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setLoadingMore(false);
      }, 500);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page on industry change
    fetchPopularMovies(industry, 1);
  }, [industry]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPopularMovies(industry, nextPage);
  };

  const featuredMovie = movies[0];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-600/30 overflow-x-hidden">
      
      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-[70vh] md:h-[85vh] w-full flex items-center px-4 md:px-16 overflow-hidden">
        <AnimatePresence mode="wait">
          {featuredMovie && !loading && (
            <motion.div 
              key={featuredMovie.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
                className="w-full h-full object-cover opacity-40 scale-105"
                alt="featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 max-w-4xl pt-20">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2 text-purple-500 font-black mb-4 tracking-[0.4em] uppercase text-[10px]"
          >
            <FiTrendingUp /> Global {industry} Hit
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter"
          >
            {featuredMovie?.title}
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 items-center"
          >
            <button className="bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-500 flex items-center gap-3">
              <FiPlay className="fill-current" /> Play
            </button>
            <button className="bg-white/5 backdrop-blur-2xl border border-white/10 px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
              Overview
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- STICKY CATEGORY NAV --- */}
      <div className="sticky top-0 z-40 bg-[#020202]/60 backdrop-blur-3xl border-b border-white/5 px-4 md:px-16 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <h2 className="hidden md:block text-xs font-black tracking-[0.4em] uppercase text-neutral-500">
            Current: <span className="text-white">{industry}</span>
          </h2>
          
          <div className="flex bg-neutral-900/50 p-1 rounded-2xl border border-white/5 w-full md:w-auto">
            {["Hollywood", "Bollywood"].map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`flex-1 md:flex-none px-8 md:px-12 py-2.5 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all duration-500 ${
                  industry === ind ? "bg-purple-600 text-white shadow-lg" : "text-neutral-500 hover:text-white"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE GRID (320px Optimized) --- */}
      <main className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-16 py-12 md:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-6 md:gap-8 gap-y-10 md:gap-y-16">
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-neutral-900 rounded-[1.5rem] md:rounded-[2.5rem] animate-pulse" />
            ))
          ) : (
            <AnimatePresence mode='popLayout'>
              {movies.map((movie, index) => (
                <motion.div
                  key={`${movie.id}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (index % 20) * 0.04,
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                >
                  <CardUi 
                    movie={movie} 
                    className="rounded-[1.2rem] md:rounded-[2.5rem] border border-white/5" 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* --- LOAD MORE --- */}
        {!loading && (
          <div className="mt-24 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="group flex items-center gap-4 px-10 py-5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all w-full md:w-auto justify-center"
            >
              {loadingMore ? (
                <FiLoader className="animate-spin text-purple-500" size={20} />
              ) : (
                <FiPlus className="text-purple-500 group-hover:rotate-90 transition-transform duration-500" size={20} />
              )}
              <span className="text-[11px] font-black tracking-[0.3em] uppercase">
                {loadingMore ? "Loading Collection..." : "Load More Hits"}
              </span>
            </motion.button>
          </div>
        )}
      </main>
        <AboutSection />

    </div>
  );
};

export default PopularMovies;