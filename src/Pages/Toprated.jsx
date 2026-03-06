import React, { useEffect, useState } from "react";
import { api } from "../Services/axiosConfig";
import CardUi from "../Components/CardUi";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiPlus, FiLoader, FiStar } from "react-icons/fi";

const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchTopRatedMovies = async (pageNum) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );
      setMovies((prev) => (pageNum === 1 ? response.data.results : [...prev, ...response.data.results]));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTopRatedMovies(nextPage);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* 1. ADAPTIVE AMBIENT SYSTEM */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[70%] md:w-[50%] h-[40%] bg-amber-900/10 blur-[80px] md:blur-[140px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[60%] md:w-[40%] h-[30%] bg-purple-900/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      {/* 2. RESPONSIVE HEADER */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 md:mb-8 text-amber-400"
        >
          <FiAward size={12} /> Critically Acclaimed
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] md:leading-none"
        >
          The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 italic font-light">Elite</span> List
        </motion.h1>
      </section>

      {/* 3. RESPONSIVE CONTENT CANVAS */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-20 pb-32">
        
        <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-black tracking-widest uppercase text-neutral-400 whitespace-nowrap">
            <FiStar className="text-amber-500 fill-amber-500" /> Page {page}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Responsive Grid: 2 columns on mobile, 3 on small tablets, 4-6 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-neutral-900/50 rounded-[1.5rem] md:rounded-[2.5rem] animate-pulse" />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {movies.map((movie, i) => (
                <motion.div
                  key={`${movie.id}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (i % 20) * 0.03, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                >
                  <CardUi 
                    movie={movie} 
                    // Adjusted corner radius for smaller screens
                    className="rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 hover:border-amber-500/30 transition-all duration-500" 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* 4. ADAPTIVE LOAD ACTION */}
        {!loading && (
          <div className="mt-20 md:mt-32 flex flex-col items-center px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="group relative flex items-center gap-3 md:gap-4 px-8 md:px-12 py-5 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-500 disabled:opacity-50 w-full md:w-auto justify-center"
            >
              {loadingMore ? (
                <FiLoader className="animate-spin text-amber-500" size={20} />
              ) : (
                <FiPlus className="group-hover:rotate-90 transition-transform duration-500 text-amber-500" size={20} />
              )}
              <span className="text-[11px] md:text-sm font-black tracking-[0.2em] md:tracking-[0.4em] uppercase">
                {loadingMore ? "Unlocking..." : "Discover More"}
              </span>
            </motion.button>
            
            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="mt-6 md:mt-8 text-neutral-600 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold"
            >
              Showing {movies.length} Masterpieces
            </motion.p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TopRatedMovies;