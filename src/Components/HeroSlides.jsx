import React from "react";
import { FaStar } from "react-icons/fa";
import { IoMdAdd, IoMdPlayCircle } from "react-icons/io";
import ShowDetails from "./MovieDetail/ShowDetails";
import { watchtrailer } from "../Services/Api";

const HeroSlides = ({movie}) => {
  const [Popup, setPopup] = React.useState(false);
  // console.log(movie)

  Array.length


  return (
    <>
    <div className="relative w-screen h-screen flex-shrink-0 snap-center max-sm:h-[350px] max-sm:overflow-hidden" 
    onClick={()=>setPopup(true)}>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-black max-sm:h-[350px] "></div>
      <img
        className="w-full h-full object-cover object-center"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="Movie Poster"
      />
      <div className="absolute top-1/3 left-16 max-sm:left-5 max-sm:top-1/5">
        <div className="flex gap-3 w-1/3 items-center max-sm:gap-1 max-sm:text-sm">
          <button className="px-2 py-0 rounded-md bg-[#9237BA] max-sm:text-sm max-sm:px-1">Featured</button>
          <p>
            <FaStar className="inline items-center mb-1 text-amber-400" /> {(movie.vote_average).toFixed(1)}
          </p>
          <p>{movie.release_date.slice(0,4)}</p>
        </div>

        <div className="mt-4 w-1/2 max-sm:m-1 ">
          <h1 className="text-5xl font-bold text-white mb-4 max-sm:text-xl max-sm:mb-1">{movie.original_title}</h1>
          <h3 className="text-white max-sm:text-sm">
            {(movie.overview).length>100 ? movie.overview.slice(0,90)+'...' : movie.overview}
            </h3>
          <div className="mt-3 flex gap-3 max-sm:gap-1">
            <button onClick={()=>watchtrailer(movie.original_title)} className="px-3 py-1 text-white rounded-md font-semibold bg-[#9237BA] hover:bg-[#9237DE] cursor-pointer  ease-in-out duration-300 text-center max-sm:text-sm max-sm:text-nowrap max-sm:px-2 max-sm:h-[30px]  ">
              <IoMdPlayCircle className="inline-block mb-1 mr-1 " /> Watch Now
            </button>
            <button className="px-3 py-1 font-semibold rounded-md text-white bg-neutral-600 hover:bg-[#9237BA] cursor-pointer ease-in-out duration-300 text-center max-sm:text-sm max-sm:text-nowrap max-sm:px-2 max-sm:h-[30px]">
              <IoMdAdd className="inline-block mb-1 mr-1 " /> Add to Watchlist
            </button>
          </div>
        </div>
      </div>
     
    </div>
     {Popup && <ShowDetails movie={movie} />}
    </>
  );
};

export default HeroSlides;
