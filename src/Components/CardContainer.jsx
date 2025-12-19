import React from 'react'
import CardUi from './CardUi'

const CardContainer = ({data}) => {
    
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center px-10 mt-10">
        {data.map((movie) => (
          <CardUi key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default CardContainer
