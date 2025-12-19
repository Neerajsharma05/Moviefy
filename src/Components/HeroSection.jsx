import React, { useEffect, useState } from 'react';
import HeroSlides from './HeroSlides';
import { GetpopularMovie } from '../Services/Api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import NavBar from './NavBar';

const HeroSection = () => {
  const [data, setData] = useState([]);
  console.log(data)

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await GetpopularMovie();
      setData(res.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="scrollbar-hide flex flex-nowrap w-full  overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar max-sm:mt-17">
      
      {data.length === 0 ? (
        <div className="text-white text-center ">Loading movies...</div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          loop={data.length > 2}
          autoplay={{ delay: 2000 }}
          slidesPerView={1}
          spaceBetween={10}
        >
          {data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <HeroSlides movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroSection;
