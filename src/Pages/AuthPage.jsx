import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoPersonOutline, 
  IoArrowForward, 
  IoLogoGoogle, 
  IoLogoGithub,
  IoChevronBack
} from "react-icons/io5";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // --- HIDE NAVBAR LOGIC ---
    const navBar = document.querySelector("nav");
    if (navBar) {
      navBar.style.transform = "translateY(-100%)";
      navBar.style.opacity = "0";
      navBar.style.pointerEvents = "none";
    }

    return () => {
      // --- SHOW NAVBAR LOGIC ON UNMOUNT ---
      if (navBar) {
        navBar.style.transform = "translateY(0)";
        navBar.style.opacity = "1";
        navBar.style.pointerEvents = "auto";
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-4 md:p-10 selection:bg-purple-600 overflow-hidden">
      
      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[1100px] min-h-[700px] grid lg:grid-cols-2 bg-white/[0.02] border border-white/[0.05] rounded-[3.5rem] overflow-hidden backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
      >
        
        {/* --- BRAND SIDE --- */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-purple-950/20 to-transparent border-r border-white/[0.05]">
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center font-black text-black text-xl">
              M
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              Movie<span className="text-purple-600">fy</span>
            </h1>
          </Link>

          <div className="space-y-6">
             <AnimatePresence mode="wait">
                <motion.h2 
                  key={isLogin ? "login-txt" : "reg-txt"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="text-6xl font-black uppercase italic tracking-tighter leading-[0.9]"
                >
                  {isLogin ? "Welcome" : "Start"} <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-800">
                    Your Story
                  </span> 
                </motion.h2>
             </AnimatePresence>
            <p className="text-neutral-500 font-medium text-lg max-w-xs italic leading-relaxed">
              Unlock personalized recommendations and deep-vibe movie searches.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-neutral-700">
            <span>© 2026 Moviefy Studio</span>
          </div>
        </div>

        {/* --- FORM SIDE --- */}
        <div className="p-8 md:p-20 flex flex-col justify-center relative">
          
          {/* Back to Home Trigger */}
          <Link to="/" className="absolute top-10 left-10 lg:left-20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors group">
            <IoChevronBack className="group-hover:-translate-x-1 transition-transform"/> Exit
          </Link>

          <div className="mb-12">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">
              {isLogin ? "Sign In" : "Register"}
            </h3>
            <div className="h-1 w-12 bg-purple-600 rounded-full" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative group"
                >
                  <IoPersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-600/50 focus:bg-white/[0.05] transition-all text-sm font-medium"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-purple-500 transition-colors" />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-600/50 focus:bg-white/[0.05] transition-all text-sm font-medium"
              />
            </div>

            <div className="relative group">
              <IoLockClosedOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-purple-500 transition-colors" />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-600/50 focus:bg-white/[0.05] transition-all text-sm font-medium"
              />
            </div>

            <button className="w-full group mt-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-600 hover:text-white transition-all duration-500 active:scale-95 shadow-2xl">
              {isLogin ? "Authenticate" : "Create Account"}
              <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Alternates */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-700">Fast Access</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="flex justify-center gap-6">
              <button className="w-14 h-14 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-purple-500/50 transition-all">
                <IoLogoGoogle size={20} className="text-neutral-400" />
              </button>
              <button className="w-14 h-14 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-purple-500/50 transition-all">
                <IoLogoGithub size={20} className="text-neutral-400" />
              </button>
            </div>

            <p className="text-center text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
              {isLogin ? "Don't have an account?" : "Already a member?"} {" "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-500 hover:text-white transition-colors ml-1"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;