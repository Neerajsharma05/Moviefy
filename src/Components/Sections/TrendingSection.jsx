import React, { useEffect, useState } from "react";
import { TrendingMoviesApi } from "../../Services/Api";
import CardUi from "../CardUi";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const TrendingSection = () => {
  const [data, setData] = useState([]);
  const trendingMovies = async (params) => {
    try {
      const res = await TrendingMoviesApi();
      // console.log(res.data.results)
      setData(res.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    trendingMovies();
  }, []);

  // console.log(data)
  return (
    <div className="scrollbar-hide w-full h-auto flex flex-col  text-white px-20 mt-5 max-sm:px-2 ">
      <div className="flex items-center justify-between mb-3 max-sm:mb-1">
        <div>
          <h1 className="text-2xl font-bold max-sm:text-xl max-sm:ml-3">
            Trending movies This Week
          </h1>
          <p className="text-sm text-neutral-400 mt-2 max-sm:mt-0 max-sm:text-[12px] max-sm:ml-3">
            Stay Updated with what everyone Watching
          </p>
        </div>
        <div className="flex gap-2 text-2xl font-black ">
          <IoIosArrowDropleftCircle className="text-black bg-neutral-600 rounded-full hover:bg-white cursor-pointer" />
          <IoIosArrowDroprightCircle className="text-black bg-neutral-600 rounded-full hover:bg-white cursor-pointer" />
        </div>
      </div>
      <div className=" flex overflow-x-auto space-x-4 p-4  scrollbar-hide max-sm:p-1 overflow-y-hidden ">
        {data.map((movie, index) => {
          return (
            <CardUi
              movie={movie}
              key={movie.id}
              className="flex-shrink-0 w-60"
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrendingSection;
