import React from 'react';
import { FaStar } from "react-icons/fa";
import ShowDetails from './MovieDetail/ShowDetails';

const CardUi = ({ movie,className }) => {
//   console.log(movie.backdrop_path);
    const [showTogle, setShowTogle] = React.useState(false);

  return (
    <>
    <div 
    onClick={()=> setShowTogle(true)} className={`text-white flex flex-col p-1  m-2 rounded-md w-[200px] h-auto cursor-pointer bg-black mb-3 hover:scale-110 duration-300 ease-in ${className} max-sm:w-[130px] max-sm:m-1 max-sm:mb-0`}>
      
      <img className='w-[200px] rounded-md mb-2 max-sm:w-[150px] max-sm:mb-1'
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h1 className='text-wrap text max-sm:text-sm '>{movie.title}</h1>

      <div className='flex flex-row-reverse items-center justify-between mt-1 max-sm:mt-0 '>
        <p className='text-sm text-neutral-400  text-right max-sm:text-[10px]'>{movie.release_date.slice(0,4)}</p>
      <p className='text-sm text-neutral-400 max-sm:text-[10px]'><FaStar className='inline items-center mb-1 text-amber-400' />  {movie.vote_average.toFixed(1)}</p>

      </div>
      
    </div>
    {showTogle && <ShowDetails movie={movie}  />}

    </>

  );
};

export default CardUi;
