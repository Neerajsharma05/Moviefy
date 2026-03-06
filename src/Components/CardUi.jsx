import React, { useState } from 'react';
import { FaStar, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import ShowDetails from './MovieDetail/ShowDetails';

const CardUi = ({ movie, className }) => {
  const [showToggle, setShowToggle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div 
        onClick={() => setShowToggle(true)} 
        className={`relative group w-[160px] md:w-[220px] aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(146,55,186,0.3)] ${className}`}
      >
        {/* Shimmer/Pulse Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] flex items-center justify-center">
             <span className="text-neutral-700 font-bold tracking-tighter text-2xl italic">TMDB</span>
          </div>
        )}

        {/* Main Poster */}
        <img 
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Floating Play Icon (Center) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-300">
                <FaPlay className="text-white text-xl translate-x-0.5" />
            </div>
        </div>

        {/* Bottom Glass Panel */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-20">
          <div className="flex items-center gap-2 mb-1">
             <div className="flex items-center bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded text-[10px] text-amber-400 font-bold">
                <FaStar className="mr-1" /> {movie.vote_average?.toFixed(1)}
             </div>
             <span className="text-neutral-400 text-[10px] font-medium italic">
               {movie.release_date?.slice(0, 4)}
             </span>
          </div>
          
          <h3 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-1">
            {movie.title}
          </h3>
        </div>

        {/* Top Gradient (to keep rating visible if needed) */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {showToggle && <ShowDetails movie={movie} onClose={() => setShowToggle(false)} />}
    </>
  );
};

export default CardUi;