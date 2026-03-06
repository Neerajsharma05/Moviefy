import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  IoSettingsOutline, 
  IoHeart, 
  IoTimeOutline, 
  IoShieldCheckmarkOutline, 
  IoCameraOutline,
  IoFilmOutline
} from "react-icons/io5";
import CardUi from "../Components/CardUi"; // Using your existing Card component

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Watchlist");

  // Dummy Data - Replace with your Global State/API
  const user = {
    name: "Neeraj Sharma",
    email: "neeraj.dev@moviefy.io",
    joinDate: "March 2026",
    avatar: null,
    stats: [
      { label: "Watched", value: "128" },
      { label: "Liked", value: "45" },
      { label: "Hours", value: "312" },
    ]
  };

  const tabs = ["Watchlist", "Recently Viewed", "Security"];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 md:px-12 lg:px-24 selection:bg-purple-600">
      
      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[25%] h-[25%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER SECTION: IDENTITY --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-10 mb-20"
        >
          {/* Avatar with Edit Overlay */}
          <div className="relative group">
            <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-5xl font-black shadow-[0_20px_60px_rgba(146,55,186,0.3)] rotate-3 group-hover:rotate-0 transition-transform duration-700">
              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover rounded-[3rem]" alt="profile"/> : "NS"}
            </div>
            <button className="absolute bottom-2 right-2 p-3 bg-white text-black rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl">
              <IoCameraOutline size={20} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">Premium Member</span>
                <IoShieldCheckmarkOutline className="text-purple-500" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                {user.name}
              </h1>
              <p className="text-neutral-500 font-medium text-lg italic">{user.email}</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
              {user.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3 font-black text-[10px] uppercase tracking-widest">
            <IoSettingsOutline size={18} /> Edit Profile
          </button>
        </motion.div>

        {/* --- NAVIGATION TABS --- */}
        <div className="flex border-b border-white/5 mb-12 gap-10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                activeTab === tab ? "text-white" : "text-neutral-600 hover:text-neutral-400"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* --- TAB CONTENT AREA --- */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "Watchlist" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-12">
              {/* You would map over your actual saved movies here */}
              <div className="col-span-full py-20 text-center space-y-4 border-2 border-dashed border-white/5 rounded-[3rem]">
                 <IoHeart className="mx-auto text-neutral-800" size={60} />
                 <p className="text-neutral-500 font-bold tracking-widest uppercase text-xs">Your favorites list is empty</p>
              </div>
            </div>
          )}

          {activeTab === "Recently Viewed" && (
             <div className="space-y-6">
                <div className="flex items-center gap-4 mb-10">
                    <IoTimeOutline className="text-purple-500" size={24}/>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Your Last Sessions</h3>
                </div>
                {/* Dummy History List */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] hover:bg-white/[0.04] transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-500 font-bold">
                        <IoFilmOutline size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase tracking-tight">The Batman (2022)</h4>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Watched 2 hours ago • Action, Crime</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 px-6 py-2 bg-purple-600 rounded-full text-[9px] font-black uppercase tracking-widest transition-all">
                      Rewatch
                    </button>
                  </div>
                ))}
             </div>
          )}

          {activeTab === "Security" && (
            <div className="max-w-2xl bg-white/[0.02] border border-white/[0.05] rounded-[3rem] p-10 space-y-8">
               <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Security Settings</h3>
                  <p className="text-neutral-500 text-sm">Manage your account protection and login sessions.</p>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl">
                     <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">Two-Factor Authentication</span>
                     <button className="text-purple-500 font-black text-[10px] uppercase">Enable</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl">
                     <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">Change Password</span>
                     <button className="text-purple-500 font-black text-[10px] uppercase">Update</button>
                  </div>
               </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default ProfilePage;