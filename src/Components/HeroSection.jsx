import React, { useEffect, useState, useRef } from 'react';
import HeroSlides from './HeroSlides';
import { GetpopularMovie } from '../Services/Api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax, Pagination } from 'swiper/modules';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

const HeroSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await GetpopularMovie();
        setData(res.data.results.slice(0, 8));
      } catch (error) {
        console.error("Hero Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#020202] group/hero overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020202] z-50">
          <div className="w-16 h-[1px] bg-white/10 overflow-hidden">
            <div className="w-full h-full bg-purple-600 origin-left animate-loading-bar" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <Swiper
            modules={[Autoplay, Navigation, Parallax, Pagination]}
            parallax={true} // Enables the depth effect
            speed={200} // Smooth, slightly slower transition for a "heavy" premium feel
            loop={data.length > 1}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            slidesPerView={1}
            grabCursor={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="w-full h-full premium-swiper"
          >
            {data.map((movie) => (
              <SwiperSlide key={movie.id} className="bg-[#020202]">
                {/* We pass the movie to HeroSlides, but HeroSlides needs to handle 
                    the 'data-swiper-parallax' attributes internally for the effect to work */}
                <HeroSlides movie={movie} isSlider={true} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* --- MINIMALIST SLIDE NAVIGATORS --- */}
          <div className="absolute bottom-12 right-12 z-50 flex gap-4">
            <button
              ref={prevRef}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-500 opacity-0 group-hover/hero:opacity-100"
            >
              <HiOutlineArrowNarrowLeft size={20} />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-500 opacity-0 group-hover/hero:opacity-100"
            >
              <HiOutlineArrowNarrowRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] to-transparent z-40 pointer-events-none" />
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .premium-swiper .swiper-pagination-bullet {
            background: white !important;
            opacity: 0.2;
        }
        .premium-swiper .swiper-pagination-bullet-active {
            background: #9333ea !important; /* Purple-600 */
            opacity: 1;
            width: 20px !important;
            border-radius: 4px !important;
        }
        @keyframes loading-bar {
          0% { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
      `}} />
    </section>
  );
};

export default HeroSection;