import React, { useEffect, useState, useRef } from "react";
import { GetpopularMovie } from "../../Services/Api";
import CardUi from "../CardUi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

const PopularSection = () => {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);

  const GetpopularMovies = async () => {
    try {
      const response = await GetpopularMovie();
      setData(response.data.results);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    GetpopularMovies();
  }, []);

  // --- NAVIGATION LOGIC ---
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 650;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-auto flex flex-col text-white px-6 md:px-20 mt-16 mb-12">
      
      {/* HEADER SECTION */}
      <div className="flex items-end justify-between mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {/* Visual Anchor */}
            <span className="w-1.5 h-6 bg-purple-600 rounded-full" />
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter italic">
              Popular <span className="text-purple-600">Hits</span>
            </h2>
          </div>
          <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-[0.3em] ml-4">
            Most watched by the community
          </p>
        </div>

        {/* CUSTOM NAVIGATION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 active:scale-90 group"
          >
            <HiOutlineChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 active:scale-90 group"
          >
            <HiOutlineChevronRight size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.length > 0 ? (
          data.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex-shrink-0 w-[200px] md:w-[260px] snap-start"
            >
              <CardUi movie={movie} />
            </motion.div>
          ))
        ) : (
          /* SKELETON LOADERS */
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex-shrink-0 w-[240px] h-[360px] bg-white/5 rounded-[2rem] animate-pulse" />
          ))
        )}
      </div>

      {/* SUBTLE SEPARATOR */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mt-2" />
    </div>
  );
};

export default PopularSection;