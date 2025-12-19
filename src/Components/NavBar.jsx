import React, { useEffect } from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { fetchSearchSection } from "../Services/Api";
import { FaStar } from "react-icons/fa";
import ShowDetails from "./MovieDetail/ShowDetails";
import EmotionRecommend from "../Pages/EmotionRecommend";
import { Link } from "react-router-dom";

const NavBar = ({ className }) => {
  const [input, setinput] = useState("");
  const [isMobile, setisMobile] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [Ddata, setDdata] = React.useState([]);
  const [ShowDetailToggel, setShowDetailToggel] = React.useState(false);

  const inputchange = (e) => {
    setinput(e.target.value);
  };

  const SearchSection = async () => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetchSearchSection(input);
      setSuggestions(res.data.results.slice(0, 4));
      console.log(suggestions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    SearchSection();
  }, [input]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("clikked");
  };

1  // console.log(Ddata)
  return (
    <>
      <div className={`absolute top-0 right-0 left-0 ${className}`}>
        {/* menubar  */}
        {isMobile && (
          <div className=" w-1/2 h-screen absolute top-0 right-0 z-10 backdrop:blur-lg  bg-neutral-600 px-3 duration-[600ms]  " style={{
            right : isMobile ? '0' : "-100%"
          }}>
            <div className="flex items-center justify-between px-3 mt-5">
              <h1 className="text-2xl font-bold text-white">
                Movie<span className="text-[#9237BA]">fy</span>
              </h1>
              {/* close btn for dropdown  */}
              <IoClose
                onClick={() => setisMobile(false)}
                className="text-2xl text-white hover:text-[#9237BA] cursor-pointer ease-in-out duration-500"
              />
            </div>
            <div className=" mt-3">
              <div className="mt-5 w-full  border-b-1 border-gray-100">
                <h1 className="text-xl text-white  "><Link to="/">Home</Link> </h1>
              </div>
                <div className="mt-5 w-full  border-b-1 border-gray-100">
                <h1 className="text-xl text-white  "><Link to="/popularMovies">PopularMovies</Link> </h1>
              </div>
              <div className="mt-5 w-full  border-b-1 border-gray-100">
                <h1 className="text-xl text-white  "><Link to="/emotionRecommend">EmotionRecommend</Link> </h1>
              </div>
              <div className="mt-5 w-full  border-b-1 border-gray-100">
                <h1 className="text-xl text-white  "><Link to="/topRatedMovies">TopRatedMovies</Link> </h1>
              </div>
           
            </div>
          </div>
        )}

        {/* desctop  */}
        <div className="flex items-center justify-between gap-10 max-sm:gap-2 text-black backdrop-blur-[4px]  px-30 py-4 max-lg:justify-center max-sm:px-5  max-sm:flex-nowrap max-sm:justify-between max-sm:flex-col ">
          <div className="flex items-center justify-between max-sm:w-full">
            {isMobile || (
              <h1 className="text-4xl font-bold text-white ">
                Movie<span className="text-[#9237BA]">fy</span>
              </h1>
            )}
            {/* Menu icon */}
            {isMobile || (
              <AiOutlineMenu
                onClick={() => setisMobile(true)}
                className="text-2xl text-white hidden  max-sm:inline-block cursor-pointer hover:text-[#9237BA] ease-in-out duration-200 "
              />
            )}
          </div>
          <div className="flex gap-10 max-sm:gap-5 text-sm max-sm:hidden">
            <h1 className="hover:text-[#9237BA] font-semibold text-white  duration-200 ease-in">
              <Link to='/'>Home</Link>
            </h1>
             <h1 className="hover:text-[#9237BA] font-semibold text-white  duration-200 ease-in">
               <Link to='/popularMovies'>PopularMovies</Link>
            </h1>
            
            <h1 className="hover:text-[#9237BA] font-semibold text-white  duration-200 ease-in">
               <Link to='/emotionRecommend'>EmotionRecommend</Link>
            </h1>
           
            <h1 className="hover:text-[#9237BA] font-semibold text-white  duration-200 ease-in">
               <Link to='/topRatedMovies'>TopRatedMovies</Link>
            </h1>
           
            
          </div>


            {/*   Search bar for movies  */}
          <div className="">
            <form
              onSubmit={handlesubmit}
              className="flex items-center justify-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => inputchange(e)}
                className="border-2 border-gray-400 px-4 py-2 rounded-2xl relative text-white"
                type="search"
                placeholder="Search Movies..."
              />
              <CiSearch className="text-2xl text-white font-extrabold " />
            </form>
          </div>

            {/* suugestion of mivies list  */}
          {suggestions.length > 2 && (
            <div className="absolute top-[100px]  right-20  p-4 rounded-md  max-sm:right-2.5">
              {suggestions.map((movie) => {
                return (
                  <ul
                    key={movie.id}
                    className="mb-2"
                    onClick={() => {setShowDetailToggel(true)
                      setDdata(movie)
                    }}
                  >
                    <li className="  px-2 py-2 bg-neural-800 rounded-lg bg-black/50 backdrop-blur-[4px] cursor-pointer ">
                      <div className="flex gap-4 w-[260px]">
                        <div>
                          <img
                            className="w-[80px] h-[90px] object-cover rounded-md"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">
                            {movie.original_title}
                          </h4>
                          <p className="text-sm mt-1 text-gray-200">
                            {movie.release_date.slice(0, 4)}
                          </p>
                          <p>
                            {" "}
                            <FaStar className="inline items-center mb-1 text-amber-400" />
                            <span className="text-gray-200 text-sm">
                              {" "}
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {ShowDetailToggel && <ShowDetails movie={Ddata} />}
    </>
  );
};

export default NavBar;
