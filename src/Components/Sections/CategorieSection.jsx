import React, { useEffect, useState } from 'react'
import { fetchcategoriesMovies, fetchMoviesByCategory } from '../../Services/Api';
import CardUi from '../CardUi';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlusSmall } from 'react-icons/hi2';

const CategorieSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(28); 
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const getCategories = async () => {
    try {
      const res = await fetchcategoriesMovies();
      setCategories(res.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovies = async (genreId, pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    else setIsMoreLoading(true);

    try {
      const res = await fetchMoviesByCategory(genreId, pageNum);
      if (pageNum === 1) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setPage(1);
    getMovies(selectedCategory, 1);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getMovies(selectedCategory, nextPage);
  };

  return (
    <div className="px-6 md:px-20 text-white mt-20 mb-20 relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-1.5 h-6 bg-purple-600 rounded-full" />
          <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter italic">
            Browse by <span className="text-purple-600">Genre</span>
          </h1>
        </div>
      </div>

      {/* GENRE CAPSULES (Scrollbar Hidden via .no-scrollbar class) */}
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar snap-x">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`
              px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest 
              transition-all duration-500 border whitespace-nowrap snap-start
              ${selectedCategory === cat.id 
                ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_25px_rgba(146,55,186,0.3)]" 
                : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* MOVIES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        <AnimatePresence>
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="aspect-[2/3] bg-white/5 rounded-[2rem] animate-pulse" />
            ))
          ) : (
            movies.map((movie, index) => (
              <motion.div
                key={`${movie.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CardUi movie={movie} className="w-full" />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* LOAD MORE BUTTON */}
      {!loading && movies.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleLoadMore}
            disabled={isMoreLoading}
            className={`
              group flex items-center gap-3 px-12 py-4 rounded-2xl font-black text-[11px] 
              uppercase tracking-[0.3em] transition-all duration-500 border
              ${isMoreLoading 
                ? "bg-white/5 border-white/5 text-neutral-500 cursor-not-allowed" 
                : "bg-white/5 border-white/10 text-white hover:bg-purple-600 hover:border-purple-600 hover:shadow-[0_0_40px_rgba(146,55,186,0.3)]"
              }
            `}
          >
            {isMoreLoading ? (
              <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiOutlinePlusSmall size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            )}
            {isMoreLoading ? "Fetching..." : "Load More"}
          </button>
        </div>
      )}

      {/* CSS INJECTION TO HIDE SCROLLBARS PERMANENTLY */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </div>
  );
};

export default CategorieSection;