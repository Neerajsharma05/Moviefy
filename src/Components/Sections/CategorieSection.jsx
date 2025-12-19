import React, { useEffect, useState } from 'react'
import { fetchcategoriesMovies, fetchMoviesByCategory } from '../../Services/Api';
import CardUi from '../CardUi';

const CategorieSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [movies, setMovies] = useState([]);

  // Get All Categories
  const getCategories = async () => {
    try {
      const res = await fetchcategoriesMovies();
      setCategories(res.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Movies by Category
  const getMovies = async (genreId) => {
    try {
      const res = await fetchMoviesByCategory(genreId);
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // When category changes → fetch movies
  useEffect(() => {
    if (selectedCategory) {
      getMovies(selectedCategory);
    }
  }, [selectedCategory]);

  selectedCategory===null ? setSelectedCategory(28) : '';
  return (
    <div className="px-20 text-white max-sm:px-2">
      <h1 className="text-2xl font-bold mb-4 max-sm:mb-2">Browse By Genre</h1>

      {/* Categories Buttons */}
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide mb-10 max-sm:mb-4 max-sm:gap-2 ">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`text-sm px-2 py-1 rounded-md flex-shrink-0 hover:bg-[#9237BA] w-[100px] h-[30px] cursor-pointer  ease-in-out duration-500  max-sm:w-auto max-sm:text-[13px] max-sm:h-auto
              ${selectedCategory === cat.id ? "bg-[#9237BA]" : "bg-neutral-700"}
            `}
            onClick={() =>{setSelectedCategory(cat.id)}}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Movies */}
      <div className="flex flex-wrap items-center justify-center mb-5 max-sm:mb-0">
        {movies.map((movie) => {

            return <CardUi movie={movie} key={movie.id} className="flex-Shrink-0 w-70 max-sm:w-[120px]" />
        //   <div key={movie.id} className="bg-neutral-800 rounded-md p-2  scrollbar-hide">
        //     <img
        //       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        //       alt={movie.title}
        //       className="rounded-md"
        //     />
        //     <p className="text-sm mt-2">{movie.title}</p>
        //   </div>
        })}
      </div>
    </div>
  );
};

export default CategorieSection;
