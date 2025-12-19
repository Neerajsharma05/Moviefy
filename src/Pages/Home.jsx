import React from 'react'
import HeroSection from '../Components/HeroSection'
import TrendingSection from '../Components/Sections/TrendingSection'
import PopularSection from '../Components/Sections/PopularSection'
import CategorieSection from '../Components/Sections/CategorieSection'

const Home = () => {
  return (
    <div>
        <HeroSection className='z-0' />
        <TrendingSection />
        <PopularSection />
        <CategorieSection />
        
    </div>
  )
}

export default Home
