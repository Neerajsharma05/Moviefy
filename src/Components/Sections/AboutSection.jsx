import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCodeBracket, HiOutlineSparkles } from 'react-icons/hi2';

const AboutSection = () => {
  return (
    <section className="relative w-full py-32 px-6 md:px-20 bg-[#020202] overflow-hidden">
      
      {/* --- CINEMATIC AMBIANCE LAYERS --- */}
      {/* These glow effects ensure the section matches the "depth" of your movie cards */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
        
        {/* LEFT SIDE: BRAND PHILOSOPHY */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="flex-1 space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-purple-500" />
              <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px]">
                The Architect's Vision
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white leading-[0.9]">
              Cinema <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-800">
                Evolved.
              </span>
            </h2>
          </div>

          <p className="text-neutral-500 text-lg leading-relaxed max-w-xl font-medium border-l border-white/10 pl-8">
            Moviefy isn't just a project—it's a tribute to the silver screen. 
            Designed to bridge the gap between high-performance engineering 
            and boutique aesthetics.
          </p>

          {/* Micro-Features with matching Card Glass */}
          <div className="flex flex-wrap gap-4">
            <div className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl hover:border-purple-500/30 transition-colors">
              <HiOutlineSparkles className="text-purple-500 mb-2" size={24} />
              <p className="text-white text-xs font-black uppercase tracking-widest">Premium UI</p>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl hover:border-purple-500/30 transition-colors">
              <HiOutlineCodeBracket className="text-purple-500 mb-2" size={24} />
              <p className="text-white text-xs font-black uppercase tracking-widest">Fast API</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: THE CREATOR (NEERAJ SHARMA) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="flex-1 w-full max-w-lg"
        >
          <div className="relative group p-12 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.08] backdrop-blur-2xl shadow-2xl">
            
            {/* The "Signature" Logo */}
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(146,55,186,0.3)] mb-10 group-hover:rotate-[360deg] transition-transform duration-1000">
              NS
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                  Neeraj Sharma
                </h3>
                <p className="text-purple-500 font-bold text-[10px] uppercase tracking-[0.4em] mt-1">
                  Full-Stack Developer
                </p>
              </div>

              <p className="text-neutral-400 text-sm leading-loose">
                "Driven by a love for clean code and immersive design, I built 
                Moviefy to be the fastest, most beautiful gateway to your 
                favorite films."
              </p>

              <div className="pt-6 flex items-center gap-6">
                 <button className="text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-purple-600 pb-1 hover:text-purple-500 transition-colors">
                    GitHub
                 </button>
                 <button className="text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-purple-600 pb-1 hover:text-purple-500 transition-colors">
                    LinkedIn
                 </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;