import React, { useEffect, useState, useRef } from "react";
import { TrendingMoviesApi } from "../../Services/Api";
import CardUi from "../CardUi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

const TrendingSection = () => {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);

  const trendingMovies = async () => {
    try {
      const res = await TrendingMoviesApi();
      setData(res.data.results);
    } catch (error) {
      console.error("Trending Fetch Error:", error);
    }
  };

  useEffect(() => {
    trendingMovies();
  }, []);

  // --- NAVIGATION LOGIC ---
  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth < 768 ? 300 : 600; // Adjust distance for mobile vs desktop

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-auto flex flex-col text-white px-6 md:px-20 mt-12 mb-10">
      
      {/* HEADER SECTION */}
      <div className="flex items-end justify-between mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full" />
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter italic">
              Trending <span className="text-purple-600">Now</span>
            </h2>
          </div>
          <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-[0.3em] ml-4">
            Curated weekly blockbusters
          </p>
        </div>

        {/* CUSTOM NAVIGATION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 active:scale-90"
          >
            <HiOutlineChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 active:scale-90"
          >
            <HiOutlineChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.length > 0 ? (
          data.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-[200px] md:w-[260px] snap-start"
            >
              <CardUi movie={movie} />
            </motion.div>
          ))
        ) : (
          /* SKELETON LOADERS */
          [1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex-shrink-0 w-[240px] h-[360px] bg-white/5 rounded-3xl animate-pulse" />
          ))
        )}
      </div>

      {/* BOTTOM ACCENT LINE */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4" />
    </div>
  );
};

export default TrendingSection;