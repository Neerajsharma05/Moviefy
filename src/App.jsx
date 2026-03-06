import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Popular from './Components/Popular'
import HeroSection from './Components/HeroSection'
import TrendingSection from './Components/Sections/TrendingSection'
import PopularSection from './Components/Sections/PopularSection'
import CategorieSection from './Components/Sections/CategorieSection'
import ShowDetails from './Components/MovieDetail/ShowDetails'
import {Routes , Route, Router} from 'react-router-dom'
import EmotionRecommend from './Pages/EmotionRecommend'
import Home from './Pages/Home'
import PopularMovies from './Pages/PopularMovies'
import TopRatedMovies from './Pages/Toprated'
import AboutPage from './Pages/AboutPage'
import ProfilePage from './Pages/ProfilePage'
import AuthPage from './Pages/AuthPage'
const App = () => {
  return (
    <div className='w-full h-auto relative'>
      <NavBar className='fixed top-0 left-0 z-30' />
      

     
     
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/emotionRecommend' element={<EmotionRecommend/>}/>
        <Route path='/popularMovies' element={<PopularMovies/>}/>
        <Route path='/topRatedMovies' element={<TopRatedMovies/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/login' element={<AuthPage/>}/>
      </Routes>
      

    </div>
  )
}

export default App
