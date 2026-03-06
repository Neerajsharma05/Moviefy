import React, { useState, useEffect } from "react";
import { FaStar, FaPlay, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ShowDetails from "./MovieDetail/ShowDetails";
import { watchtrailer } from "../Services/Api";

const HeroSlides = ({ movie }) => {
  const [popup, setPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [movie.backdrop_path]);

  return (
    <>
      <div 
  className="absolute inset-0 z-40 flex flex-col justify-end pb-32 px-6 md:px-20"
  data-swiper-parallax="-500" // This makes the text slide in from a different distance
>
        {/* 1. LOADING OVERLAY */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#020202] z-50">
            <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* 2. CINEMATIC MASKING SYSTEM */}
        {/* Top Mask: Ensures the NavBar is ALWAYS readable */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent z-30 pointer-events-none" />
        
        {/* Left Side Mask: Protects text content */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        
        {/* Bottom Mask: Fades into the page content */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent z-30 pointer-events-none" />

        {/* 3. BACKGROUND IMAGE WITH ZOOM EFFECT */}
        <motion.img
          key={movie.backdrop_path}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: isLoaded ? 1 : 1.15, opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          onLoad={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />

        {/* 4. CONTENT AREA */}
        <div className="absolute inset-0 z-40 flex flex-col justify-end pb-32 md:pb-40 px-6 md:px-20 lg:w-[60%]">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={isLoaded ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {/* Metadata Badges */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-lg text-white font-black text-[10px] uppercase tracking-[0.3em]">
                New Premiere
              </span>
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                <FaStar className="text-amber-500 text-xs" />
                <span className="text-amber-400 font-bold text-xs">{movie.vote_average.toFixed(1)}</span>
              </div>
              <span className="text-neutral-400 font-bold text-xs ml-2 tracking-widest uppercase">
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>

            {/* Title with Perspective */}
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase italic">
              {movie.original_title}
            </h1>

            {/* Description */}
            <p className="text-neutral-400 text-sm md:text-base mb-10 line-clamp-3 max-w-lg leading-relaxed font-medium">
              {movie.overview}
            </p>

            {/* Premium Actions */}
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => watchtrailer(movie.original_title)}
                className="flex items-center gap-4 bg-purple-600 px-10 py-5 rounded-2xl font-black text-[11px] text-white tracking-[0.3em] uppercase hover:bg-purple-500 transition-colors shadow-2xl shadow-purple-600/30"
              >
                <FaPlay size={12} /> Play Trailer
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPopup(true)}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 px-10 py-5 rounded-2xl font-black text-[11px] text-white tracking-[0.3em] uppercase transition-all"
              >
                <FaPlus size={12} /> Add List
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Subtle Side Navigation Indicator (Visual Only) */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-1 h-8 rounded-full transition-all duration-500 ${i === 1 ? 'bg-purple-600 h-12' : 'bg-white/20'}`} />
            ))}
        </div>
      </div>

      <AnimatePresence>
        {popup && <ShowDetails movie={movie} onClose={() => setPopup(false)} />}
      </AnimatePresence>
    </>
  );
};

export default HeroSlides;