import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaStar, FaPlayCircle } from "react-icons/fa";
import { fetchMovieByid, watchtrailer } from "../../Services/Api";

const ShowDetails = ({ movie }) => {
  const [hide, setHide] = useState(false);
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const movieDetails = async () => {
      try {
        if (!movie?.id) return;
        const res = await fetchMovieByid(movie.id);
        const movieData = res.data;

        setData(movieData);
        setGenres(movieData.genres || []);
        setMovieCast(movieData.credits?.cast?.slice(0, 15) || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    movieDetails();
  }, [movie?.id]);

  // ✅ Fallback for poster and cast image
  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "/no-poster.png";

  const bannerUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/no-banner.png";

  return (
    <>
      {/* Background Overlay */}
      <div
        className="w-full h-full fixed top-0 left-0 bg-black/40 backdrop-blur-sm duration-500 z-50"
        style={{
          visibility: hide ? "hidden" : "visible",
          opacity: hide ? 0 : 1,
        }}
        onClick={() => setHide(true)}
      ></div>

      {/* Movie Details Modal */}
      {!hide && (
        <div className="fixed overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-4/5 h-5/6 bg-[#060D17] text-white rounded-lg z-50 scrollbar-hide">
          {/* Close Button */}
          <MdClose
            onClick={() => setHide(true)}
            className="absolute cursor-pointer hover:text-[#9237BA] transition top-3 right-3 font-bold text-2xl z-50"
          />

          {/* Movie Banner */}
          <div className="w-full h-[40%] bg-gray-900 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060D17]" />
            <img
              className="w-full h-full object-cover"
              src={bannerUrl}
              alt={movie?.original_title || "Movie Banner"}
            />
          </div>

          {/* Movie Info Section */}
          <div className="flex flex-col md:flex-row gap-8 px-6 py-6 -mt-32 relative z-10">
            {/* Poster */}
            <div className="w-[220px] h-[320px] hidden md:block">
              <img
                className="rounded-2xl object-cover w-full h-full"
                src={posterUrl}
                alt={movie?.original_title || "Movie Poster"}
              />
            </div>

            {/* Details */}
            <div className="flex-1 overflow-y-hidden">
              {/* Title & Release Year */}
              <h1 className="text-3xl font-bold mb-2">
                {data.original_title}{" "}
                <span className="text-neutral-400 text-2xl">
                  ({data.release_date?.slice(0, 4)})
                </span>
              </h1>

              {/* Rating & Runtime */}
              <div className="flex items-center gap-4 mb-3">
                <p>
                  <FaStar className="inline text-amber-400 mb-1" />{" "}
                  {data.vote_average?.toFixed(1)}
                </p>
                {data.runtime && (
                  <p>{`${Math.floor(data.runtime / 60)}h ${
                    data.runtime % 60
                  }m`}</p>
                )}
              </div>

              {/* Overview */}
              <h2 className="text-xl font-semibold mt-4">Overview</h2>
              <p className="text-neutral-300 mt-1">{data.overview}</p>

              {/* Trailer */}
              <div className="flex items-center mt-4">
                <h2 className="text-2xl font-semibold">Watch Trailer</h2>
                <FaPlayCircle
                  onClick={() => watchtrailer(data.original_title)}
                  className="ml-3 text-yellow-400 text-5xl cursor-pointer hover:scale-110 transition"
                />
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 mt-4">
                {genres.map((g) => (
                  <button
                    key={g.id}
                    className="px-3 py-1 bg-neutral-600 rounded-lg text-sm hover:bg-neutral-500 transition"
                  >
                    {g.name}
                  </button>
                ))}
              </div>

              {/* Budget and Revenue */}
              <div className="flex items-center gap-6 mt-4">
                <h4 className="text-neutral-300">
                  Budget:{" "}
                  <span className="text-sm">
                    $
                    {data.budget
                      ? (data.budget / 1_000_000).toFixed(2) + "M"
                      : "N/A"}
                  </span>
                </h4>
                <h4 className="text-neutral-300">
                  Revenue:{" "}
                  <span className="text-sm">
                    $
                    {data.revenue
                      ? (data.revenue / 1_000_000).toFixed(2) + "M"
                      : "N/A"}
                  </span>
                </h4>
              </div>
              {/* Cast Section */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Cast</h2>

                {/* horizontal scroller: fixed height, horizontal scroll only */}
                <div
                  className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide pb-4
               touch-pan-x touch-auto snap-x snap-mandatory"
                  style={{ WebkitOverflowScrolling: "touch" }} // smooth touch scrolling on iOS
                >
                  {movieCast.map((actor) => (
                    <div
                      key={actor.id}
                      className="min-w-[150px] flex-shrink-0 bg-neutral-800 rounded-lg p-3 text-center flex flex-col items-center"
                    >
                      <img
                        className="w-[90px] h-[90px] object-cover rounded-full mb-2"
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "/no-profile.png"
                        }
                        alt={actor.name}
                      />
                      <h4 className="text-[#89a5e6] text-sm font-semibold">
                        {actor.original_name}
                      </h4>
                      <p className="text-neutral-400 text-xs">
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>



            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowDetails;
