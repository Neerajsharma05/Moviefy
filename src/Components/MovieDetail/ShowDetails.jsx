import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaStar, FaRegClock, FaCircle } from "react-icons/fa";
import { fetchMovieByid } from "../../Services/Api";
import { motion, AnimatePresence } from "framer-motion";

const ShowDetails = ({ movie, onClose }) => {
  const [data, setData] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- NAV HIDE & BLUR LOGIC ---
    const mainContent = document.getElementById("main-root"); 
    const navBar = document.querySelector("nav");

    if (mainContent) mainContent.style.filter = "blur(15px) brightness(0.5)";
    if (navBar) navBar.style.transform = "translateY(-100%)";

    const movieDetails = async () => {
      try {
        if (!movie?.id) return;
        const res = await fetchMovieByid(movie.id);
        setData(res.data);
        
        // Find the YouTube Trailer Key from TMDB video results
        const trailer = res.data.videos?.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    movieDetails();

    return () => {
      if (mainContent) mainContent.style.filter = "none";
      if (navBar) navBar.style.transform = "translateY(0)";
    };
  }, [movie?.id]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12">
        {/* BACKDROP OVERLAY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* MAIN MODAL CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-7xl h-full md:h-[90vh] bg-[#020202] md:rounded-[3rem] overflow-hidden border border-white/5 flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]"
        >
          {/* --- TOP SECTION: VIDEO PLAYER --- */}
          <div className="relative w-full aspect-video md:h-[65%] bg-black group">
            {isPlaying && trailerKey ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full">
                <img 
                  src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} 
                  className="w-full h-full object-cover opacity-40 grayscale-[0.5]" 
                  alt="backdrop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
                
                {/* Custom Play Button */}
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6"
                >
                  <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-all duration-700 hover:scale-110">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white">Watch Trailer</span>
                </button>
              </div>
            )}

            {/* CLOSE BUTTON - Floating inside video area for better UX */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/40 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* --- BOTTOM SECTION: DATA & CAST --- */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Left Column: Metadata */}
              <div className="flex-1 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[10px] font-black text-purple-500 tracking-[0.3em] uppercase">
                    <span>{data.release_date?.slice(0, 4)}</span>
                    <FaCircle size={4} className="opacity-30" />
                    <span className="flex items-center gap-1"><FaRegClock /> {data.runtime} MIN</span>
                    <FaCircle size={4} className="opacity-30" />
                    <span className="flex items-center gap-1"><FaStar /> {data.vote_average?.toFixed(1)}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
                    {data.original_title}
                  </h2>
                </div>

                <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-3xl italic">
                  {data.overview}
                </p>

                <div className="flex flex-wrap gap-2">
                  {data.genres?.map(g => (
                    <span key={g.id} className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-neutral-400">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Cast Highlights */}
              <div className="w-full lg:w-1/3 space-y-6">
                <h4 className="text-[10px] font-black text-neutral-600 tracking-[0.5em] uppercase border-b border-white/5 pb-4">
                  Top Billing
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {data.credits?.cast?.slice(0, 6).map(actor => (
                    <div key={actor.id} className="space-y-2">
                      <div className="aspect-square rounded-2xl bg-neutral-900 overflow-hidden border border-white/5">
                        <img 
                          src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/no-profile.png"} 
                          className="w-full h-full object-cover grayscale opacity-60"
                        />
                      </div>
                      <p className="text-[9px] font-bold text-white leading-tight">{actor.name}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ShowDetails;