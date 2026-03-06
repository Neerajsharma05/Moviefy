import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { IoSearchOutline, IoCloseOutline, IoLogOutOutline, IoSettingsOutline, IoHeartOutline } from "react-icons/io5"; // Added icons
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaStar, FaUserCircle } from "react-icons/fa"; // Added FaUserCircle
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchSearchSection } from "../Services/Api";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // New state
  const [suggestions, setSuggestions] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const profileRef = useRef(null); // To detect clicks outside

  // Dummy user data - replace with your Auth context
  const user = {
    name: "Neeraj Sharma",
    email: "neeraj@dev.com",
    avatar: null // if null, shows initials
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input.length >= 2) {
        fetchSearchSection(input).then(res => setSuggestions(res.data.results.slice(0, 5)));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const navigate = useNavigate()
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Popular", path: "/popularMovies" },
    { name: "Vibe AI", path: "/emotionRecommend" },
    { name: "Top Rated", path: "/topRatedMovies" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          scrolled 
            ? "py-4 bg-black/60 backdrop-blur-2xl border-b border-white/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.4)]" 
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* --- BRANDING --- */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center font-black text-black">
              M
            </div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
              Movie<span className="text-purple-600">fy</span>
            </h1>
          </Link>

          {/* --- CENTRAL NAV (Desktop) --- */}
          <div className="hidden lg:flex items-center bg-white/[0.03] border border-white/[0.05] rounded-full px-2 py-1 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-full ${
                  location.pathname === link.path 
                    ? "bg-purple-600 text-white shadow-lg" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* --- SEARCH & PROFILE --- */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="relative group hidden sm:block">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Quick Find..."
                className={`bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-2.5 text-[11px] text-white outline-none transition-all duration-500 w-[150px] focus:w-[220px] focus:border-purple-500/50 focus:bg-white/[0.07]`}
              />
              <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-purple-500 transition-colors" />
            </div>

            {/* --- USER PROFILE SECTION --- */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() =>{
                  // setIsProfileOpen(!isProfileOpen)
                  navigate('/login')
                } }
                className="w-10 h-10 rounded-full border border-white/10 p-0.5 hover:border-purple-500 transition-all duration-500 active:scale-90 overflow-hidden"
              >
                {user.avatar ? (
                  <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="user" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-[10px] font-black text-white">
                    LG
                  </div>
                )}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute top-[120%] right-0 w-[260px] bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                  >
                    {/* User Info Header */}
                    <div className="mb-6 px-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Authenticated</p>
                      <h3 className="text-white font-black text-lg leading-none">{user.name}</h3>
                      <p className="text-neutral-500 text-[10px] mt-1">{user.email}</p>
                    </div>

                    <div className="h-px bg-white/5 w-full mb-4" />

                    {/* Menu Links */}
                    <div className="space-y-1">
                      <ProfileLink icon={<FaUserCircle size={16}/>} label="My Profile" />
                      <ProfileLink icon={<IoHeartOutline size={16}/>} label="Watchlist" />
                      <ProfileLink icon={<IoSettingsOutline size={16}/>} label="Settings" />
                      <div className="pt-2">
                         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all group font-black text-[10px] uppercase tracking-widest">
                           <IoLogOutOutline size={18} className="group-hover:translate-x-1 transition-transform"/>
                           Sign Out
                         </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsMobile(true)}
              className="lg:hidden text-white hover:text-purple-500 transition-colors"
            >
              <HiOutlineMenuAlt4 size={28} />
            </button>
          </div>
        </div>

        {/* --- LUXURY SEARCH DROPDOWN --- */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute top-full right-4 md:right-12 mt-4 w-[340px] bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-4 px-4">Top Results</div>
              <div className="space-y-2">
                {suggestions.map((movie) => (
                  <div key={movie.id} className="flex gap-4 p-2 hover:bg-white/[0.03] rounded-[1.5rem] cursor-pointer transition-all border border-transparent hover:border-white/[0.05]">
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="w-14 h-20 object-cover rounded-2xl shadow-xl" alt="" />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[13px] font-bold text-white line-clamp-1">{movie.original_title}</h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded text-neutral-400 font-black">{movie.release_date?.slice(0, 4)}</span>
                        <span className="text-[9px] flex items-center gap-1 text-amber-500 font-black"><FaStar size={10} /> {movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MOBILE OVERLAY (unchanged logic) --- */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-12"
          >
            <button onClick={() => setIsMobile(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
              <IoCloseOutline size={40} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.path}
                >
                  <Link 
                    to={link.path} 
                    onClick={() => setIsMobile(false)} 
                    className={`text-4xl font-black uppercase tracking-widest ${location.pathname === link.path ? "text-purple-500" : "text-white"}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Reusable Menu Item Component
const ProfileLink = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all group font-black text-[10px] uppercase tracking-widest">
    <span className="text-purple-500 group-hover:scale-110 transition-transform">{icon}</span>
    {label}
  </button>
);

export default NavBar;