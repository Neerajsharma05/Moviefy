// const api_key = "c4e2efe2860f78e8a430feb5656c6c76";
// const Base_url = 'https://api.themoviedb.org/3'


// export const fetchtrendingMovies = async (params) => {
//   try{
//     const res = await fetch(`${Base_url}/trending/movie/week?api_key=${api_key}&langauge=en-US`);
//     const data = await res.json()
//     return data.results;
//     console.log(data)
//   }catch(error){
//     console.log('error in fetching recipes')
//     return[];
//   }
// }




import axios from "axios";
const API_KEY = 'c4e2efe2860f78e8a430feb5656c6c76'
const BASE_URL = 'https://api.themoviedb.org/3/'
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500'
// const response = axios.get(${base_url}/trending/movie/week?api_key=${api_key}&langauge=en-US);


const api = axios.create({
    baseURL :'https://api.themoviedb.org/3/',
})


// Creating a get request functions 

export const GetpopularMovie = () =>{
    return api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    
}
// https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY&language=en-US&page=1


export const NewMovies = () =>{
    return api.get(`movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
}

export const TrendingMoviesApi = () =>{
    return api.get(`/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`)
}

export const fetchcategoriesMovies = () =>{
    return api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
}

export const  fetchMoviesByCategory = (GenreId) =>{
    return api.get(`/discover/movie?api_key=${API_KEY}&with_genres=${GenreId}`)
}

export const fetchSearchSection = (query) => {
    return api.get(`/search/movie?api_key=${API_KEY}&query=${query}`)
}


export const fetchMovieByid = (movieId) =>{
    return api.get(`movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers`)
}



export const watchtrailer = (movie_Name) => {
    window.open(`https://www.youtube.com/results?search_query=${movie_Name}+trailer`)
  
}

// https://api.themoviedb.org/3/search/movie?api_key=c4e2efe2860f78e8a430feb5656c6c76&query=f

// https://api.themoviedb.org/3/movie/1311031?api_key=c4e2efe2860f78e8a430feb5656c6c76&query&append_to_response=credits,videos,watch/providers