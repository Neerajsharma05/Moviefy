import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaPalette, FaBolt } from 'react-icons/fa';

const AboutPage = () => {
  const stats = [
    { label: "Movies Cached", value: "20K+" },
    { label: "Global Users", value: "500K" },
    { label: "Response Time", value: "120ms" },
  ];

  const features = [
    { icon: <FaBolt className="text-purple-500" />, title: "Lightning Fast", desc: "Optimized with React and TMDB for instant movie discovery." },
    { icon: <FaPalette className="text-purple-500" />, title: "Modern UI", desc: "A sleek, dark-mode experience designed for cinephiles." },
    { icon: <FaCode className="text-purple-500" />, title: "Clean Code", desc: "Built with scalable architecture and premium animations." },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 md:px-20 overflow-hidden relative">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/10 blur-[120px] -z-10" />

      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-24"
      >
        <span className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
          The Vision
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">
          Redefining the <span className="text-purple-600">Cinema</span> Experience
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-medium">
          Moviefy isn't just a database; it's a curated portal to the world of storytelling. 
          We bridge the gap between you and your next favorite film with a seamless, 
          ultra-modern interface.
        </p>
      </motion.div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-center backdrop-blur-xl"
          >
            <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* --- DEVELOPER SPOTLIGHT (YOU) --- */}
      <section className="max-w-6xl mx-auto mb-32 relative">
        <div className="flex flex-col md:flex-row items-center gap-16 p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-3xl overflow-hidden">
          
          {/* Circular Glow behind image */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 blur-[80px] -z-10" />

          {/* Profile Image / Placeholder */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-purple-600/30 p-2 shrink-0">
             <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               {/* Replace this with your actual image */}
                <img src="/src/assets/myPhoto.jpg" />
               {/* <span className="text-6xl font-black text-purple-600">NS</span> */}
             </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="bg-purple-600/20 text-purple-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              Lead Architect & Founder
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">
              Neeraj Sharma
            </h2>
            <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              A developer driven by the intersection of performance and aesthetic. 
              Neeraj built Moviefy with a single goal: to prove that movie discovery 
              can be as beautiful as the films themselves.
            </p>
            
            {/* Socials */}
            <div className="flex gap-6">
              <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-purple-600 transition-all text-white"><FaGithub size={20} /></a>
              <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-purple-600 transition-all text-white"><FaLinkedin size={20} /></a>
              <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-purple-600 transition-all text-white"><FaTwitter size={20} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {features.map((f, i) => (
          <div key={i} className="group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all duration-500 mx-auto md:mx-0">
              {f.icon}
            </div>
            <h4 className="text-xl font-bold mb-3 tracking-tight">{f.title}</h4>
            <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* --- FOOTER SEPARATOR --- */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-32" />
    </div>
  );
};

export default AboutPage;