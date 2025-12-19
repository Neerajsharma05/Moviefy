import React, { useEffect, useState } from "react";
import Popular from "../Popular";
import {  GetpopularMovie } from "../../Services/Api";
import CardUi from "../CardUi";
import { IoIosArrowDroprightCircle ,IoIosArrowDropleftCircle } from "react-icons/io";


const PopularSection = () => {
  const [data, setData] = useState([]);

  const GetpopularMovies = async () => {
    try {
      const response = await GetpopularMovie();
      setData(response.data.results); // ✅ store only movie list
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    GetpopularMovies();
  }, []);

  return (
    <div className="w-full h-auto text-white px-20  max-sm:px-2">
      <div className="flex items-center justify-between mb-3 max-sm:mb-1">
        <div>
          <h1 className="text-2xl font-bold max-sm:ml-3">Popular movies</h1>
          <p className="text-sm text-neutral-400 mt-2 max-sm:mt-0 max-sm:text-[12px] max-sm:ml-3">
            Most Watched Movies Right Now
          </p>
        </div>
        <div className="flex gap-2 text-2xl font-black ">
          <IoIosArrowDropleftCircle className="text-black bg-neutral-600 rounded-full hover:bg-white cursor-pointer" />
          <IoIosArrowDroprightCircle className="text-black bg-neutral-600 rounded-full hover:bg-white cursor-pointer" />
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide px-5">
        {data.map((movie, index) => {
          return <CardUi movie={movie} key={movie.id} className="flex-shrink-0 w-60" />;
        })}
      </div>
    </div>
  );
};

export default PopularSection;
